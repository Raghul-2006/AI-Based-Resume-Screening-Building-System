// ─── ML Screener — calibrated composite scoring with NLP ──────────────────────
// Final score = weighted blend of:
//   40 % keyword overlap (resume vs JD using TF-IDF cosine similarity)
//   30 % Logistic Regression shortlist probability (trained on CSV)
//   20 % experience relevance
//   10 % education level
// All components are normalised to 0-100 before blending.

const natural = require('natural');
const { extractKeywords, extractClassifierFeatures } = require('./textExtractor');
const { predict } = require('./mlClassifier');

// ─── NLP Components ───────────────────────────────────────────────────────────
const TfIdf = natural.TfIdf;
const tokenizer = new natural.WordTokenizer();

// ─── Curated tech-skill vocabulary (single tokens + common bigrams) ───────────
const SKILL_VOCAB = [
  // Languages
  'python','java','javascript','typescript','golang','rust','scala','kotlin',
  'swift','php','ruby','r','matlab','bash','c++','c#','perl',
  // ML / AI
  'pytorch','tensorflow','keras','sklearn','scikit-learn','xgboost','lightgbm',
  'huggingface','transformers','bert','gpt','llm','rlhf','rag','langchain',
  'mlflow','wandb','triton','onnx','jax','flax','yolo','opencv',
  'machine learning','deep learning','natural language processing','computer vision',
  'reinforcement learning','neural network','transfer learning','fine-tuning',
  'object detection','image classification','time series','anomaly detection',
  // Data
  'sql','postgresql','mysql','mongodb','redis','elasticsearch','kafka',
  'spark','hadoop','airflow','dbt','pandas','numpy','scipy','matplotlib',
  'seaborn','plotly','tableau','powerbi','bigquery','snowflake','databricks',
  // Cloud / DevOps
  'aws','azure','gcp','kubernetes','docker','terraform','ansible','jenkins',
  'github','gitlab','ci/cd','helm','prometheus','grafana','linux','nginx',
  // Web / Backend
  'nodejs','express','fastapi','django','flask','spring','graphql','grpc',
  'rest','microservices','rabbitmq','celery',
  // Practices
  'mlops','devops','agile','scrum','tdd','unit testing','api design',
  'data pipeline','feature engineering','model deployment','model serving',
];

// ─── NLP-Enhanced Helpers ─────────────────────────────────────────────────────

/** Calculate cosine similarity between resume and JD using TF-IDF */
function calculateCosineSimilarity(resumeText, jobDescription) {
  const tfidf = new TfIdf();
  tfidf.addDocument(resumeText.toLowerCase());
  tfidf.addDocument(jobDescription.toLowerCase());
  
  // Get top terms from JD
  const jdTerms = [];
  tfidf.listTerms(1).forEach(item => jdTerms.push(item.term));
  
  // Calculate cosine similarity
  let dotProduct = 0;
  let resumeMagnitude = 0;
  let jdMagnitude = 0;
  
  jdTerms.forEach(term => {
    const resumeTfidf = tfidf.tfidf(term, 0);
    const jdTfidf = tfidf.tfidf(term, 1);
    
    dotProduct += resumeTfidf * jdTfidf;
    resumeMagnitude += resumeTfidf * resumeTfidf;
    jdMagnitude += jdTfidf * jdTfidf;
  });
  
  if (resumeMagnitude === 0 || jdMagnitude === 0) return 0;
  
  const similarity = dotProduct / (Math.sqrt(resumeMagnitude) * Math.sqrt(jdMagnitude));
  return Math.round(Math.max(0, Math.min(100, similarity * 100)));
}

/** Extract all SKILL_VOCAB terms that appear in a block of text */
function extractSkills(text) {
  const lower = text.toLowerCase();
  return SKILL_VOCAB.filter(skill => lower.includes(skill));
}

