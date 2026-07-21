'use strict';

// ─── Demo candidate data (shown before a real screening run) ──────────────────
const CANDIDATES = [
  {
    id: 1, initials: 'PN', name: 'Priya Nair', location: 'Bangalore, IN',
    role: 'Senior ML Engineer', experience: '8 yrs', experienceYears: 8,
    education: 'M.S. Computer Science, IIT Bombay', score: 92, status: 'interview',
    matchedSkills: ['PyTorch','Transformers','MLflow','Python','Kubernetes','RLHF','RAG','Distributed Training'],
    missingSkills: ['Triton','JAX'],
    breakdown: [
      { label: 'Technical skills',     pct: 95 },
      { label: 'Experience relevance', pct: 96 },
      { label: 'Education fit',        pct: 88 },
      { label: 'Leadership / Projects',pct: 89 },
    ],
    timeline: [
      { dates: '2021 – Present', role: 'Lead ML Engineer',  company: 'Arcturus AI, Bangalore' },
      { dates: '2018 – 2021',    role: 'ML Engineer II',    company: 'Flipkart, Bangalore' },
      { dates: '2016 – 2018',    role: 'Data Scientist',    company: 'Mu Sigma, Bangalore' },
    ],
  },
  {
    id: 2, initials: 'JK', name: 'Jonas Kern', location: 'London, UK',
    role: 'Senior ML Engineer', experience: '7 yrs', experienceYears: 7,
    education: 'Ph.D. Machine Learning, TU Berlin', score: 87, status: 'interview',
    matchedSkills: ['JAX','TensorFlow','Python','Kubernetes','Distributed Training','MLflow'],
    missingSkills: ['RLHF','RAG','Triton'],
    breakdown: [
      { label: 'Technical skills',     pct: 78 },
      { label: 'Experience relevance', pct: 88 },
      { label: 'Education fit',        pct: 94 },
      { label: 'Leadership / Projects',pct: 91 },
    ],
    timeline: [
      { dates: '2020 – Present', role: 'Senior Research Engineer', company: 'DeepMind, London' },
      { dates: '2017 – 2020',    role: 'ML Research Engineer',     company: 'Zalando SE, Berlin' },
      { dates: '2015 – 2017',    role: 'Research Assistant',       company: 'TU Berlin' },
    ],
  },
  {
    id: 3, initials: 'CD', name: 'Camille Dufresne', location: 'Paris, FR',
    role: 'Senior ML Engineer', experience: '6 yrs', experienceYears: 6,
    education: 'M.Sc. Applied Mathematics, Ecole Polytechnique', score: 79, status: 'shortlisted',
    matchedSkills: ['PyTorch','Python','RAG','MLflow','Docker'],
    missingSkills: ['Kubernetes','RLHF','Triton','JAX','Distributed Training'],
    breakdown: [
      { label: 'Technical skills',     pct: 70 },
      { label: 'Experience relevance', pct: 80 },
      { label: 'Education fit',        pct: 85 },
      { label: 'Leadership / Projects',pct: 82 },
    ],
    timeline: [
      { dates: '2022 – Present', role: 'ML Engineer',    company: 'Mistral AI, Paris' },
      { dates: '2019 – 2022',    role: 'Data Engineer',  company: 'Dataiku, Paris' },
      { dates: '2018 – 2019',    role: 'Research Intern',company: 'INRIA, Sophia Antipolis' },
    ],
  },
  {
    id: 4, initials: 'AM', name: 'Arjun Mehta', location: 'Bangalore, IN',
    role: 'Senior ML Engineer', experience: '5 yrs', experienceYears: 5,
    education: 'B.Tech Computer Science, NIT Trichy', score: 72, status: 'shortlisted',
    matchedSkills: ['Python','PyTorch','Docker','RAG','HuggingFace'],
    missingSkills: ['Kubernetes','Triton','JAX','RLHF','Distributed Training','MLflow'],
    breakdown: [
      { label: 'Technical skills',     pct: 63 },
      { label: 'Experience relevance', pct: 72 },
      { label: 'Education fit',        pct: 70 },
      { label: 'Leadership / Projects',pct: 75 },
    ],
    timeline: [
      { dates: '2022 – Present', role: 'ML Engineer',      company: 'Sarvam AI, Bangalore' },
      { dates: '2020 – 2022',    role: 'Software Engineer', company: 'Infosys, Pune' },
      { dates: '2019 – 2020',    role: 'ML Intern',         company: 'Amazon, Hyderabad' },
    ],
  },
  {
    id: 5, initials: 'FA', name: 'Fatimah Al-Rashid', location: 'Riyadh, SA',
    role: 'Senior ML Engineer', experience: '4 yrs', experienceYears: 4,
    education: 'M.Sc. Data Science, University of Edinburgh', score: 65, status: 'review',
    matchedSkills: ['Python','TensorFlow','Scikit-learn','Docker'],
    missingSkills: ['PyTorch','Kubernetes','Triton','JAX','RLHF','Distributed Training','RAG'],
    breakdown: [
      { label: 'Technical skills',     pct: 50 },
      { label: 'Experience relevance', pct: 65 },
      { label: 'Education fit',        pct: 80 },
      { label: 'Leadership / Projects',pct: 67 },
    ],
    timeline: [
      { dates: '2023 – Present', role: 'Data Scientist',     company: 'SDAIA, Riyadh' },
      { dates: '2021 – 2023',    role: 'ML Engineer',        company: 'Careem, Dubai' },
      { dates: '2020 – 2021',    role: 'Graduate Researcher',company: 'University of Edinburgh' },
    ],
  },
  {
    id: 6, initials: 'TW', name: 'Tobias Wren', location: 'Sydney, AU',
    role: 'Senior ML Engineer', experience: '3 yrs', experienceYears: 3,
    education: 'B.Sc. Statistics, University of Melbourne', score: 59, status: 'review',
    matchedSkills: ['Python','Scikit-learn','Pandas'],
    missingSkills: ['PyTorch','TensorFlow','Kubernetes','Triton','JAX','RLHF','Distributed Training','RAG','MLflow'],
    breakdown: [
      { label: 'Technical skills',     pct: 40 },
      { label: 'Experience relevance', pct: 56 },
      { label: 'Education fit',        pct: 65 },
      { label: 'Leadership / Projects',pct: 62 },
    ],
    timeline: [
      { dates: '2024 – Present', role: 'Junior ML Engineer', company: 'Canva, Sydney' },
      { dates: '2022 – 2024',    role: 'Data Analyst',       company: 'NAB, Melbourne' },
    ],
  },
];

// ─── Constants / state ────────────────────────────────────────────────────────
const PAGE_MAP = {
  home: 'Home', upload: 'Upload', candidates: 'Candidates',
  dashboard: 'Analysis Dashboard', profile: 'Profile',
  'candidate-detail': 'Candidate Review', apply: 'Apply Job',
  applications: 'Applications', 'resume-create': 'Resume Create',
  'ats-check': 'ATS Check', 'my-applications': 'My Applications',
};

// Point API calls at the backend. When the file is served by Express the origin
// is the same host; when opened directly as file:// use localhost:3001.
const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:3001' : '';

const avatarColors = ['av-0','av-1','av-2','av-3','av-4','av-5'];

let currentPage      = 'home';
let currentCandidate = null;
let currentFilter    = 'all';
let currentSearch    = '';
let currentSort      = 'score';
let visibleCandidates = [...CANDIDATES];
let toastTimer       = null;
let fileCount        = 0;

// Auth
let currentRole      = null;   // 'hr' | 'candidate'
let currentUser      = null;   // { name, email }
let authSelectedRole = null;
let authMode         = 'signin';

// Apply Job
let applyJobId          = null;
let applyJobTitle       = '';
let applyJobDept        = '';
let applyJobLocation    = '';
let applyJobDescription = '';
let applyResumeFile     = null;

// Applications (in-memory mirror of backend store)
let APPLICATIONS  = [];
let expandedAppId = null;

// ─── Utilities ────────────────────────────────────────────────────────────────
const esc = v => { const d = document.createElement('div'); d.textContent = v; return d.innerHTML; };
const scoreClass = s => s >= 80 ? 'score-green' : s >= 65 ? 'score-amber' : 'score-red';
const statusInfo = s => {
  if (s === 'interview')  return { label: 'Interview-ready', cls: 's-interview' };
  if (s === 'shortlisted') return { label: 'Shortlisted',    cls: 's-short' };
  return { label: 'Under review', cls: 's-review' };
};

function getInitials(name = '') {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => (w[0] || '?').toUpperCase()).join('') || 'CV';
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ─── Meta / counters ──────────────────────────────────────────────────────────
function updateMeta() {
  const interview   = CANDIDATES.filter(c => c.status === 'interview').length;
  const shortlisted = CANDIDATES.filter(c => c.status === 'shortlisted').length;
  const review      = CANDIDATES.filter(c => c.status === 'review').length;
  // Guard against empty array (avoids NaN)
  const avgScore    = CANDIDATES.length
    ? (CANDIDATES.reduce((s, c) => s + (c.score || 0), 0) / CANDIDATES.length).toFixed(1)
    : '0.0';

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('screening-count', `${CANDIDATES.length} candidates`);
  set('file-count-meta', `${fileCount} files`);
  set('sidebar-summary', `${CANDIDATES.length} candidates ready`);
  set('stat-total',      '248');
  set('stat-interview',  String(interview));
  set('stat-shortlisted',String(shortlisted));
  set('stat-review',     String(review));
  set('hero-score',      avgScore);
  set('count-all',       String(CANDIDATES.length));
  set('count-interview', String(interview));
  set('count-shortlisted',String(shortlisted));
  set('count-review',    String(review));
}

