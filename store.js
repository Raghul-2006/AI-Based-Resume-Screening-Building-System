// ─── JSON File Store — lightweight persistence layer ──────────────────────────
// Stores applications as a JSON array in data/applications.json
// No database setup required.

const fs   = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'applications.json');

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return [];
  }
}

function writeAll(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Return all applications (newest first) */
function getAll() {
  return readAll().sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
}

/** Return a single application by ID */
function getById(id) {
  return readAll().find(a => a.id === id) || null;
}

/** Add a new application; returns the saved record */
function add(application) {
  const apps = readAll();
  const record = {
    id:          `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    submittedAt: new Date().toISOString(),
    status:      'new',
    ...application,
  };
  apps.push(record);
  writeAll(apps);
  return record;
}

/** Update the status field of an existing application */
function updateStatus(id, status) {
  const apps = readAll();
  const idx  = apps.findIndex(a => a.id === id);
  if (idx === -1) return null;
  apps[idx].status    = status;
  apps[idx].updatedAt = new Date().toISOString();
  writeAll(apps);
  return apps[idx];
}

/** Delete all applications (for testing) */
function clearAll() {
  writeAll([]);
}

/** Get summary statistics */
function getStats() {
  const apps = readAll();
  return {
    total:      apps.length,
    newCount:   apps.filter(a => a.status === 'new').length,
    shortlisted: apps.filter(a => a.status === 'shortlisted').length,
    rejected:   apps.filter(a => a.status === 'rejected').length,
    reviewed:   apps.filter(a => a.status === 'reviewed').length,
  };
}

module.exports = { getAll, getById, add, updateStatus, clearAll, getStats };
