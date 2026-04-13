const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const { initializeDatabase } = require('./db');
const v1DepartmentsRouter = require('./routes/v1/departments');
const v2DepartmentsRouter = require('./routes/v2/departments');
const { getSwaggerSpec } = require('./swagger');
const app = express();

initializeDatabase()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('PostgreSQL initialization error', err));

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

const swaggerSpecV1 = getSwaggerSpec({
  version: 'v1',
  title: 'ACAP API V1',
  apiFiles: ['./backend/routes/v1/*.js']
});

const swaggerSpecV2 = getSwaggerSpec({
  version: 'v2',
  title: 'ACAP API V2',
  apiFiles: ['./backend/routes/v2/*.js']
});

app.use(helmet());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(apiLimiter);

//  /api-docs/v1
app.use('/api/v1', v1DepartmentsRouter);

// /api-docs/v2
app.use('/api/v2', v2DepartmentsRouter);
app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecV1));
app.use('/api-docs/v2', swaggerUi.serve, swaggerUi.setup(swaggerSpecV2));

app.use('/', v1DepartmentsRouter);

app.get('/api', (req, res) => {
  res.json({ message: 'ACAP API root', versions: ['v1', 'v2'] });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