function paintBarWidths() {
  document.querySelectorAll('[data-width]').forEach(bar => {
    bar.style.width = `${bar.dataset.width}%`;
  });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function setNavActive(page) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`nav-${page}`);
  if (btn) btn.classList.add('active');
}

function updateBreadcrumb(label) {
  const el = document.getElementById('breadcrumb-label');
  if (el) el.textContent = label;
  document.title = `Sieve — ${label}`;
}

function showPage(page) {
  document.querySelectorAll('.page').forEach(s => { s.classList.remove('active'); s.hidden = true; });
  const active = document.getElementById(`page-${page}`);
  if (active) { active.classList.add('active'); active.hidden = false; }
}

function navigate(page, candidateId) {
  if (page === 'candidate-detail') {
    if (candidateId !== undefined) {
      // Compare as strings to handle numeric vs string id mismatch
      currentCandidate = CANDIDATES.find(c => String(c.id) === String(candidateId)) || null;
    }
    if (!currentCandidate) return;
  }
  currentPage = page;
  showPage(page);
  setNavActive(page === 'candidate-detail' ? 'candidates' : page);
  updateBreadcrumb(PAGE_MAP[page] || 'Home');

  if (page === 'candidates')         renderCandidateList();
  if (page === 'candidate-detail' && currentCandidate) {
    renderCandidateDetail(currentCandidate);
    renderAIInterviewQuestions(currentCandidate);
  }
  if (page === 'applications')       renderApplicationList();
  if (page === 'my-applications')    renderMyApplications();
  if (page === 'apply')              closeApplyForm();
  if (page === 'resume-create')      buildResumePreview();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Candidate list ───────────────────────────────────────────────────────────
function applyCandidateQuery(list) {
  const q = currentSearch.trim().toLowerCase();
  if (!q) return list;
  return list.filter(c => {
    const skills = [...(c.matchedSkills || []), ...(c.missingSkills || [])];
    return [c.name, c.role, c.location, c.education, ...skills]
      .filter(Boolean).join(' ').toLowerCase().includes(q);
  });
}
function applyCandidateFilter(list) {
  if (currentFilter === 'all') return list;
  return list.filter(c => c.status === currentFilter);
}
function applyCandidateSort(list) {
  const s = [...list];
  if (currentSort === 'score') s.sort((a, b) => b.score - a.score);
  if (currentSort === 'exp')   s.sort((a, b) => b.experienceYears - a.experienceYears);
  if (currentSort === 'name')  s.sort((a, b) => a.name.localeCompare(b.name));
  return s;
}

function renderCandidateList() {
  const container = document.getElementById('candidate-list');
  const hint      = document.getElementById('candidate-hint');
  if (!container) return;

  let list = applyCandidateFilter(CANDIDATES);
  list = applyCandidateQuery(list);
  list = applyCandidateSort(list);
  visibleCandidates = list;
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<div class="row-empty">No candidates match this search or filter.</div>';
    if (hint) hint.textContent = 'Try a different search term or switch filters.';
    return;
  }
  if (hint) hint.textContent = `Showing ${list.length} candidate${list.length === 1 ? '' : 's'}.`;

  list.forEach((c, i) => {
    const row = document.createElement('div');
    row.className = 'c-row';
    row.tabIndex  = 0;
    row.setAttribute('role', 'listitem');
    row.setAttribute('aria-label', `${c.name}, score ${c.score} out of 100`);

    const { label, cls } = statusInfo(c.status);
    const avCls = avatarColors[i % avatarColors.length];
    const skillChips = (c.matchedSkills || []).slice(0, 3).map(sk => `<span class="chip chip-green">${esc(sk)}</span>`).join('');
    const gapChip    = (c.missingSkills || []).slice(0, 1).map(sk => `<span class="chip chip-red">${esc(sk)}</span>`).join('');

    row.innerHTML = `
      <div class="c-rank">${String(i + 1).padStart(2, '0')}</div>
      <div class="c-name-wrap">
        <div class="c-avatar ${avCls}">${esc(c.initials || getInitials(c.name))}</div>
        <div><span class="c-name">${esc(c.name)}</span><span class="c-location">${esc(c.location)}</span></div>
      </div>
      <div class="c-exp">${esc(c.experience)}</div>
      <div class="c-skills">${skillChips}${gapChip}</div>
      <div class="c-status"><span class="status-badge ${cls}">${label}</span></div>
      <div class="c-score">
        <span class="score-big-num ${scoreClass(c.score)}">${c.score}</span>
        <span class="score-small">/100</span>
      </div>`;

    row.addEventListener('click', () => {
      currentCandidate = c;
      navigate('candidate-detail', c.id);
    });
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        currentCandidate = c;
        navigate('candidate-detail', c.id);
      }
    });
    container.appendChild(row);
  });
}

function filterCandidates(type, btn) {
  currentFilter = type;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCandidateList();
}
function setCandidateQuery(val) { currentSearch = val || ''; renderCandidateList(); }
function sortCandidates(method) { currentSort = method; renderCandidateList(); }

// ─── Candidate detail ─────────────────────────────────────────────────────────
function renderCandidateDetail(c) {
  const avIdx = CANDIDATES.indexOf(c);
  const avCls = avatarColors[(avIdx >= 0 ? avIdx : 0) % avatarColors.length];
  const CIRC  = 263.8;

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  const get = id => document.getElementById(id);

  const av = get('detail-avatar');
  if (av) { av.textContent = c.initials || getInitials(c.name); av.className = `detail-avatar ${avCls}`; }

  set('detail-role-label', c.role);
  set('detail-name',       c.name);
  set('detail-score-num',  c.score);

  const tags = get('detail-tags');
  if (tags) tags.innerHTML = [
    `<span class="detail-tag">${esc(c.experience)} experience</span>`,
    `<span class="detail-tag">${esc(c.education)}</span>`,
    `<span class="detail-tag detail-tag-green">${esc(c.location)}</span>`,
  ].join('');

  const ring = get('score-ring-fill');
  if (ring) {
    ring.classList.remove('amber-ring','red-ring');
    if (c.score < 65) ring.classList.add('red-ring');
    else if (c.score < 80) ring.classList.add('amber-ring');
    ring.style.strokeDashoffset = CIRC;
    requestAnimationFrame(() => { ring.style.strokeDashoffset = CIRC - (c.score / 100) * CIRC; });
  }

  const tier = get('score-tier-badge');
  if (tier) {
    if      (c.score >= 80) { tier.textContent = 'Excellent match'; tier.className = 'score-tier-badge tier-ex'; }
    else if (c.score >= 65) { tier.textContent = 'Good match';      tier.className = 'score-tier-badge tier-gd'; }
    else                    { tier.textContent = 'Needs review';    tier.className = 'score-tier-badge tier-rv'; }
  }

  const bRows = get('breakdown-rows');
  if (bRows) bRows.innerHTML = (c.breakdown || []).map(r => `
    <div class="breakdown-row">
      <span class="b-label">${esc(r.label)}</span>
      <div class="b-bar-wrap"><div class="b-bar-fill" style="width:${r.pct}%"></div></div>
      <span class="b-pct">${r.pct}%</span>
    </div>`).join('');

  const tRows = get('timeline-rows');
  if (tRows) tRows.innerHTML = (c.timeline || []).map(e => `
    <div class="timeline-entry">
      <span class="t-dates">${esc(e.dates)}</span>
      <div><span class="t-role">${esc(e.role)}</span><span class="t-company">${esc(e.company)}</span></div>
    </div>`).join('');

  set('matched-count-badge', String((c.matchedSkills || []).length));
  set('missing-count-badge', String((c.missingSkills || []).length));

  const mc = get('matched-chips');
  if (mc) mc.innerHTML = (c.matchedSkills || []).map(sk => `<span class="chip chip-green">${esc(sk)}</span>`).join('');
  const ms = get('missing-chips');
  if (ms) ms.innerHTML = (c.missingSkills || []).map(sk => `<span class="chip chip-red">${esc(sk)}</span>`).join('');
}

// ─── Skills preview chips ─────────────────────────────────────────────────────
function previewSkills(inputId, previewId, chipClass) {
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if (!input || !preview) return;
  const skills = input.value.split(',').map(s => s.trim()).filter(Boolean);
  preview.innerHTML = skills.map(s => `<span class="chip ${chipClass}">${esc(s)}</span>`).join('');
}

// ─── Dropzone init ────────────────────────────────────────────────────────────
function initDropzone() {
  const zone = document.getElementById('dropzone');
  if (!zone) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.style.borderColor = 'rgba(37,99,235,0.45)';
    zone.style.transform   = 'translateY(-1px)';
  });
  zone.addEventListener('dragleave', () => {
    zone.style.borderColor = '';
    zone.style.transform   = '';
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.style.borderColor = '';
    zone.style.transform   = '';
    const files = Array.from(e.dataTransfer?.files || []);
    if (!files.length) return;
    fileCount = files.length;
    _updateDropUI(files.length);
    // Transfer dropped files to the hidden input so runScreening() can read them
    const dt = new DataTransfer();
    files.forEach(f => dt.items.add(f));
    const fi = document.getElementById('file-input');
    if (fi) fi.files = dt.files;
    showToast(`${files.length} file${files.length === 1 ? '' : 's'} added`);
  });
}

function _updateDropUI(count) {
  const text  = document.getElementById('dz-text');
  const row   = document.getElementById('file-count-row');
  const label = document.getElementById('file-count-label');
  if (text)  text.textContent  = `${count} file${count === 1 ? '' : 's'} selected and ready.`;
  if (row)   row.hidden = false;
  if (label) label.textContent = `${count} file${count === 1 ? '' : 's'} ready`;
  updateMeta();
}

