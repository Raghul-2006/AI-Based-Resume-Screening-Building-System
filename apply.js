// ─── Route: POST /api/apply ───────────────────────────────────────────────────
// Candidate job application endpoint.
// Accepts a resume file + form fields, runs ML screening, saves to store.

const express = require('express');
const multer  = require('multer');
const router  = express.Router();

const { extractText }  = require('../services/textExtractor');
const { screenResume } = require('../services/mlScreener');
const store            = require('../services/store');

// ── Multer: single resume file kept in memory ─────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF or DOCX files are accepted.'));
    }
  },
});

/**
 * POST /api/apply
 * Body (multipart/form-data):
 *   resume         — single PDF/DOCX file  (required)
 *   name           — candidate full name   (required)
 *   email          — candidate email       (required)
 *   phone          — candidate phone       (optional)
 *   experience     — years of experience   (optional)
 *   coverLetter    — motivation text       (optional)
 *   jobId          — job listing ID
 *   jobTitle       — job title
 *   dept           — department
 *   location       — job location
 *   jobDescription — full job description (used for ML screening)
 *
 * Response: { success, applicationId, aiScreening, message }
 */
// Wrap multer to convert its errors into clean JSON responses
function uploadSingle(req, res, next) {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'File upload failed.' });
    }
    next();
  });
}

router.post('/', uploadSingle, async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Resume file is required.' });
    }

    const {
      name           = '',
      email          = '',
      phone          = '',
      experience     = '0',
      coverLetter    = '',
      jobId          = '',
      jobTitle       = 'Open Position',
      dept           = '',
      location       = '',
      jobDescription = '',
    } = req.body;

    if (!name.trim())  return res.status(400).json({ error: 'Candidate name is required.' });
    if (!email.trim()) return res.status(400).json({ error: 'Email address is required.' });

    // ── Step 1: extract text from resume ─────────────────────────────────────
    let resumeText;
    try {
      resumeText = await extractText(file.buffer, file.mimetype);
    } catch (extractErr) {
      return res.status(422).json({ error: `Could not read resume: ${extractErr.message}` });
    }

    // ── Step 2: ML screening (always runs — no API key needed) ───────────────
    let aiScreening = null;
    if (jobDescription.trim()) {
      try {
        aiScreening = await screenResume(resumeText, jobDescription, jobTitle, '');
      } catch (mlErr) {
        console.warn('ML screening skipped:', mlErr.message);
      }
    }

    // ── Step 3: persist application to JSON store ─────────────────────────────
    const application = store.add({
      name:           name.trim(),
      email:          email.trim(),
      phone:          phone.trim(),
      experience:     experience.trim(),
      coverLetter:    coverLetter.trim(),
      jobId,
      jobTitle,
      dept,
      location,
      jobDescription: jobDescription.trim(),
      resumeFilename: file.originalname,
      resumeMime:     file.mimetype,
      resumeSize:     file.size,
      resumeText:     resumeText.slice(0, 3000),  // store excerpt only
      aiScreening,
    });

    const scoreMsg = aiScreening
      ? `ML model score: ${aiScreening.score}/100`
      : 'No job description provided — screening skipped.';

    res.json({
      success:       true,
      applicationId: application.id,
      aiScreening,
      message:       `Application submitted successfully. ${scoreMsg}`,
    });

  } catch (err) {
    console.error('Apply route error:', err);
    res.status(500).json({ error: err.message || 'Application submission failed.' });
  }
});

module.exports = router;