/** Pull the candidate's name from the first meaningful line */
function extractName(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  for (const line of lines.slice(0, 8)) {
    // Skip lines that look like headings, emails, phones, URLs or section labels
    if (
      line.length >= 3 &&
      line.length <= 50 &&
      !/[@:\/\\|]/.test(line) &&
      !/^\d/.test(line) &&
      !/^(resume|curriculum|cv|objective|summary|profile|contact|address|phone|email|linkedin|github|collection|document|file)/i.test(line) &&
      /[A-Za-z]{2,}/.test(line)
    ) {
      // Accept lines that look like "Firstname Lastname" (1–4 words)
      const words = line.split(/\s+/);
      if (words.length >= 1 && words.length <= 4 && words.every(w => /^[A-Z][a-zA-Z'-]*$/.test(w))) {
        return line;
      }
    }
  }

  // Fallback: clean the first line or construct a name
  const candidateLine = (lines[0] || 'Candidate')
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b(resume|cv|collection|document|file)\b/gi, '')
    .trim() || 'Candidate';

  return candidateLine.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function extractEmail(text) {
  const m = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  return m ? m[0] : '';
}

function extractPhone(text) {
  const m = text.match(/(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
  return m ? m[0].trim() : '';
}

/** Extract a LinkedIn or GitHub URL */
function extractLinks(text) {
  const linkedin = (text.match(/linkedin\.com\/in\/[a-z0-9_-]+/i) || [])[0] || '';
  const github   = (text.match(/github\.com\/[a-z0-9_-]+/i)       || [])[0] || '';
  return { linkedin, github };
}

/** Derive a current/most-recent job title from the text */
function extractCurrentRole(text, fallback) {
  // Common title patterns
  const titlePatterns = [
    /(?:^|\n)\s*([A-Z][a-zA-Z\s\/&]+(?:Engineer|Developer|Scientist|Analyst|Manager|Architect|Lead|Intern|Specialist|Consultant|Designer|Director|Officer|Head|VP|CTO|CEO))\b/,
    /(?:current\s+(?:role|position|title)[:\s]+)([^\n,]+)/i,
    /(?:position[:\s]+)([^\n,]+)/i,
  ];
  for (const re of titlePatterns) {
    const m = text.match(re);
    if (m) {
      const candidate = m[1].trim();
      if (candidate.length > 3 && candidate.length < 60) return candidate;
    }
  }
  return fallback || 'Software Professional';
}

/** Compute keyword overlap score (0-100) using NLP TF-IDF and simple matching */
function keywordOverlapScore(resumeText, jobDescription) {
  // Method 1: TF-IDF cosine similarity (gives semantic understanding)
  const cosineSim = calculateCosineSimilarity(resumeText, jobDescription);
  
  // Method 2: Simple keyword matching (direct skill matches)
  const jdKeywords = extractKeywords(jobDescription, 40);
  let simpleMatch = 50;
  if (jdKeywords.length > 0) {
    const resumeLower = resumeText.toLowerCase();
    const hits = jdKeywords.filter(k => resumeLower.includes(k)).length;
    simpleMatch = Math.round((hits / jdKeywords.length) * 100);
  }
  
  // Blend both methods: 60% TF-IDF semantic + 40% simple keyword match
  // Blend both methods: 60% TF-IDF semantic + 40% simple keyword match
  const blended = Math.round(cosineSim * 0.6 + simpleMatch * 0.4);
  return Math.max(0, Math.min(100, blended));
}

/** Calibrated composite score blending all signals */
function compositeScore(features, lrProb, overlapPct) {
  const eduScore = features.educationLevel === 'PhD'     ? 100
                 : features.educationLevel === 'Masters' ? 85
                 : features.educationLevel === 'Bachelors' ? 70
                 : 50;

  // Experience: 0 yrs = 0, 10+ yrs = 100, capped at 100
  const expScore = Math.min(100, features.yearsExperience * 10);

  // Blend:  40% keyword overlap  |  30% LR signal  |  20% experience  |  10% education
  const raw = (overlapPct * 0.40) + (lrProb * 0.30) + (expScore * 0.20) + (eduScore * 0.10);

  // Clamp to [10, 97] — never show 0 or 100 for a real resume
  return Math.round(Math.max(10, Math.min(97, raw)));
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Screen a single resume against a job description.
 * Returns a rich result object consumed by both /api/screen and /api/apply.
 */
async function screenResume(resumeText, jobDescription, jobTitle = '', mustSkills = '') {
  // Validate inputs
  if (!resumeText || typeof resumeText !== 'string' || !resumeText.trim()) {
    console.error('❌  screenResume: empty or invalid resumeText received');
    throw new Error('Resume text is empty. Please upload a valid PDF or DOCX file.');
  }

  if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
    console.error('❌  screenResume: empty or invalid jobDescription');
    throw new Error('Job description is required for screening.');
  }

  console.log(`📊 Screening resume (${resumeText.length} chars) against JD (${jobDescription.length} chars)`);

  const features   = extractClassifierFeatures(resumeText, jobDescription, mustSkills);
  const lrProb     = predict(features);              // 0-100 from LR model
  const overlapPct = keywordOverlapScore(resumeText, jobDescription);

  console.log(`  Features extracted: exp=${features.yearsExperience}yrs, skillMatch=${features.skillsMatchScore}%, edu=${features.educationLevel}, projects=${features.projectCount}`);
  console.log(`  LR probability: ${lrProb}%, Keyword overlap: ${overlapPct}%`);

  const score = compositeScore(features, lrProb, overlapPct);

  console.log(`  Final composite score: ${score}/100`);

  // ── Skill analysis ────────────────────────────────────────────────────────
  const jdSkills     = extractSkills(jobDescription);
  const resumeSkills = extractSkills(resumeText);
  const resumeSkillSet = new Set(resumeSkills);

  // Also include high-freq JD keyword matches as "matched" signals
  const jdKeywords = extractKeywords(jobDescription, 30);
  const resumeText_lower = resumeText.toLowerCase();
  const kwMatched  = jdKeywords.filter(k => resumeText_lower.includes(k));
  const kwMissing  = jdKeywords.filter(k => !resumeText_lower.includes(k));

  const matchedSkills = jdSkills.length > 0
    ? jdSkills.filter(s => resumeSkillSet.has(s))
    : kwMatched.slice(0, 12);

  const missingSkills = jdSkills.length > 0
    ? jdSkills.filter(s => !resumeSkillSet.has(s)).slice(0, 8)
    : kwMissing.slice(0, 8);

  // ── Candidate details ─────────────────────────────────────────────────────
  const name    = extractName(resumeText);
  const email   = extractEmail(resumeText);
  const phone   = extractPhone(resumeText);
  const links   = extractLinks(resumeText);
  const role    = extractCurrentRole(resumeText, jobTitle);

  // ── Breakdown sub-scores ──────────────────────────────────────────────────
  const eduScore = features.educationLevel === 'PhD'     ? 95
                 : features.educationLevel === 'Masters' ? 85 : 70;
  const expScore      = Math.min(100, features.yearsExperience * 10);
  const leaderScore   = Math.min(100, features.projectCount * 8);

  // ── Recommendation ────────────────────────────────────────────────────────
  const recommendation = score >= 72 ? 'shortlist' : score >= 50 ? 'review' : 'reject';

  // ── Rich summary ──────────────────────────────────────────────────────────
  const tierLabel = score >= 72 ? 'Strong Match' : score >= 50 ? 'Moderate Match' : 'Needs Work';
  const summary   = [
    `${tierLabel} — composite ML score: ${score}/100.`,
    `Keyword overlap with JD: ${overlapPct}%.`,
    `Experience detected: ${features.yearsExperience} year${features.yearsExperience !== 1 ? 's' : ''}.`,
    `Education: ${features.educationLevel}.`,
    matchedSkills.length
      ? `Key matched skills: ${matchedSkills.slice(0, 5).join(', ')}.`
      : 'No direct skill overlap detected — review manually.',
  ].join(' ');

  return {
    score,
    extractedName:   name,
    extractedEmail:  email,
    extractedPhone:  phone,
    linkedin:        links.linkedin,
    github:          links.github,
    yearsExperience: features.yearsExperience,
    currentRole:     role,
    education:       features.educationLevel + ' Degree',
    matchedSkills,
    missingSkills,
    breakdown: {
      technicalSkills:     overlapPct,
      experienceRelevance: expScore,
      education:           eduScore,
      leadership:          leaderScore,
    },
    keyStrengths: matchedSkills.slice(0, 4),
    concerns:     missingSkills.slice(0, 3),
    summary,
    recommendation,
    lrSignal:    lrProb,   // expose raw LR signal for debugging
    overlapScore: overlapPct,
  };
}

/**
 * ATS compatibility & match engine — calculates accurate multi-factor ATS score.
 */
async function atsCheck(resumeText, jobDescription) {
  const features   = extractClassifierFeatures(resumeText, jobDescription, '');
  const keywordOverlap = keywordOverlapScore(resumeText, jobDescription);

  const jdSkills = extractSkills(jobDescription);
  const resumeSkills = new Set(extractSkills(resumeText));
  const jdKeywords = extractKeywords(jobDescription, 35);
  const resumeText_lower = resumeText.toLowerCase();

  // Skills Density Calculation
  let matchedSkills = [];
  let missingSkills = [];

  if (jdSkills.length > 0) {
    matchedSkills = jdSkills.filter(s => resumeSkills.has(s));
    missingSkills = jdSkills.filter(s => !resumeSkills.has(s));
  } else {
    matchedSkills = jdKeywords.filter(k => resumeText_lower.includes(k));
    missingSkills = jdKeywords.filter(k => !resumeText_lower.includes(k));
  }

  const skillMatchRatio = jdSkills.length > 0
    ? (matchedSkills.length / jdSkills.length)
    : (matchedSkills.length / Math.max(1, jdKeywords.length));

  const skillScore = Math.round(skillMatchRatio * 100);

  // Section Completeness & Readability Score (0-100)
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(resumeText);
  const hasPhone = /(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/.test(resumeText);
  const hasEdu = /(bachelor|master|degree|phd|bs|ms|b\.tech|m\.tech|university|college|education)/i.test(resumeText);
  const hasExp = /(experience|work|employment|position|engineer|developer|lead|manager)/i.test(resumeText);
  const hasProjects = /(projects|built|developed|implemented|designed)/i.test(resumeText);

  let sectionChecklistPoints = 0;
  if (hasEmail) sectionChecklistPoints += 20;
  if (hasPhone) sectionChecklistPoints += 20;
  if (hasEdu)   sectionChecklistPoints += 20;
  if (hasExp)   sectionChecklistPoints += 20;
  if (hasProjects) sectionChecklistPoints += 20;

  const lengthScore = Math.min(100, Math.max(40, Math.round((resumeText.length / 1500) * 100)));
  const formattingScore = Math.round((sectionChecklistPoints * 0.7) + (lengthScore * 0.3));

  // Experience Score
  const expYears = features.yearsExperience || 0;
  const expScore = Math.min(100, Math.max(40, Math.round((expYears / 8) * 100)));

  // Education Fit Score
  const eduScore = features.educationLevel === 'PhD'     ? 98
                 : features.educationLevel === 'Masters' ? 90
                 : features.educationLevel === 'Bachelors' ? 80 : 65;

  // Accurate Weighted ATS Composite Calculation:
  // 35% Keyword Fit + 30% Skill Match + 20% Experience Fit + 15% Formatting/Completeness
  let rawAtsScore = (keywordOverlap * 0.35) + (skillScore * 0.30) + (expScore * 0.20) + (formattingScore * 0.15);
  let score = Math.round(Math.min(99, Math.max(15, rawAtsScore)));

  let tier = 'Needs Optimization';
  if      (score >= 75) tier = 'Strong ATS Match';
  else if (score >= 55) tier = 'Moderate Match';

  const tips = [];

  if (missingSkills.length > 0) {
    tips.push(`🔑 Priority Skill Gaps: Add missing core keywords to your resume: ${missingSkills.slice(0, 4).join(', ')}.`);
  } else {
    tips.push('✅ Keyword Match: Outstanding coverage of all core job description requirements!');
  }

  if (!hasEmail || !hasPhone) {
    tips.push('✉ Contact Info: Ensure email address and phone number are clearly visible at top of resume.');
  }

  if (features.yearsExperience < 3) {
    tips.push('📈 Impact Quantification: Highlight measurable project outcomes (e.g. "Increased throughput by 40%").');
  } else {
    tips.push('📊 Leadership Metrics: Quantify accomplishments with metrics (e.g., "managed 5-node cluster, reduced costs by $20k").');
  }

  if (!resumeText_lower.includes('github.com') && !resumeText_lower.includes('linkedin.com')) {
    tips.push('🌐 Online Profiles: Include active LinkedIn and GitHub URLs to enhance candidate authority.');
  }

  tips.push('📑 ATS Parsing Tip: Use clear standard headings (Experience, Technical Skills, Education, Projects).');

  return {
    score,
    tier,
    matchedKeywords: matchedSkills,
    missingKeywords: missingSkills.slice(0, 8),
    sectionScores: {
      skills:     skillScore,
      keywordFit: keywordOverlap,
      experience: expScore,
      education:  eduScore,
      formatting: formattingScore,
    },
    tips,
    summary: `ATS Engine Analysis: ${score}/100 (${tier}). Skill Density: ${skillScore}%. Keyword Overlap: ${keywordOverlap}%. Experience Fit: ${expYears} yrs. Section Completeness: ${formattingScore}%.`,
  };
}

module.exports = { screenResume, atsCheck };
