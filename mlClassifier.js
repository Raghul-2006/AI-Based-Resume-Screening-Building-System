// ─── Machine Learning Classifier — Logistic Regression ────────────────────────
// Parses the dataset, trains a Logistic Regression classifier using Gradient Descent,
// and saves model weights to model_weights.json.

const fs   = require('fs');
const path = require('path');

const CSV_FILE     = path.join(__dirname, '..', 'data', 'ai_resume_screening.csv');
const WEIGHTS_FILE = path.join(__dirname, '..', 'data', 'model_weights.json');

let model = null; // { weights: [], bias: 0, means: [], stds: [] }

// Helper: Sigmoid function
function sigmoid(z) {
  return 1 / (1 + Math.exp(-Math.max(-20, Math.min(20, z))));
}

// ─────────────────────────────────────────────────────────────────────────────
// Load & Train Model
// ─────────────────────────────────────────────────────────────────────────────
function initModel() {
  // If model is already loaded, skip
  if (model) return;

  // Try to load pre-trained weights
  if (fs.existsSync(WEIGHTS_FILE)) {
    try {
      model = JSON.parse(fs.readFileSync(WEIGHTS_FILE, 'utf8'));
      console.log('✅  Pre-trained Logistic Regression weights loaded successfully.');
      return;
    } catch (e) {
      console.error('Failed to load weights, retraining...', e);
    }
  }

  // Otherwise, train the model
  trainModel();
}

function trainModel() {
  console.log('⏳  Training Logistic Regression model on ai_resume_screening.csv...');

  if (!fs.existsSync(CSV_FILE)) {
    console.error(`⚠️   Dataset CSV not found at ${CSV_FILE}. Cannot train model.`);
    return;
  }

  const raw = fs.readFileSync(CSV_FILE, 'utf8');
  const lines = raw.split(/\r?\n/).filter(line => line.trim());
  const headers = lines[0].split(',');

  // Parse lines
  const data = [];
  const labels = [];
  const educationMap = { 'high school': 0, 'bachelors': 1, 'masters': 2, 'phd': 3 };

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 7) continue;

    const yearsExp = parseFloat(cols[0]) || 0;
    const skillsMatch = parseFloat(cols[1]) || 0;
    const eduStr = (cols[2] || '').toLowerCase().trim();
    const eduVal = educationMap[eduStr] !== undefined ? educationMap[eduStr] : 1;
    const projectCount = parseFloat(cols[3]) || 0;
    const resumeLength = parseFloat(cols[4]) || 0;
    const githubActivity = parseFloat(cols[5]) || 0;
    const shortlisted = (cols[6] || '').toLowerCase().trim() === 'yes' ? 1 : 0;

    data.push([yearsExp, skillsMatch, eduVal, projectCount, resumeLength, githubActivity]);
    labels.push(shortlisted);
  }

  const nSamples = data.length;
  if (nSamples === 0) {
    console.error('⚠️   No training samples found in CSV.');
    return;
  }

  const nFeatures = data[0].length;

  // 1. Z-Score Feature Scaling (Mean and Standard Deviation)
  const means = Array(nFeatures).fill(0);
  const stds  = Array(nFeatures).fill(0);

  for (let j = 0; j < nFeatures; j++) {
    let sum = 0;
    for (let i = 0; i < nSamples; i++) sum += data[i][j];
    means[j] = sum / nSamples;

    let varianceSum = 0;
    for (let i = 0; i < nSamples; i++) varianceSum += Math.pow(data[i][j] - means[j], 2);
    const rawStd = Math.sqrt(varianceSum / nSamples);
    stds[j] = Math.max(rawStd, 1e-8); // Prevent division by zero; epsilon = 1e-8
  }

  // Scale training data
  const scaledData = data.map(row => row.map((val, j) => {
    const scaled = (val - means[j]) / stds[j];
    return isFinite(scaled) ? scaled : 0; // Fallback if NaN despite epsilon
  }));

  // 2. Logistic Regression training via Gradient Descent
  const weights = Array(nFeatures).fill(0);
  let bias = 0;
  const lr = 0.1; // Learning rate
  const epochs = 1000;

  for (let epoch = 0; epoch < epochs; epoch++) {
    let dw = Array(nFeatures).fill(0);
    let db = 0;

    for (let i = 0; i < nSamples; i++) {
      const x = scaledData[i];
      const y = labels[i];

      // Linear prediction: z = w.x + b
      let z = bias;
      for (let j = 0; j < nFeatures; j++) z += weights[j] * x[j];

      const pred = sigmoid(z);
      const diff = pred - y;

      db += diff;
      for (let j = 0; j < nFeatures; j++) dw[j] += diff * x[j];
    }

    // Update weights and bias
    bias -= (lr / nSamples) * db;
    for (let j = 0; j < nFeatures; j++) weights[j] -= (lr / nSamples) * dw[j];
  }

  // Save trained parameters
  model = { weights, bias, means, stds };
  try {
    fs.writeFileSync(WEIGHTS_FILE, JSON.stringify(model, null, 2), 'utf8');
    console.log(`✅  Logistic Regression model trained on ${nSamples} rows. Weights saved.`);
  } catch (err) {
    console.error('Failed to save weights:', err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Predict / Classify
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Predict probability of shortlisting.
 * @param {object} features - { yearsExperience, skillsMatchScore, educationLevel, projectCount, resumeLength, githubActivity }
 * @returns {number}        - Probability percentage (0-100)
 */
function predict(features) {
  initModel();
  if (!model) return 50; // Fallback if model is not trained

  const educationMap = { 'high school': 0, 'bachelors': 1, 'masters': 2, 'phd': 3 };
  const eduStr = (features.educationLevel || 'bachelors').toLowerCase().trim();
  const eduVal = educationMap[eduStr] !== undefined ? educationMap[eduStr] : 1;

  // Use actual feature values — never substitute hardcoded defaults that
  // override what was extracted from the real resume.
  const rawFeatures = [
    typeof features.yearsExperience  === 'number' ? features.yearsExperience  : 1,
    typeof features.skillsMatchScore === 'number' ? features.skillsMatchScore : 50,
    eduVal,
    typeof features.projectCount     === 'number' ? features.projectCount     : 2,
    typeof features.resumeLength     === 'number' ? features.resumeLength     : 300,
    typeof features.githubActivity   === 'number' ? features.githubActivity   : 0,
  ];

  // Z-score scale using training distribution
  const scaled = rawFeatures.map((val, j) => {
    const epsilon = 1e-8;
    const safeStd = Math.max(model.stds[j], epsilon);
    const scaled = (val - model.means[j]) / safeStd;
    return isFinite(scaled) ? scaled : 0;
  });

  // Logistic regression: z = w·x + b
  let z = model.bias;
  for (let j = 0; j < scaled.length; j++) {
    const zComponent = model.weights[j] * scaled[j];
    z += isFinite(zComponent) ? zComponent : 0;
  }

  const prob = sigmoid(z);
  const score = Math.round(prob * 100);
  return isFinite(score) ? Math.max(0, Math.min(100, score)) : 50;
}

module.exports = { initModel, trainModel, predict };
