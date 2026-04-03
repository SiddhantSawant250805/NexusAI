require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports are now handled directly in app.use()
const mlRoutes = require('./routes/ml.routes');

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

const app = express();

// ─── Security & Logging ───────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true,
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Rate Limiting ────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests — slow down, operator.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts — try again later.' },
});

app.use('/api/', apiLimiter);
app.use('/api/v1/auth', authLimiter);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'NEXUSAI_SERVER_ONLINE',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/profile', require('./routes/profile.routes'));
app.use('/api/v1/workouts', require('./routes/workout.routes'));
app.use('/api/v1/templates', require('./routes/template.routes'));
app.use('/api/v1/progress', require('./routes/progress.routes'));
app.use('/api/v1/nutrition', require('./routes/nutrition.routes'));
app.use('/api/v1/arena', require('./routes/arena.routes'));
app.use('/api/v1/vault', require('./routes/vault.routes'));

// ─── ML Service Proxy ────────────────────────────────────────────────────────
// Proxies /api/ml/* → ML_SERVICE_URL/*  (requires JWT)
app.use('/api/ml', mlRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n[SERVER] NexusAI API running on http://localhost:${PORT}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SERVER] ML Proxy target: ${process.env.ML_SERVICE_URL || 'http://localhost:8000'}\n`);
});

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error('[SERVER] Unhandled rejection:', err.message);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('[SERVER] SIGTERM received — shutting down gracefully');
  server.close(() => process.exit(0));
});
