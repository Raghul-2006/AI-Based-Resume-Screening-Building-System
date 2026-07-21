// ─── Route: /api/applications ─────────────────────────────────────────────────
// HR inbox — list, view, and update application status.

const express = require('express');
const router  = express.Router();
const store   = require('../services/store');

/**
 * GET /api/applications
 * Query params:
 *   - status : filter by status (new|reviewed|shortlisted|rejected)
 *   - jobId  : filter by job ID
 * Response: { applications: [...], stats: {...} }
 */
router.get('/', (req, res) => {
  try {
    let apps  = store.getAll();
    const stats = store.getStats();

    // Optional filters
    if (req.query.status) {
      apps = apps.filter(a => a.status === req.query.status);
    }
    if (req.query.jobId) {
      apps = apps.filter(a => String(a.jobId) === String(req.query.jobId));
    }

    res.json({ applications: apps, stats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/applications/stats
 * Response: { total, newCount, shortlisted, rejected, reviewed }
 */
router.get('/stats', (req, res) => {
  try {
    res.json(store.getStats());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/applications/:id
 * Response: full application object
 */
router.get('/:id', (req, res) => {
  try {
    const app = store.getById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Application not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PATCH /api/applications/:id/status
 * Body: { status: "shortlisted" | "rejected" | "reviewed" | "new" }
 * Response: updated application object
 */
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const VALID = ['new', 'reviewed', 'shortlisted', 'rejected'];
    if (!VALID.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID.join(', ')}` });
    }
    const updated = store.updateStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /api/applications (dev only — clear all)
 */
router.delete('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Not allowed in production' });
  }
  store.clearAll();
  res.json({ message: 'All applications cleared' });
});

module.exports = router;
