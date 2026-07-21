// ─── QA Comprehensive API Test Suite ─────────────────────────────────────────
const API_BASE = 'http://localhost:3001';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE QA AUTOMATED TEST SUITE 🧪');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  // TEST 1: GET /api/jobs
  try {
    const res = await fetch(`${API_BASE}/api/jobs`);
    const data = await res.json();
    assert(res.status === 200 && Array.isArray(data.jobs) && data.jobs.length >= 3, 'GET /api/jobs returns job listings array');
  } catch (err) {
    assert(false, `GET /api/jobs threw error: ${err.message}`);
  }

  // TEST 2: POST /api/jobs (Validation & Job Creation)
  try {
    const badRes = await fetch(`${API_BASE}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '' })
    });
    assert(badRes.status === 400, 'POST /api/jobs returns 400 for empty title');

    const goodRes = await fetch(`${API_BASE}/api/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'QA Lead Automation Engineer',
        department: 'Quality Engineering',
        location: 'Bangalore, IN',
        salary: '₹30L – ₹45L / yr',
        skills: ['Selenium', 'Cypress', 'Node.js', 'Jest'],
        description: 'Lead automated QA testing and CI/CD pipelines.'
      })
    });
    const goodData = await goodRes.json();
    assert(goodRes.status === 201 && goodData.success && goodData.job.id > 0, 'POST /api/jobs creates new job listing (201 Created)');
  } catch (err) {
    assert(false, `POST /api/jobs threw error: ${err.message}`);
  }

  // TEST 3: POST /api/ats-check
  try {
    const atsRes = await fetch(`${API_BASE}/api/ats-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobDescription: 'Seeking Senior Python Developer with Django, SQL, PostgreSQL, Docker, AWS, and Git experience.',
        resumeText: 'Senior Software Developer with 5 years experience in Python, Django, SQL, PostgreSQL, Docker, Git, and REST APIs.'
      })
    });
    const atsData = await atsRes.json();
    assert(atsRes.status === 200 && atsData.score >= 50 && Array.isArray(atsData.matchedKeywords), 'POST /api/ats-check returns valid ATS match score & keywords');
  } catch (err) {
    assert(false, `POST /api/ats-check threw error: ${err.message}`);
  }

  // TEST 4: GET /api/applications
  try {
    const appRes = await fetch(`${API_BASE}/api/applications`);
    const appData = await appRes.json();
    assert(appRes.status === 200 && Array.isArray(appData.applications), 'GET /api/applications returns applications array');

    if (appData.applications.length > 0) {
      const firstAppId = appData.applications[0].id;
      const patchRes = await fetch(`${API_BASE}/api/applications/${firstAppId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'shortlisted' })
      });
      const patchData = await patchRes.json();
      assert(patchRes.status === 200 && patchData.status === 'shortlisted', 'PATCH /api/applications/:id/status updates application status');
    }
  } catch (err) {
    assert(false, `Applications API threw error: ${err.message}`);
  }

  // TEST 5: POST /api/screen (Single & Bulk Resume Upload)
  try {
    const formData = new FormData();
    formData.append('jobTitle', 'QA Lead Automation Engineer');
    formData.append('jobDescription', 'Senior QA Automation Lead experienced in Selenium, Cypress, Node.js, Jest, and API testing.');
    formData.append('mustSkills', 'Selenium, Cypress, Node.js, Jest, Python, API testing');

    const sampleResume = `
Alex Mercer
alex.mercer@example.com | +91 98765 43210
Senior QA Automation Lead
Summary: 7 years experience designing automated testing frameworks in Node.js, Selenium, Cypress, Jest, and REST API testing.
Technical Skills: Selenium, Cypress, Node.js, Jest, Python, SQL, Git, Jenkins, Postman, Docker.
Experience:
Senior QA Lead — TechCorp (2021 - Present)
• Built automated CI/CD regression test suite reducing release testing time by 65%.
• Led team of 5 QA automation engineers writing end-to-end Cypress & Jest tests.
Education: Bachelor of Technology in Computer Science
    `;

    const fileBlob = new Blob([sampleResume], { type: 'text/plain' });
    formData.append('resumes', fileBlob, 'alex_mercer_qa_resume.txt');

    const screenRes = await fetch(`${API_BASE}/api/screen`, {
      method: 'POST',
      body: formData,
    });
    const screenData = await screenRes.json();
    assert(screenRes.status === 200 && Array.isArray(screenData.candidates) && screenData.candidates.length === 1, 'POST /api/screen processes resume upload successfully');
    const cand = screenData.candidates[0];
    assert(cand.score >= 60 && cand.name === 'Alex Mercer' && cand.experienceYears === 7, 'ML Screener extracts accurate candidate name (Alex Mercer), experience (7 yrs), and score');
  } catch (err) {
    assert(false, `POST /api/screen threw error: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(`📊 TEST SUITE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runTests();
