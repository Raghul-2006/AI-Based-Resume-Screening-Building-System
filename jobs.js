// ─── Route: GET /api/jobs ─────────────────────────────────────────────────────
// Returns the list of open positions shown on the Apply Job candidate page.

const express = require('express');
const router  = express.Router();

const JOB_LISTINGS = [
  {
    id: 1,
    title: 'Senior ML Engineer',
    department: 'Machine Learning',
    location: 'Bangalore, IN',
    type: 'Full-time',
    salary: '₹28L – ₹46L / yr',
    experience: '5+ yrs exp.',
    badge: 'Machine Learning',
    badgeClass: 'badge-blue',
    skills: ['PyTorch', 'Kubernetes', 'MLflow', 'RLHF'],
    description: `Design and deploy large-scale ML models in production. You'll work on LLM fine-tuning, distributed training pipelines, and model serving at scale using PyTorch, Kubernetes, and MLflow.

Key Responsibilities:
• Lead model architecture decisions for production LLM systems
• Build and maintain distributed training pipelines using PyTorch and DeepSpeed
• Implement RLHF pipelines for aligning large language models
• Optimize inference latency using Triton and model quantization
• Collaborate with product and infrastructure teams cross-functionally
• Mentor junior ML engineers and conduct technical interviews

Requirements:
• 5+ years of hands-on ML engineering experience
• Deep expertise in PyTorch and production model deployment
• Experience with Kubernetes, Docker, and MLflow or similar MLOps tools
• Strong understanding of transformer architectures
• Track record of shipping ML features to production at scale
• Experience with distributed training (DDP, FSDP) is a plus`,
    mustSkills: 'PyTorch, Kubernetes, MLflow, Python, machine learning, deep learning',
  },
  {
    id: 2,
    title: 'Data Scientist',
    department: 'Data Science',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹18L – ₹32L / yr',
    experience: '3+ yrs exp.',
    badge: 'Data Science',
    badgeClass: 'badge-purple',
    skills: ['Python', 'SQL', 'Scikit-learn', 'dbt'],
    description: `Own the analytics stack from data wrangling to insight delivery. Build forecasting models, dashboards, and experimentation frameworks that drive product decisions using Python, SQL, and modern BI tools.

Key Responsibilities:
• Design and implement statistical models and ML solutions for business problems
• Build A/B testing frameworks and analyse experiment results
• Create self-serve dashboards and reports using Tableau or Looker
• Partner with engineers to productionize models using dbt and Airflow
• Translate complex analytical findings into clear business recommendations

Requirements:
• 3+ years of data science or analytics experience
• Strong proficiency in Python (pandas, scikit-learn, statsmodels) and SQL
• Experience with A/B testing and causal inference
• Familiarity with dbt, Airflow, or similar data pipeline tools
• Strong statistical foundations (regression, classification, time-series)
• Experience with large datasets in cloud environments (BigQuery, Snowflake)`,
    mustSkills: 'Python, SQL, Scikit-learn, statistics, data analysis, machine learning',
  },
  {
    id: 3,
    title: 'Backend Engineer',
    department: 'Platform Engineering',
    location: 'Hyderabad, IN',
    type: 'Full-time',
    salary: '₹22L – ₹38L / yr',
    experience: '4+ yrs exp.',
    badge: 'Engineering',
    badgeClass: 'badge-green',
    skills: ['Node.js', 'PostgreSQL', 'Redis', 'gRPC'],
    description: `Build the distributed systems powering our platform. You'll design high-throughput APIs, optimise database performance, and lead backend architecture decisions.

Key Responsibilities:
• Design and implement RESTful and gRPC APIs serving millions of daily requests
• Optimise database queries and design schemas in PostgreSQL
• Build caching strategies and event-driven architectures using Redis and Kafka
• Lead backend technical design reviews and mentor junior engineers
• Ensure 99.9% uptime through monitoring, alerting, and on-call ownership

Requirements:
• 4+ years of backend software engineering experience
• Strong proficiency in Node.js or Go (Node.js preferred)
• Deep experience with PostgreSQL, query optimisation, and indexing strategies
• Hands-on experience with Redis, message queues (Kafka / RabbitMQ)
• Familiarity with gRPC, Protocol Buffers, and microservices patterns
• Experience with cloud platforms (AWS / GCP) and Docker/Kubernetes`,
    mustSkills: 'Node.js, PostgreSQL, Redis, API design, microservices, Docker',
  },
];

router.get('/', (req, res) => {
  res.json({ jobs: JOB_LISTINGS });
});

router.get('/:id', (req, res) => {
  const job = JOB_LISTINGS.find(j => j.id === Number(req.params.id));
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

/**
 * POST /api/jobs — HR Post New Job
 */
router.post('/', (req, res) => {
  try {
    const {
      title,
      department = 'General',
      location = 'Remote',
      salary = 'Competitive',
      experience = '1+ yrs',
      skills = [],
      description = '',
      mustSkills = '',
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Job title is required.' });
    }

    const newJob = {
      id: JOB_LISTINGS.length + 1,
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      type: 'Full-time',
      salary: salary.trim(),
      experience: experience.trim(),
      badge: department.trim() || 'General',
      badgeClass: 'badge-blue',
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map(s => s.trim()).filter(Boolean),
      description: description.trim() || `${title} position.`,
      mustSkills: mustSkills || (Array.isArray(skills) ? skills.join(', ') : skills),
    };

    JOB_LISTINGS.unshift(newJob);
    console.log(`✅  New job posted: "${newJob.title}" (ID: ${newJob.id})`);
    res.status(201).json({ success: true, job: newJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