function handleFiles(input) {
  const files = Array.from(input.files || []);
  if (!files.length) return;
  fileCount = files.length;
  _updateDropUI(files.length);
  showToast(`${files.length} file${files.length === 1 ? '' : 's'} added`);
}

// ─── Run Screening (HR) ───────────────────────────────────────────────────────
function runScreening() {
  const btn        = document.getElementById('run-btn');
  const label      = document.getElementById('run-label');
  const pill       = document.getElementById('status-pill');
  const statusText = document.getElementById('status-text');

  if (!btn || btn.dataset.loading === 'true') return;

  const fileInput  = document.getElementById('file-input');
  const files      = fileInput ? Array.from(fileInput.files || []) : [];
  const jobTitle   = document.getElementById('job-title')?.value?.trim()   || 'Open Position';
  const jobDesc    = document.getElementById('jd-text')?.value?.trim()     || '';
  const mustSkills = document.getElementById('must-skills')?.value?.trim() || '';

  if (!files.length) { showToast('Please upload at least one resume.'); return; }
  if (!jobDesc)       { showToast('Please enter a job description.'); return; }

  btn.dataset.loading = 'true';
  if (pill)       pill.classList.add('running');
  if (statusText) statusText.textContent = 'ML screening in progress…';

  // Progress label steps
  const steps = [
    [0,    'Extracting text from resumes…'],
    [600,  'Running ML classifier…'],
    [1400, 'Scoring candidates…'],
    [2200, 'Ranking results…'],
  ];
  steps.forEach(([delay, text]) => {
    setTimeout(() => { if (label) label.innerHTML = `<span class="spinner"></span> ${text}`; }, delay);
  });

  const formData = new FormData();
  files.forEach(f => formData.append('resumes', f));
  formData.append('jobTitle',       jobTitle);
  formData.append('jobDescription', jobDesc);
  formData.append('mustSkills',     mustSkills);

  fetch(`${API_BASE}/api/screen`, { method: 'POST', body: formData })
    .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, data })))
    .then(({ ok, status, data }) => {
      if (!ok || data.error) throw new Error(data.error || `Server error ${status}`);

      if (data.candidates && data.candidates.length) {
        data.candidates.forEach((c, i) => {
          c.initials  = c.initials || getInitials(c.name || c.filename || 'CV');
          c.avatarCls = avatarColors[i % avatarColors.length];
          // Normalise status to one of the three valid values
          if (!['shortlisted','interview','review'].includes(c.status)) c.status = 'review';
          // Ensure arrays always exist so the UI never crashes on spread
          c.matchedSkills = c.matchedSkills || [];
          c.missingSkills = c.missingSkills || [];
          c.breakdown     = c.breakdown     || [];
          c.timeline      = c.timeline      || [];
        });
        CANDIDATES.length = 0;
        data.candidates.forEach(c => CANDIDATES.push(c));
        visibleCandidates = [...CANDIDATES];
      }

      btn.dataset.loading = 'false';
      if (label)      label.textContent  = 'Run screening';
      if (pill)       pill.classList.remove('running');
      if (statusText) statusText.textContent = `${CANDIDATES.length} candidates ranked by ML model`;
      updateMeta();
      showToast(`ML model screened ${CANDIDATES.length} resume${CANDIDATES.length !== 1 ? 's' : ''} ✓`);
      navigate('candidates');
    })
    .catch(err => {
      console.error('Screening error:', err);
      btn.dataset.loading = 'false';
      if (label)      label.textContent  = 'Run screening';
      if (pill)       pill.classList.remove('running');
      if (statusText) statusText.textContent = 'Backend offline — showing demo data';
      showToast(`Could not reach backend: ${err.message}`);
      navigate('candidates');
    });
}

// ─── Auth flow ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => { initTheme(); initAuth(); });

function initAuth() {
  try {
    const stored = localStorage.getItem('sieve_user');
    if (stored) {
      const { role, user } = JSON.parse(stored);
      if (role && user) { launchPortal(role, user); return; }
    }
  } catch { /* ignore */ }
  showAuthScreen();
}

function showAuthScreen() {
  const as = document.getElementById('auth-screen');
  const aw = document.getElementById('app-wrapper');
  if (as) as.hidden = false;
  if (aw) aw.hidden = true;
}

function setAuthRole(role) {
  authSelectedRole = role;
  const isHr = (role === 'hr');
  
  const hrBtn   = document.getElementById('role-btn-hr');
  const candBtn = document.getElementById('role-btn-candidate');
  
  if (hrBtn)   hrBtn.classList.toggle('active', isHr);
  if (candBtn) {
    candBtn.classList.toggle('active', !isHr);
    candBtn.classList.toggle('candidate-active', !isHr);
  }

  const detailLabel = document.getElementById('auth-detail-label');
  const detailInput = document.getElementById('auth-detail');
  
  if (detailLabel) detailLabel.textContent = isHr ? 'Company / Organization' : 'Target Role / Profession';
  if (detailInput) detailInput.placeholder = isHr ? 'e.g. TechCorp Inc.' : 'e.g. Senior ML Engineer';

  updateAuthSubmitLabel();
}

function switchAuthTab(mode) {
  authMode = mode;
  document.getElementById('tab-signin')?.classList.toggle('active', mode === 'signin');
  document.getElementById('tab-signup')?.classList.toggle('active', mode === 'signup');
  const ng = document.getElementById('auth-name-group');
  if (ng) ng.hidden = (mode === 'signin');
  updateAuthSubmitLabel();
}

function updateAuthSubmitLabel() {
  const bl = document.getElementById('auth-btn-label');
  const isHr = (authSelectedRole === 'hr');
  if (bl) {
    bl.textContent = authMode === 'signin'
      ? `Sign In as ${isHr ? 'HR Recruiter' : 'Job Seeker'}`
      : `Create ${isHr ? 'Recruiter' : 'Applicant'} Account`;
  }
}

function handleAuth() {
  const email    = (document.getElementById('auth-email')?.value    || '').trim();
  const password = (document.getElementById('auth-password')?.value || '');
  let   name     = (document.getElementById('auth-name')?.value     || '').trim();
  const detail   = (document.getElementById('auth-detail')?.value   || '').trim();

  if (!email)              { showToast('Please enter your work/professional email.'); return; }
  if (password.length < 4) { showToast('Password must be at least 4 characters.'); return; }
  if (authMode === 'signup' && !name) { showToast('Please enter your full name.'); return; }

  if (authMode === 'signin') {
    const part = email.split('@')[0].replace(/[._]/g, ' ');
    name = part.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  const btn = document.getElementById('auth-submit-btn');
  const lbl = document.getElementById('auth-btn-label');
  if (btn) btn.disabled = true;
  if (lbl) lbl.innerHTML = `<span class="spinner"></span> ${authMode === 'signin' ? 'Signing in…' : 'Creating account…'}`;

  setTimeout(() => {
    if (btn) btn.disabled = false;
    if (lbl) lbl.textContent = authMode === 'signin' ? 'Sign In' : 'Create Account';
    const user = { name, email };
    localStorage.setItem('sieve_user', JSON.stringify({ role: authSelectedRole, user }));
    launchPortal(authSelectedRole, user);
  }, 900);
}

function handleDemoLogin() {
  if (!authSelectedRole) { showToast('Please select HR or Job Seeker first.'); return; }
  handleDirectDemo(authSelectedRole);
}

function handleDirectDemo(role) {
  authSelectedRole = role;
  const demos = {
    hr:        { name: 'Sarah Chen', email: 'sarah.chen@acmecorp.com' },
    candidate: { name: 'Priya Nair', email: 'priya.nair@example.com' },
  };
  const user = demos[role];
  localStorage.setItem('sieve_user', JSON.stringify({ role, user }));
  showToast(`Signed in as ${user.name} (${role === 'hr' ? 'HR Director' : 'Job Seeker'}) ✓`);
  launchPortal(role, user);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    if (btn) btn.textContent = '🙈';
  } else {
    input.type = 'password';
    if (btn) btn.textContent = '👁';
  }
}

function launchPortal(role, user) {
  currentRole = role;
  currentUser = user;
  document.getElementById('auth-screen').hidden = true;
  document.getElementById('app-wrapper').hidden  = false;
  document.body.dataset.role = role;

  const av   = document.getElementById('topbar-user-avatar');
  const uname= document.getElementById('topbar-user-name');
  const uwrap= document.getElementById('topbar-user');
  const lbtn = document.getElementById('topbar-logout-btn');
  const nbtn = document.getElementById('topbar-new-btn');

  if (av)    av.textContent    = user.name.charAt(0).toUpperCase();
  if (uname) uname.textContent = user.name.split(' ')[0];
  if (uwrap) uwrap.hidden      = false;
  if (lbtn)  lbtn.hidden       = false;

  if (nbtn) {
    nbtn.hidden = false;
    if (role === 'hr') { nbtn.textContent = 'New Screening'; nbtn.onclick = () => navigate('upload'); }
    else               { nbtn.textContent = 'Apply Now';      nbtn.onclick = () => navigate('apply'); }
  }

  const note = document.querySelector('.sidebar-card-note');
  if (note) note.textContent = role === 'hr'
    ? 'Upload resumes, run ML screening, then review only the strongest matches.'
    : 'Build your resume, check your ATS score, and apply to open positions.';

  updateMeta();
  initDropzone();
  paintBarWidths();
  navigate('home');
}

