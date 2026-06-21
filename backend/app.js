require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const { initializeDatabase, isDatabaseReady } = require('./db');
const v1DepartmentsRouter = require('./routes/v1/departments');
const v2DepartmentsRouter = require('./routes/v2/departments');
const { getSwaggerSpec } = require('./swagger');
const app = express();
const path = require('path');

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:4200').split(',').map(origin => origin.trim());
if (process.env.TRUST_PROXY === 'true') app.set('trust proxy', 1);

initializeDatabase()
  .then(() => console.info('[database] PostgreSQL ready'))
  .catch(error => console.warn('[database] unavailable; read-only demo mode enabled:', error.message));

app.disable('x-powered-by');
app.use((req, res, next) => { req.requestId = req.get('x-request-id') || crypto.randomUUID(); res.setHeader('x-request-id', req.requestId); next(); });
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin(origin, callback) { callback(null, !origin || allowedOrigins.includes(origin)); }, methods: ['GET', 'POST', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'] }));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));
app.use(rateLimit({ windowMs: 60_000, limit: 100, standardHeaders: 'draft-7', legacyHeaders: false, message: { code: 'RATE_LIMITED', message: 'Too many requests. Try again shortly.' } }));

app.use('/api/v1', v1DepartmentsRouter);
app.use('/api/v2', v2DepartmentsRouter);
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(getSwaggerSpec({ version: 'v1', title: 'ACAP API V1', apiFiles: ['./backend/routes/v1/*.js'] })));
app.use('/api-docs/v2', swaggerUi.serve, swaggerUi.setup(getSwaggerSpec({ version: 'v2', title: 'ACAP API V2', apiFiles: ['./backend/routes/v2/*.js'] })));

app.get('/api', (_req, res) => res.json({ name: 'ACAP API', version: '2.0.0', documentation: '/api-docs/v1' }));
app.get('/api/health', (_req, res) => {
  const database = isDatabaseReady() ? 'connected' : 'degraded';
  res.status(200).json({ status: 'ok', database, timestamp: new Date().toISOString() });
});
app.use('/api', (_req, res) => res.status(404).json({ code: 'NOT_FOUND', message: 'API route not found.' }));
if (process.env.NODE_ENV === 'production') {
  const publicDirectory = path.join(__dirname, '..', 'public');
  app.use(express.static(publicDirectory, { maxAge: '1y', immutable: true, index: false }));
  app.get(/^(?!\/api|\/api-docs).*/, (_req, res) => res.sendFile(path.join(publicDirectory, 'index.html')));
}
app.use((error, req, res, _next) => {
  console.error(`[${req.requestId}]`, error.message);
  res.status(error.status || 500).json({ code: 'INTERNAL_ERROR', message: 'The request could not be completed.', requestId: req.requestId });
});

module.exports = app;
