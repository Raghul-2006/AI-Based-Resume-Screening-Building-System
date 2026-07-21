// ─── Sieve Backend — Main Server ─────────────────────────────────────────────
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Ensure required directories exist ────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR    = path.join(__dirname, 'data');
[UPLOADS_DIR, DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Train / initialise ML model on startup ───────────────────────────────────
const { initModel } = require('./services/mlClassifier');
initModel();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/jobs',         require('./routes/jobs'));
app.use('/api/screen',       require('./routes/screen'));
app.use('/api/apply',        require('./routes/apply'));
app.use('/api/applications', require('./routes/applications'));

// ── ATS Check — ML-powered (no external API) ─────────────────────────────────
app.post('/api/ats-check', async (req, res) => {
  try {
    const { jobDescription, resumeText } = req.body;
    if (!jobDescription || !resumeText) {
      return res.status(400).json({ error: 'jobDescription and resumeText are required.' });
    }
    const { atsCheck } = require('./services/mlScreener');
    const result = await atsCheck(resumeText, jobDescription);
    res.json(result);
  } catch (err) {
    console.error('ATS check error:', err.message);
    res.status(500).json({ error: err.message || 'ATS analysis failed.' });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status:    'ok',
    engine:    'Local Logistic Regression ML model',
    timestamp: new Date().toISOString(),
  });
});

// ── SPA fallback — serve index.html for all non-API GET requests ─────────────
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  Sieve backend running at  http://localhost:${PORT}`);
  console.log(`🌐  Open your app at          http://localhost:${PORT}`);
  console.log('🤖  Local ML screening model ready — no API keys needed.\n');
});