function logout() {
  localStorage.removeItem('sieve_user');
  currentRole = null; currentUser = null;
  document.body.dataset.role = '';
  const stepRole = document.getElementById('auth-step-role');
  const stepForm = document.getElementById('auth-step-form');
  if (stepRole) stepRole.hidden = false;
  if (stepForm) stepForm.hidden = true;
  ['auth-email','auth-password','auth-name','auth-detail'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  authSelectedRole = null; authMode = 'signin';
  switchAuthTab('signin');
  showAuthScreen();
  showToast('Signed out successfully.');
}

// ─── Resume Builder (Candidate) State & Customization ────────────────────────
let currentTemplate    = 'modern'; // 'modern' | 'tech' | 'classic' | 'creative' | 'compact'
let currentAccentColor = '#2563eb';
let currentFontFamily  = "'Inter', sans-serif";

let resumeExperiences = [
  {
    id: 1,
    role: 'Lead ML Engineer',
    company: 'Arcturus AI',
    dates: '2021 – Present',
    location: 'Bangalore, IN',
    desc: '• Led end-to-end deployment of production LLM pipeline\n• Reduced inference latency by 40% using Triton\n• Mentored a team of 5 engineers'
  }
];

let resumeEducations = [
  {
    id: 1,
    degree: 'M.S. Computer Science',
    institution: 'IIT Bombay',
    year: '2018',
    grade: '8.9 / 10'
  }
];

function selectTemplate(tplName) {
  currentTemplate = tplName;
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
  const card = document.getElementById(`tpl-card-${tplName}`);
  if (card) card.classList.add('active');
  
  const preview = document.getElementById('resume-preview-card');
  if (preview) {
    preview.className = `resume-preview-card tpl-${tplName}`;
  }
  buildResumePreview();
  showToast(`Switched template to ${tplName.toUpperCase()} ✓`);
}

function selectResumeColor(colorHex, el) {
  currentAccentColor = colorHex;
  document.querySelectorAll('.color-pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  
  const preview = document.getElementById('resume-preview-card');
  if (preview) {
    preview.style.setProperty('--tpl-accent', colorHex);
    preview.style.setProperty('--tpl-accent-light', colorHex + '15');
  }
  buildResumePreview();
}

function selectResumeFont(fontFamily) {
  currentFontFamily = fontFamily;
  const preview = document.getElementById('resume-preview-card');
  if (preview) {
    preview.style.setProperty('--tpl-font', fontFamily);
  }
  buildResumePreview();
}

function addExperienceEntry() {
  const newId = Date.now();
  resumeExperiences.push({
    id: newId,
    role: '',
    company: '',
    dates: '',
    location: '',
    desc: ''
  });
  renderExperienceFormInputs();
  buildResumePreview();
}

function deleteExperienceEntry(id) {
  resumeExperiences = resumeExperiences.filter(e => e.id !== id);
  renderExperienceFormInputs();
  buildResumePreview();
}

function updateExperienceEntry(id, field, value) {
  const item = resumeExperiences.find(e => e.id === id);
  if (item) {
    item[field] = value;
    buildResumePreview();
  }
}

function renderExperienceFormInputs() {
  const container = document.getElementById('experience-entries-container');
  if (!container) return;
  
  if (!resumeExperiences.length) {
    container.innerHTML = `<p style="font-size:13px;color:var(--muted);margin:0 0 10px">No experience entries added. Click "+ Add Role" to add one.</p>`;
    return;
  }
  
  container.innerHTML = resumeExperiences.map((item, idx) => `
    <div class="dynamic-entry-card">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-title">Role #${idx + 1}</span>
        ${resumeExperiences.length > 1 ? `<button type="button" class="btn-delete-entry" onclick="deleteExperienceEntry(${item.id})">Remove</button>` : ''}
      </div>
      <div class="field-row-2">
        <div class="field-group">
          <label class="field-label">Job title</label>
          <input type="text" class="field-input" value="${esc(item.role)}" placeholder="e.g. Senior ML Engineer" oninput="updateExperienceEntry(${item.id}, 'role', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Company</label>
          <input type="text" class="field-input" value="${esc(item.company)}" placeholder="e.g. Arcturus AI" oninput="updateExperienceEntry(${item.id}, 'company', this.value)" />
        </div>
      </div>
      <div class="field-row-2">
        <div class="field-group">
          <label class="field-label">Duration</label>
          <input type="text" class="field-input" value="${esc(item.dates)}" placeholder="e.g. 2021 – Present" oninput="updateExperienceEntry(${item.id}, 'dates', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Location</label>
          <input type="text" class="field-input" value="${esc(item.location)}" placeholder="e.g. Bangalore, IN" oninput="updateExperienceEntry(${item.id}, 'location', this.value)" />
        </div>
      </div>
      <div class="field-group">
        <label class="field-label">Key achievements</label>
        <textarea class="field-textarea" rows="3" placeholder="• Key responsibility or metric..." oninput="updateExperienceEntry(${item.id}, 'desc', this.value)">${esc(item.desc)}</textarea>
      </div>
    </div>
  `).join('');
}

function addEducationEntry() {
  const newId = Date.now();
  resumeEducations.push({
    id: newId,
    degree: '',
    institution: '',
    year: '',
    grade: ''
  });
  renderEducationFormInputs();
  buildResumePreview();
}

function deleteEducationEntry(id) {
  resumeEducations = resumeEducations.filter(e => e.id !== id);
  renderEducationFormInputs();
  buildResumePreview();
}

function updateEducationEntry(id, field, value) {
  const item = resumeEducations.find(e => e.id === id);
  if (item) {
    item[field] = value;
    buildResumePreview();
  }
}

function renderEducationFormInputs() {
  const container = document.getElementById('education-entries-container');
  if (!container) return;
  
  if (!resumeEducations.length) {
    container.innerHTML = `<p style="font-size:13px;color:var(--muted);margin:0 0 10px">No education entries added. Click "+ Add Education" to add one.</p>`;
    return;
  }
  
  container.innerHTML = resumeEducations.map((item, idx) => `
    <div class="dynamic-entry-card">
      <div class="dynamic-entry-header">
        <span class="dynamic-entry-title">Education #${idx + 1}</span>
        ${resumeEducations.length > 1 ? `<button type="button" class="btn-delete-entry" onclick="deleteEducationEntry(${item.id})">Remove</button>` : ''}
      </div>
      <div class="field-row-2">
        <div class="field-group">
          <label class="field-label">Degree</label>
          <input type="text" class="field-input" value="${esc(item.degree)}" placeholder="e.g. M.S. Computer Science" oninput="updateEducationEntry(${item.id}, 'degree', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">Institution</label>
          <input type="text" class="field-input" value="${esc(item.institution)}" placeholder="e.g. IIT Bombay" oninput="updateEducationEntry(${item.id}, 'institution', this.value)" />
        </div>
      </div>
      <div class="field-row-2">
        <div class="field-group">
          <label class="field-label">Year</label>
          <input type="text" class="field-input" value="${esc(item.year)}" placeholder="e.g. 2018" oninput="updateEducationEntry(${item.year}, 'year', this.value)" />
        </div>
        <div class="field-group">
          <label class="field-label">GPA / Grade <span class="field-optional">optional</span></label>
          <input type="text" class="field-input" value="${esc(item.grade)}" placeholder="e.g. 8.9 / 10" oninput="updateEducationEntry(${item.id}, 'grade', this.value)" />
        </div>
      </div>
    </div>
  `).join('');
}

function loadSampleResumeData() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  set('rb-name',     'Priya Nair');
  set('rb-title',    'Senior ML Engineer');
  set('rb-email',    'priya.nair@example.com');
  set('rb-phone',    '+91 98765 43210');
  set('rb-location', 'Bangalore, IN');
  set('rb-linkedin', 'linkedin.com/in/priyanair-ml');
  set('rb-summary',  'Senior Machine Learning Engineer with 8 years of hands-on expertise building production LLM pipelines, distributed training infrastructure, and real-time recommendation systems.');
  set('rb-skills',   'PyTorch, Transformers, MLflow, Python, Kubernetes, RLHF, RAG, Distributed Training, Docker');

  resumeExperiences = [
    {
      id: 1,
      role: 'Lead ML Engineer',
      company: 'Arcturus AI',
      dates: '2021 – Present',
      location: 'Bangalore, IN',
      desc: '• Led end-to-end deployment of production LLM fine-tuning pipeline for 5M daily active users\n• Reduced inference latency by 40% using Triton Inference Server and TensorRT\n• Mentored a team of 5 ML engineers on RLHF and retrieval-augmented generation'
    },
    {
      id: 2,
      role: 'ML Engineer II',
      company: 'Flipkart',
      dates: '2018 – 2021',
      location: 'Bangalore, IN',
      desc: '• Built deep learning product search ranking models handling 100M+ queries daily\n• Designed automated model evaluation and drift detection pipelines with MLflow'
    }
  ];

  resumeEducations = [
    {
      id: 1,
      degree: 'M.S. Computer Science',
      institution: 'IIT Bombay',
      year: '2018',
      grade: '8.9 / 10'
    },
    {
      id: 2,
      degree: 'B.Tech Information Technology',
      institution: 'NIT Surathkal',
      year: '2016',
      grade: '9.1 / 10'
    }
  ];

  renderExperienceFormInputs();
  renderEducationFormInputs();
  buildResumePreview();
  showToast('Sample resume data loaded ✓');
}

function loadSampleATSData() {
  const jdEl = document.getElementById('ats-jd');
  const resEl = document.getElementById('ats-resume');
  if (jdEl) {
    jdEl.value = `We are seeking a Senior Python Developer with strong experience in Python, Django, PostgreSQL, Docker, AWS, Git, and REST APIs. The ideal candidate will design scalable backend services and write clean, tested code.`;
  }
  if (resEl) {
    resEl.value = `Senior Software Developer with 5 years experience in Python, Django, SQL, PostgreSQL, Docker, Git, REST APIs, and CI/CD pipelines. Proven track record of scaling web platforms and optimizing database queries.`;
  }
  showToast('Sample Job Description & Resume loaded ✓');
}

// ─── Build Live Resume Preview (Renders all 5 Templates) ────────────────────
function buildResumePreview() {
  // Ensure inputs containers are initialised on first render
  const expContainer = document.getElementById('experience-entries-container');
  if (expContainer && !expContainer.children.length && resumeExperiences.length) {
    renderExperienceFormInputs();
  }
  const eduContainer = document.getElementById('education-entries-container');
  if (eduContainer && !eduContainer.children.length && resumeEducations.length) {
    renderEducationFormInputs();
  }

  const skillsEl = document.getElementById('rb-skills');
  const skPrev   = document.getElementById('rb-skills-preview');
  if (skillsEl && skPrev) {
    const skills = skillsEl.value.split(',').map(s => s.trim()).filter(Boolean);
    skPrev.innerHTML = skills.map(s => `<span class="chip chip-green">${esc(s)}</span>`).join('');
  }

  const g = id => (document.getElementById(id)?.value || '').trim();
  const name       = g('rb-name');      const title    = g('rb-title');
  const email      = g('rb-email');     const phone    = g('rb-phone');
  const location   = g('rb-location');  const linkedin = g('rb-linkedin');
  const summary    = g('rb-summary');
  const skills     = g('rb-skills').split(',').map(s => s.trim()).filter(Boolean);

  const card = document.getElementById('resume-preview-card');
  if (!card) return;
  
  if (!name && !title && !summary) {
    card.innerHTML = `<div class="rp-empty"><div class="rp-empty-icon">📄</div><p>Start filling in your details or click <strong>Load Sample Data</strong> to see preview.</p></div>`;
    return;
  }

  const icons = ['✉','📞','📍','🔗'];
  const contacts = [email, phone, location, linkedin].map((v, i) => v ? `<span>${icons[i]} ${esc(v)}</span>` : '').filter(Boolean);

  const expHtml = resumeExperiences.filter(e => e.role || e.company).map(e => `
    <div class="rp-exp-entry">
      <div class="rp-exp-top">
        <span class="rp-exp-role">${esc(e.role)}</span>
        <span class="rp-exp-dates">${esc(e.dates)}</span>
      </div>
      <div class="rp-exp-company">${esc(e.company)}${e.location ? ' · ' + esc(e.location) : ''}</div>
      ${e.desc ? `<ul class="rp-exp-ul">${e.desc.split('\n').filter(l => l.trim()).map(l => `<li>${esc(l.replace(/^[•\-]\s*/, ''))}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('');

  const eduHtml = resumeEducations.filter(e => e.degree || e.institution).map(e => `
    <div class="rp-exp-entry">
      <div class="rp-exp-top">
        <span class="rp-exp-role">${esc(e.degree)}</span>
        <span class="rp-exp-dates">${esc(e.year)}</span>
      </div>
      <div class="rp-exp-company">${esc(e.institution)}${e.grade ? ' · ' + esc(e.grade) : ''}</div>
    </div>
  `).join('');

  const skillsHtml = skills.length ? skills.map(s => `<span class="chip chip-green">${esc(s)}</span>`).join('') : '';

  // Render Template Layouts based on currentTemplate
  if (currentTemplate === 'tech') {
    card.className = 'resume-preview-card tpl-tech';
    card.innerHTML = `
      <div class="rp-header-band">
        <h2 class="rp-name">${esc(name || 'Your Name')}</h2>
        ${title ? `<p class="rp-title">${esc(title)}</p>` : ''}
        <div class="rp-contact">${contacts.join('')}</div>
      </div>
      <div class="rp-body">
        ${summary ? `<div class="rp-section"><div class="rp-section-title">// SUMMARY</div><p class="rp-text">${esc(summary)}</p></div>` : ''}
        ${expHtml ? `<div class="rp-section"><div class="rp-section-title">// WORK EXPERIENCE</div>${expHtml}</div>` : ''}
        ${eduHtml ? `<div class="rp-section"><div class="rp-section-title">// EDUCATION</div>${eduHtml}</div>` : ''}
        ${skillsHtml ? `<div class="rp-section"><div class="rp-section-title">// TECH STACK</div><div class="rp-skills">${skillsHtml}</div></div>` : ''}
      </div>
    `;
  } else if (currentTemplate === 'classic') {
    card.className = 'resume-preview-card tpl-classic';
    card.innerHTML = `
      <div class="rp-header">
        <h2 class="rp-name">${esc(name || 'Your Name')}</h2>
        ${title ? `<p class="rp-title">${esc(title)}</p>` : ''}
        <div class="rp-contact">${contacts.join(' · ')}</div>
      </div>
      ${summary ? `<div class="rp-section"><div class="rp-section-title">Professional Summary</div><p class="rp-text">${esc(summary)}</p></div>` : ''}
      ${expHtml ? `<div class="rp-section"><div class="rp-section-title">Experience</div>${expHtml}</div>` : ''}
      ${eduHtml ? `<div class="rp-section"><div class="rp-section-title">Education</div>${eduHtml}</div>` : ''}
      ${skillsHtml ? `<div class="rp-section"><div class="rp-section-title">Core Competencies</div><div class="rp-skills">${skillsHtml}</div></div>` : ''}
    `;
  } else if (currentTemplate === 'creative') {
    card.className = 'resume-preview-card tpl-creative';
    card.innerHTML = `
      <div class="rp-sidebar">
        <div class="rp-avatar-badge">${getInitials(name || 'YN')}</div>
        <div>
          <h2 class="rp-name" style="font-size:20px;color:var(--tpl-text)">${esc(name || 'Your Name')}</h2>
          ${title ? `<p class="rp-title" style="margin:2px 0 10px">${esc(title)}</p>` : ''}
        </div>
        <div class="rp-contact" style="display:flex;flex-direction:column;gap:8px">${contacts.map(c => `<div>${c}</div>`).join('')}</div>
        ${skillsHtml ? `<div style="margin-top:10px"><div style="font-size:11px;font-weight:800;color:var(--tpl-accent);margin-bottom:8px;text-transform:uppercase">Skills</div><div class="rp-skills">${skillsHtml}</div></div>` : ''}
      </div>
      <div class="rp-main">
        ${summary ? `<div class="rp-section"><div class="rp-section-title">About Me</div><p class="rp-text">${esc(summary)}</p></div>` : ''}
        ${expHtml ? `<div class="rp-section"><div class="rp-section-title">Work History</div>${expHtml}</div>` : ''}
        ${eduHtml ? `<div class="rp-section"><div class="rp-section-title">Education</div>${eduHtml}</div>` : ''}
      </div>
    `;
  } else if (currentTemplate === 'compact') {
    card.className = 'resume-preview-card tpl-compact';
    card.innerHTML = `
      <div class="rp-header">
        <div>
          <h2 class="rp-name">${esc(name || 'Your Name')}</h2>
          ${title ? `<p class="rp-title">${esc(title)}</p>` : ''}
        </div>
        <div class="rp-contact" style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">${contacts.join('')}</div>
      </div>
      ${summary ? `<div class="rp-section"><div class="rp-section-title">Profile</div><p class="rp-text">${esc(summary)}</p></div>` : ''}
      ${expHtml ? `<div class="rp-section"><div class="rp-section-title">Experience</div>${expHtml}</div>` : ''}
      ${eduHtml ? `<div class="rp-section"><div class="rp-section-title">Education</div>${eduHtml}</div>` : ''}
      ${skillsHtml ? `<div class="rp-section"><div class="rp-section-title">Skills</div><div class="rp-skills">${skillsHtml}</div></div>` : ''}
    `;
  } else {
    // Default: Modern Executive
    card.className = 'resume-preview-card tpl-modern';
    card.innerHTML = `
      <div class="rp-header">
        <h2 class="rp-name">${esc(name || 'Your Name')}</h2>
        ${title ? `<p class="rp-title">${esc(title)}</p>` : ''}
        <div class="rp-contact">${contacts.join('')}</div>
      </div>
      ${summary ? `<div class="rp-section"><div class="rp-section-title">Professional Summary</div><p class="rp-text">${esc(summary)}</p></div>` : ''}
      ${expHtml ? `<div class="rp-section"><div class="rp-section-title">Work Experience</div>${expHtml}</div>` : ''}
      ${eduHtml ? `<div class="rp-section"><div class="rp-section-title">Education</div>${eduHtml}</div>` : ''}
      ${skillsHtml ? `<div class="rp-section"><div class="rp-section-title">Key Skills</div><div class="rp-skills">${skillsHtml}</div></div>` : ''}
    `;
  }
}

function downloadResume() {
  const card = document.getElementById('resume-preview-card');
  if (!card) return;
  const name = (document.getElementById('rb-name')?.value || 'Resume').trim();
  const oldTitle = document.title;
  document.title = `${name.replace(/\s+/g, '_')}_Resume`;
  showToast('Opening print dialog — select "Save as PDF" ✓');
  setTimeout(() => {
    window.print();
    document.title = oldTitle;
  }, 300);
}


// ─── ATS Score Checker (Candidate) ───────────────────────────────────────────
function simpleATSCheck() {
  const jd     = (document.getElementById('ats-jd')?.value     || '').trim();
  const resume = (document.getElementById('ats-resume')?.value || '').trim();

  if (!jd)     { showToast('Please paste a job description.'); return; }
  if (!resume) { showToast('Please paste your resume text.'); return; }

  const btn = document.getElementById('ats-run-btn');
  const lbl = document.getElementById('ats-run-label');
  if (btn) btn.disabled = true;
  if (lbl) lbl.innerHTML = '<span class="spinner"></span> Running ML analysis…';

  fetch(`${API_BASE}/api/ats-check`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ jobDescription: jd, resumeText: resume }),
  })
  .then(res => res.json())
  .then(data => {
    if (btn) btn.disabled = false;
    if (lbl) lbl.textContent = 'Check ATS Score';
    if (data.error) throw new Error(data.error);

    const { score, tier, matchedKeywords = [], missingKeywords = [], tips = [] } = data;
    const tierClass = tier === 'Strong Match' ? 'tier-ex' : tier === 'Moderate Match' ? 'tier-gd' : 'tier-rv';
    const ringClass = score < 50 ? 'red-ring' : score < 75 ? 'amber-ring' : '';

    const resultsEl = document.getElementById('ats-results');
    if (!resultsEl) return;
    resultsEl.hidden = false;
    resultsEl.innerHTML = `
      <div class="ats-score-panel">
        <div class="ats-ring-wrap">
          <svg viewBox="0 0 100 100" class="score-ring-svg" aria-hidden="true">
            <circle class="score-ring-track" cx="50" cy="50" r="42"></circle>
            <circle class="score-ring-fill ${ringClass}" id="ats-ring"
              cx="50" cy="50" r="42" style="stroke-dasharray:263.8;stroke-dashoffset:263.8"></circle>
          </svg>
          <div class="score-ring-inner">
            <span class="score-ring-num" style="font-size:28px">${score}%</span>
          </div>
        </div>
        <div class="ats-score-info">
          <div class="ats-score-title">ATS Match Score — ML Model</div>
          <span class="score-tier-badge ${tierClass}">${esc(tier)}</span>
          <div class="ats-meta">${matchedKeywords.length} keyword${matchedKeywords.length !== 1 ? 's' : ''} matched</div>
        </div>
      </div>
      <div class="ats-results-grid">
        <div class="detail-card">
          <h2 class="detail-card-title">✅ Matched Keywords</h2>
          <div class="chip-row">
            ${matchedKeywords.length
              ? matchedKeywords.map(k => `<span class="chip chip-green">${esc(k)}</span>`).join('')
              : '<p style="color:var(--muted);font-size:13px">No matched keywords found.</p>'}
          </div>
        </div>
        <div class="detail-card">
          <h2 class="detail-card-title">❌ Missing Keywords</h2>
          <div class="chip-row">
            ${missingKeywords.length
              ? missingKeywords.map(k => `<span class="chip chip-red">${esc(k)}</span>`).join('')
              : '<p style="color:var(--green);font-size:13px">✓ All key terms matched!</p>'}
          </div>
        </div>
        <div class="detail-card">
          <h2 class="detail-card-title">💡 Improvement Tips</h2>
          <ul style="margin:0;padding-left:18px;display:grid;gap:10px;color:var(--body);font-size:13px;line-height:1.65">
            ${tips.map(t => `<li>${esc(t)}</li>`).join('')}
          </ul>
        </div>
      </div>`;

    requestAnimationFrame(() => {
      const ring = document.getElementById('ats-ring');
      if (ring) ring.style.strokeDashoffset = 263.8 - (score / 100) * 263.8;
    });
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  })
  .catch(err => {
    if (btn) btn.disabled = false;
    if (lbl) lbl.textContent = 'Check ATS Score';
    showToast(`ATS check failed: ${err.message}. Is the backend running?`);
    console.error('ATS check error:', err);
  });
}

// ─── Apply Job — Candidate portal ────────────────────────────────────────────
function openApplyForm(jobId, title, dept, location, description) {
  applyJobId = jobId; applyJobTitle = title; applyJobDept = dept;
  applyJobLocation = location; applyJobDescription = description;

  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('apply-form-role-badge', dept);
  set('apply-form-title',      `Apply — ${title}`);
  set('apply-form-dept-loc',   `${dept} · ${location}`);
  set('apply-jd-text',         description);

  ['af-name','af-email','af-phone','af-cover'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const expEl = document.getElementById('af-exp');
  if (expEl) expEl.value = '';

  applyResumeFile = null;
  const dzText  = document.getElementById('af-dz-text');
  const fileRow = document.getElementById('af-file-row');
  const fileLbl = document.getElementById('af-file-label');
  if (dzText)  dzText.textContent  = 'PDF or DOCX · max 10 MB';
  if (fileRow) fileRow.hidden = true;
  if (fileLbl) fileLbl.textContent = 'No file selected';

  document.querySelectorAll('.job-card').forEach(c => c.classList.remove('job-card-selected'));
  document.getElementById(`job-card-${jobId}`)?.classList.add('job-card-selected');

  const panel = document.getElementById('apply-form-panel');
  if (panel) { panel.hidden = false; panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}

function closeApplyForm() {
  const panel = document.getElementById('apply-form-panel');
  if (panel) panel.hidden = true;
  document.querySelectorAll('.job-card').forEach(c => c.classList.remove('job-card-selected'));
  applyJobId = null; applyResumeFile = null;
}

function handleApplyResume(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  applyResumeFile = file;
  const dzText  = document.getElementById('af-dz-text');
  const fileRow = document.getElementById('af-file-row');
  const fileLbl = document.getElementById('af-file-label');
  if (dzText)  dzText.textContent  = `${file.name} selected ✓`;
  if (fileRow) fileRow.hidden = false;
  if (fileLbl) fileLbl.textContent = file.name;
}

// Submit application to the real backend (/api/apply)
function submitApplication() {
  const name  = document.getElementById('af-name')?.value?.trim()  || '';
  const email = document.getElementById('af-email')?.value?.trim() || '';
  const phone = document.getElementById('af-phone')?.value?.trim() || '';
  const exp   = document.getElementById('af-exp')?.value?.trim()   || '0';
  const cover = document.getElementById('af-cover')?.value?.trim() || '';

  if (!name)            { showToast('Please enter your full name.'); return; }
  if (!email)           { showToast('Please enter your email address.'); return; }
  if (!applyResumeFile) { showToast('Please upload your resume (PDF or DOCX).'); return; }
  if (!applyJobId)      { showToast('No job selected. Click Apply Now on a listing.'); return; }

  const btn   = document.getElementById('af-submit-btn');
  const label = document.getElementById('af-submit-label');
  if (btn && btn.dataset.loading === 'true') return;
  if (btn)   btn.dataset.loading = 'true';
  if (label) label.innerHTML = '<span class="spinner"></span> Submitting…';

  const formData = new FormData();
  formData.append('resume',          applyResumeFile);
  formData.append('name',            name);
  formData.append('email',           email);
  formData.append('phone',           phone);
  formData.append('experience',      exp);
  formData.append('coverLetter',     cover);
  formData.append('jobId',           String(applyJobId));
  formData.append('jobTitle',        applyJobTitle);
  formData.append('dept',            applyJobDept);
  formData.append('location',        applyJobLocation);
  formData.append('jobDescription',  applyJobDescription);

  fetch(`${API_BASE}/api/apply`, { method: 'POST', body: formData })
    .then(res => {
      // Always parse JSON; if non-OK status, still read the error body
      return res.json().then(data => ({ ok: res.ok, status: res.status, data }));
    })
    .then(({ ok, status, data }) => {
      if (btn)   btn.dataset.loading = 'false';
      if (label) label.textContent = 'Submit Application';

      if (!ok || data.error) {
        throw new Error(data.error || `Server error ${status}`);
      }

      const scoreNote = data.aiScreening
        ? ` ML score: ${data.aiScreening.score}/100.`
        : '';
      showToast(`Application for ${applyJobTitle} submitted ✓${scoreNote}`);
      closeApplyForm();

      // Candidates stay on the Apply page and see a success state.
      // HR users are navigated to the Applications inbox.
      if (currentRole === 'hr') {
        navigate('applications');
      } else {
        _showApplySuccess(applyJobTitle, data.aiScreening);
      }
    })
    .catch(err => {
      if (btn)   btn.dataset.loading = 'false';
      if (label) label.textContent = 'Submit Application';
      showToast(`Submission failed: ${err.message}`);
      console.error('Apply error:', err);
    });
}

// ─── Apply success banner (candidate view) ────────────────────────────────────
function _showApplySuccess(jobTitle, aiScreening) {
  const panel = document.getElementById('apply-form-panel');
  if (!panel) return;

  const scoreHtml = aiScreening ? `
    <div style="margin-top:18px;padding:16px 20px;border-radius:16px;background:rgba(14,155,110,0.08);border:1px solid rgba(14,155,110,0.2)">
      <div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em;color:var(--green);margin-bottom:8px">ML Screening Result</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <span style="font-family:var(--font-head);font-size:32px;font-weight:700;color:var(--ink)">${aiScreening.score}<span style="font-size:14px;color:var(--muted)">/100</span></span>
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--ink)">${aiScreening.recommendation === 'shortlist' ? '🟢 Strong candidate' : aiScreening.recommendation === 'review' ? '🟡 Under review' : '🔴 Needs improvement'}</div>
          <div style="font-size:12px;color:var(--muted);margin-top:2px">${esc(aiScreening.summary || '')}</div>
        </div>
      </div>
      ${(aiScreening.matchedSkills || []).length ? `
      <div style="margin-top:12px">
        <div style="font-size:11px;font-weight:900;color:var(--green);margin-bottom:6px">MATCHED SKILLS</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${(aiScreening.matchedSkills || []).map(s => `<span class="chip chip-green">${esc(s)}</span>`).join('')}</div>
      </div>` : ''}
      ${(aiScreening.missingSkills || []).length ? `
      <div style="margin-top:10px">
        <div style="font-size:11px;font-weight:900;color:var(--amber);margin-bottom:6px">SKILLS TO ADD FOR BETTER MATCH</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">${(aiScreening.missingSkills || []).map(s => `<span class="chip chip-amber">${esc(s)}</span>`).join('')}</div>
      </div>` : ''}
    </div>` : '';

  panel.hidden = false;
  panel.innerHTML = `
    <div style="padding:32px;border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,251,255,0.9));border:1px solid rgba(210,220,236,0.92);box-shadow:var(--shadow-md);text-align:center;animation:fadeUp .28s ease both">
      <div style="font-size:48px;margin-bottom:16px">✅</div>
      <h2 style="font-family:var(--font-head);font-size:26px;color:var(--ink);margin:0 0 8px;letter-spacing:-.04em">Application Submitted!</h2>
      <p style="color:var(--muted);font-size:15px;max-width:42ch;margin:0 auto 8px">Your application for <strong>${esc(jobTitle)}</strong> has been received. The hiring team will review it shortly.</p>
      ${scoreHtml}
      <div style="margin-top:24px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" onclick="closeApplyForm();navigate('apply')">Browse More Jobs</button>
        <button class="btn-secondary" onclick="navigate('ats-check')">Check ATS Score</button>
      </div>
    </div>`;
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Applications — HR Inbox ──────────────────────────────────────────────────
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)   return 'just now';
  if (mins < 60)  return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

function appStatusInfo(status) {
  if (status === 'shortlisted') return { label: 'Shortlisted',  cls: 's-short' };
  if (status === 'rejected')    return { label: 'Rejected',      cls: 'app-s-rejected' };
  if (status === 'reviewed')    return { label: 'Under Review',  cls: 's-review' };
  return { label: 'New', cls: 'app-s-new' };
}

function renderApplicationList() {
  const list = document.getElementById('app-list');
  if (!list) return;
  list.innerHTML = '<div class="app-empty"><div class="app-empty-icon">⏳</div><p>Loading applications…</p></div>';

  fetch(`${API_BASE}/api/applications`)
    .then(res => res.json())
    .then(data => {
      if (data.error) throw new Error(data.error);
      APPLICATIONS = data.applications || [];
      if (data.stats) {
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v); };
        set('kpi-total',       data.stats.total);
        set('kpi-new',         data.stats.newCount);
        set('kpi-shortlisted', data.stats.shortlisted);
        set('kpi-rejected',    data.stats.rejected);
      }
      _renderAppRows(APPLICATIONS, list);
    })
    .catch(err => {
      console.warn('Applications API unavailable:', err.message);
      list.innerHTML = `
        <div class="app-empty">
          <div class="app-empty-icon">📭</div>
          <p>No applications yet — or backend is offline.</p>
          <p>Start the backend with <strong>node backend/server.js</strong>, then candidates can submit via Apply Job.</p>
        </div>`;
    });
}

function _renderAppRows(apps, list) {
  if (!apps.length) {
    list.innerHTML = `
      <div class="app-empty">
        <div class="app-empty-icon">📭</div>
        <p>No applications received yet.</p>
        <p>Once candidates submit through <strong>Apply Job</strong>, they'll appear here.</p>
      </div>`;
    return;
  }

  list.innerHTML = '';
  apps.forEach((app, idx) => {
    const { label, cls } = appStatusInfo(app.status);
    const initials  = getInitials(app.name || '?');
    const avatarCls = avatarColors[idx % avatarColors.length];
    const isExpanded = (expandedAppId === app.id);
    const resumeLabel = app.resumeFilename || app.resumeName || 'resume.pdf';
    const ai = app.aiScreening;

    const wrapper = document.createElement('div');
    wrapper.className = 'app-row-wrapper';
    wrapper.setAttribute('role', 'listitem');

    wrapper.innerHTML = `
      <div class="app-row ${isExpanded ? 'app-row-expanded' : ''}" id="app-row-${esc(String(app.id))}">
        <div class="app-candidate-cell">
          <div class="c-avatar ${avatarCls}" style="width:36px;height:36px;border-radius:12px;font-size:11px;flex-shrink:0">${esc(initials)}</div>
          <div><span class="c-name">${esc(app.name)}</span><span class="c-location">${esc(app.email)}</span></div>
        </div>
        <div class="app-role-cell">
          <span class="app-role-title">${esc(app.jobTitle)}</span>
          <span class="app-role-dept">${esc(app.dept || '')} · ${esc(app.location || '')}</span>
        </div>
        <div class="app-time-cell">${timeAgo(app.submittedAt)}</div>
        <div class="app-resume-cell">
          <span class="chip chip-blue app-resume-chip" title="${esc(resumeLabel)}">📄 ${esc(resumeLabel.length > 18 ? resumeLabel.slice(0,18)+'…' : resumeLabel)}</span>
        </div>
        <div class="app-status-cell">
          ${ai ? `<span class="score-big-num ${scoreClass(ai.score)}" style="font-size:18px">${ai.score}</span><span class="score-small">/100</span>` : ''}
          <span class="status-badge ${cls}" style="margin-left:${ai?'6px':'0'}">${label}</span>
        </div>
        <div class="app-actions-cell">
          <button class="app-action-btn btn-review" onclick="toggleAppDetail('${app.id}')">${isExpanded ? 'Close' : 'Review'}</button>
          ${app.status !== 'shortlisted' && app.status !== 'rejected' ? `<button class="app-action-btn btn-shortlist" onclick="updateApplicationStatus('${app.id}','shortlisted')">Shortlist</button>` : ''}
          ${app.status !== 'rejected' ? `<button class="app-action-btn btn-reject" onclick="updateApplicationStatus('${app.id}','rejected')">Reject</button>` : ''}
        </div>
      </div>

      ${isExpanded ? `
      <div class="app-detail-panel" id="app-detail-${esc(String(app.id))}">
        <div class="app-detail-grid">
          <div class="app-detail-left">
            <div class="app-detail-section">
              <div class="app-detail-section-title">Candidate Information</div>
              <div class="app-detail-field"><span class="app-detail-key">Full Name</span><span class="app-detail-val">${esc(app.name)}</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Email</span><span class="app-detail-val">${esc(app.email)}</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Phone</span><span class="app-detail-val">${esc(app.phone || '—')}</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Experience</span><span class="app-detail-val">${esc(String(app.experience || '0'))} years</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Resume</span><span class="app-detail-val"><span class="chip chip-blue">📄 ${esc(resumeLabel)}</span></span></div>
              ${ai ? `
              <div class="app-detail-field"><span class="app-detail-key">ML Score</span><span class="app-detail-val"><strong style="color:var(--blue)">${ai.score}/100</strong> — ${esc(ai.recommendation || '')}</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Matched Skills</span><span class="app-detail-val">${(ai.matchedSkills||[]).map(s=>`<span class="chip chip-green">${esc(s)}</span>`).join('') || '—'}</span></div>
              <div class="app-detail-field"><span class="app-detail-key">Missing Skills</span><span class="app-detail-val">${(ai.missingSkills||[]).map(s=>`<span class="chip chip-red">${esc(s)}</span>`).join('') || '—'}</span></div>
              ` : ''}
            </div>
            <div class="app-detail-section">
              <div class="app-detail-section-title">Cover Letter</div>
              <div class="app-cover-text">${esc(app.coverLetter || '—')}</div>
            </div>
          </div>
          <div class="app-detail-right">
            ${ai ? `
            <div class="app-detail-section">
              <div class="app-detail-section-title">ML Screening Assessment</div>
              <div class="app-cover-text">${esc(ai.summary || '')}</div>
              ${(ai.keyStrengths||[]).length ? `<div style="margin-top:12px"><div style="font-size:11px;font-weight:800;color:var(--green);margin-bottom:6px">KEY STRENGTHS</div>${ai.keyStrengths.map(s=>`<div style="font-size:13px;color:var(--body);padding:3px 0">✓ ${esc(s)}</div>`).join('')}</div>` : ''}
              ${(ai.concerns||[]).length ? `<div style="margin-top:12px"><div style="font-size:11px;font-weight:800;color:var(--red);margin-bottom:6px">CONCERNS</div>${ai.concerns.map(s=>`<div style="font-size:13px;color:var(--body);padding:3px 0">⚠ ${esc(s)}</div>`).join('')}</div>` : ''}
            </div>` : ''}
            <div class="app-detail-section">
              <div class="app-detail-section-title">Job Description — ${esc(app.jobTitle)}</div>
              <div class="app-cover-text app-jd-text">${esc(app.jobDescription || '—')}</div>
            </div>
            <div class="app-detail-actions">
              ${app.status !== 'shortlisted' ? `<button class="btn-primary" onclick="updateApplicationStatus('${app.id}','shortlisted')">Shortlist Candidate</button>` : '<span class="chip chip-green" style="font-size:13px;padding:10px 14px">✓ Shortlisted</span>'}
              ${app.status !== 'rejected' ? `<button class="btn-secondary" onclick="updateApplicationStatus('${app.id}','rejected')">Reject</button>` : ''}
              <button class="btn-secondary" onclick="showToast('Interview invite sent ✓')">Send Interview Invite</button>
            </div>
          </div>
        </div>
      </div>` : ''}
    `;
    list.appendChild(wrapper);
  });
}

function toggleAppDetail(appId) {
  expandedAppId = (expandedAppId === appId) ? null : appId;
  if (expandedAppId === appId) {
    const app = APPLICATIONS.find(a => String(a.id) === String(appId));
    if (app && app.status === 'new') {
      updateApplicationStatus(appId, 'reviewed', true);
      return;
    }
  }
  renderApplicationList();
}

function updateApplicationStatus(appId, status, silent = false) {
  fetch(`${API_BASE}/api/applications/${appId}/status`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ status }),
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.error);
    if (!silent) {
      const msg = status === 'shortlisted' ? 'Shortlisted ✓'
                : status === 'rejected'    ? 'Application rejected'
                : 'Status updated';
      showToast(msg);
    }
    renderApplicationList();
  })
  .catch(err => {
    console.warn('Status update failed:', err.message);
    if (!silent) showToast('Status update failed — backend offline?');
    renderApplicationList();
  });
}

// ─── Theme Switcher ───────────────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('sieve_theme') || 'light';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️ Mode' : '🌙 Mode';
  localStorage.setItem('sieve_theme', theme);
}

function toggleTheme() {
  const curr = document.documentElement.getAttribute('data-theme') || 'light';
  const next = curr === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast(`Switched to ${next} mode`);
}

// ─── Side-by-Side Candidate Comparison Modal ──────────────────────────────────
function openCompareModal() {
  const modal = document.getElementById('compare-modal');
  const sel1  = document.getElementById('compare-c1');
  const sel2  = document.getElementById('compare-c2');
  if (!modal || !sel1 || !sel2) return;

  const optionsHtml = CANDIDATES.map((c, i) =>
    `<option value="${c.id}" ${i === 0 ? 'selected' : ''}>${esc(c.name)} (${c.score}/100)</option>`
  ).join('');

  const optionsHtml2 = CANDIDATES.map((c, i) =>
    `<option value="${c.id}" ${i === 1 || (i === 0 && CANDIDATES.length === 1) ? 'selected' : ''}>${esc(c.name)} (${c.score}/100)</option>`
  ).join('');

  sel1.innerHTML = optionsHtml;
  sel2.innerHTML = optionsHtml2;

  modal.hidden = false;
  updateComparison();
}

function closeCompareModal() {
  const modal = document.getElementById('compare-modal');
  if (modal) modal.hidden = true;
}

function updateComparison() {
  const id1 = document.getElementById('compare-c1')?.value;
  const id2 = document.getElementById('compare-c2')?.value;
  const matrix = document.getElementById('compare-matrix');
  if (!matrix) return;

  const c1 = CANDIDATES.find(c => String(c.id) === String(id1));
  const c2 = CANDIDATES.find(c => String(c.id) === String(id2));

  if (!c1 || !c2) {
    matrix.innerHTML = '<p style="color:var(--muted);text-align:center">Select candidates to compare.</p>';
    return;
  }

  const renderCol = c => `
    <div class="compare-col">
      <div class="compare-col-head">
        <div class="c-avatar ${c.avatarCls || 'av-0'}" style="width:42px;height:42px;border-radius:14px;font-weight:800;font-size:14px">${esc(c.initials || getInitials(c.name))}</div>
        <div>
          <h3 style="margin:0;font-size:16px;color:var(--ink);font-family:var(--font-head)">${esc(c.name)}</h3>
          <span style="font-size:12px;color:var(--muted)">${esc(c.role || 'Candidate')}</span>
        </div>
      </div>
      <div class="compare-metric">
        <span class="compare-label">Match Score</span>
        <div style="display:flex;align-items:baseline;gap:6px">
          <strong class="score-big-num ${scoreClass(c.score)}" style="font-size:32px">${c.score}</strong>
          <span style="color:var(--muted);font-size:13px">/100</span>
        </div>
      </div>
      <div class="compare-metric">
        <span class="compare-label">Experience & Education</span>
        <div style="font-size:13px;color:var(--ink);font-weight:700">${esc(c.experience)}</div>
        <div style="font-size:12px;color:var(--muted)">${esc(c.education)}</div>
      </div>
      <div class="compare-metric">
        <span class="compare-label">Matched Skills (${(c.matchedSkills||[]).length})</span>
        <div class="chip-row">${(c.matchedSkills||[]).map(s => `<span class="chip chip-green">${esc(s)}</span>`).join('')}</div>
      </div>
      <div class="compare-metric">
        <span class="compare-label">Skill Gaps (${(c.missingSkills||[]).length})</span>
        <div class="chip-row">${(c.missingSkills||[]).map(s => `<span class="chip chip-red">${esc(s)}</span>`).join('')}</div>
      </div>
    </div>`;

  matrix.innerHTML = renderCol(c1) + renderCol(c2);
}

// ─── Post New Job Modal (HR) ──────────────────────────────────────────────────
function openPostJobModal() {
  const modal = document.getElementById('post-job-modal');
  if (modal) modal.hidden = false;
}

function closePostJobModal() {
  const modal = document.getElementById('post-job-modal');
  if (modal) modal.hidden = true;
}

function submitNewJob() {
  const title  = (document.getElementById('pj-title')?.value || '').trim();
  const dept   = (document.getElementById('pj-dept')?.value  || '').trim();
  const loc    = (document.getElementById('pj-location')?.value || '').trim();
  const sal    = (document.getElementById('pj-salary')?.value   || '').trim();
  const skills = (document.getElementById('pj-skills')?.value   || '').trim();
  const desc   = (document.getElementById('pj-desc')?.value     || '').trim();

  if (!title) { showToast('Please enter a job title.'); return; }

  const payload = {
    title,
    department:  dept   || 'Engineering',
    location:    loc    || 'Remote',
    salary:      sal    || 'Competitive',
    skills:      skills.split(',').map(s => s.trim()).filter(Boolean),
    description: desc   || `${title} position.`,
    mustSkills:  skills,
  };

  fetch(`${API_BASE}/api/jobs`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload),
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) throw new Error(data.error);
    showToast(`Job "${title}" published successfully ✓`);
    closePostJobModal();
    navigate('apply');
  })
  .catch(err => {
    showToast(`Failed to post job: ${err.message}`);
  });
}

// ─── AI Interview Question Generator ──────────────────────────────────────────
function renderAIInterviewQuestions(c) {
  const listEl = document.getElementById('ai-questions-list');
  if (!listEl || !c) return;

  const matched = c.matchedSkills || [];
  const missing = c.missingSkills || [];
  const role    = c.role || 'Software Engineer';

  const q1 = matched[0]
    ? `Can you walk us through a recent production project where you used ${matched[0]}?`
    : `What has been your most complex technical architecture to date?`;

  const q2 = matched[1]
    ? `How do you approach performance tuning and debugging when working with ${matched[1]}?`
    : `How do you measure success and system reliability in production?`;

  const q3 = missing[0]
    ? `Our team uses ${missing[0]} extensively. How quickly could you ramp up, and what similar tools have you used?`
    : `How do you stay up to date with new AI/ML frameworks and software engineering paradigms?`;

  const q4 = `Given your ${c.experience || 'software'} experience, how do you handle cross-functional code reviews and technical trade-offs?`;

  const q5 = `Scenario: A critical production service for ${role} experiences unexpected latency. How would you diagnose the root cause?`;

  const questions = [q1, q2, q3, q4, q5];
  listEl.innerHTML = questions.map((q, idx) => `
    <div class="ai-question-item">
      <span class="ai-question-num">Q${idx + 1}.</span> ${esc(q)}
    </div>`).join('');
}

function copyInterviewQuestions() {
  const items = document.querySelectorAll('.ai-question-item');
  if (!items.length) return;
  const text = Array.from(items).map(i => i.textContent.trim()).join('\n\n');
  navigator.clipboard?.writeText(text);
  showToast('Interview questions copied to clipboard ✓');
}

// ─── Candidate My Applications ────────────────────────────────────────────────
function renderMyApplications() {
  const grid = document.getElementById('my-apps-grid');
  if (!grid) return;

  grid.innerHTML = '<div class="app-empty"><div class="app-empty-icon">⏳</div><p>Loading your applications…</p></div>';

  fetch(`${API_BASE}/api/applications`)
    .then(res => res.json())
    .then(data => {
      const apps = data.applications || [];
      const userEmail = (currentUser?.email || '').toLowerCase();
      const myApps = apps.filter(a => (a.email || '').toLowerCase() === userEmail);
      const displayApps = myApps.length ? myApps : apps.slice(0, 4);

      if (!displayApps.length) {
        grid.innerHTML = `
          <div class="app-empty" style="grid-column:1/-1">
            <div class="app-empty-icon">✉</div>
            <p>You haven't submitted any job applications yet.</p>
            <button class="btn-primary" style="margin-top:12px" onclick="navigate('apply')">Browse Open Jobs</button>
          </div>`;
        return;
      }

      grid.innerHTML = displayApps.map(a => {
        const { label, cls } = appStatusInfo(a.status);
        const ai = a.aiScreening;
        return `
          <div class="my-app-card">
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                <span class="job-card-badge badge-blue">${esc(a.dept || 'Engineering')}</span>
                <span class="status-badge ${cls}">${label}</span>
              </div>
              <h3 style="font-family:var(--font-head);font-size:18px;margin:0 0 6px;color:var(--ink)">${esc(a.jobTitle)}</h3>
              <p style="margin:0 0 12px;font-size:12px;color:var(--muted)">📍 ${esc(a.location || 'Remote')} · Submitted ${timeAgo(a.submittedAt)}</p>
              ${ai ? `
              <div style="padding:12px;border-radius:14px;background:var(--bg);border:1px solid var(--line);margin-top:10px">
                <div style="font-size:11px;font-weight:800;color:var(--blue);margin-bottom:4px">ML ATS MATCH SCORE</div>
                <div style="display:flex;align-items:baseline;gap:6px">
                  <strong class="score-big-num ${scoreClass(ai.score)}" style="font-size:24px">${ai.score}</strong>
                  <span style="font-size:12px;color:var(--muted)">/100 (${esc(ai.recommendation || 'processed')})</span>
                </div>
              </div>` : ''}
            </div>
            <button class="btn-secondary btn-block" onclick="navigate('apply')">View Role Details</button>
          </div>`;
      }).join('');
    })
    .catch(err => {
      grid.innerHTML = '<div class="app-empty"><p>Could not load applications.</p></div>';
    });
}
