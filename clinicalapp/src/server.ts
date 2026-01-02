// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import patientRouter from './controllers/patientController.js';
import clinicalRouter from './controllers/clinicalController.js';
import * as http from 'node:http';

const app = express();
app.use(express.json());

// // CORS: allow requests from any origin in dev; tighten for production
// app.use(cors());
// // Handle preflight for all routes using a RegExp path to avoid path-to-regexp '*' parsing bug
// app.options(/.*/, cors());

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma  = new PrismaClient({ adapter });

// // CORS configuration
const whitelist = ['http://localhost:3000', 'https://yourdomain.com'];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., mobile apps or curl)
    if (!origin) return callback(null, true);
    callback(null, whitelist.includes(origin));
  },
  credentials: true, // allow cookies/auth headers
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
}));
app.options(/.*/, cors());
// app.options('*', cors()); // handle preflight

// mount patient and clinical routes
app.use('/patients', patientRouter);
app.use('/clinicals', clinicalRouter);

app.get('/health', (_req, res) => res.json({ ok: true }));
export const server = http.createServer(app);

/**
 * Provide a promise-based way to close the HTTP server from tests or other modules.
 * Usage: await closeServer();
 */
export function closeServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close(async (err?: Error | null) => {
      if (err) return reject(err);
      try {
        await prisma.$disconnect(); // <- disconnect here
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
}

// add signal handlers so shutting down from Ctrl+C or SIGTERM also disconnects
process.on('SIGINT', async () => {
  console.log('SIGINT received — shutting down');
  try { await closeServer(); } catch(e) { console.error(e); }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received — shutting down');
  try { await closeServer(); } catch(e) { console.error(e); }
  process.exit(0);
});

export function startServer(port: number = Number(process.env.PORT) || 3000): Promise<void> {
  return new Promise((resolve, reject) => {
    server.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
      resolve();
    });
    server.on('error', reject);
  });
}

// Auto-start control
const AUTOSTART_ENVS = ['development', 'production'];
const env = process.env.NODE_ENV ?? 'development';
const runServerEnv = process.env.RUN_SERVER; // 'true'|'false' or undefined
let shouldAutoStart: boolean;
if (runServerEnv === 'true') shouldAutoStart = true;
else if (runServerEnv === 'false') shouldAutoStart = false;
else shouldAutoStart = AUTOSTART_ENVS.includes(env);

if (shouldAutoStart) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
} else {
  console.log(`Auto-start disabled (NODE_ENV=${env}, RUN_SERVER=${runServerEnv})`);
}

/*app.post('/patients', async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;
    const patient = await prisma.patient.create({
      data: { firstName, lastName, age }
    });
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create patient' });
  }
});*/

/*
// src/server.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a patient
app.post('/patients', async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;
    const patient = await prisma.patient.create({
      data: { firstName, lastName, age }
    });
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create patient' });
  }
});

// List patients (include clinicals)
app.get('/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: { clinicals: true }
    });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to fetch patients' });
  }
});

// Add a clinical record to a patient
app.post('/patients/:id/clinicals', async (req, res) => {
  try {
    const patientId = parseInt(req.params.id, 10);
    const { componentName, componentValue, measureDateTime } = req.body;

    // If measureDateTime not provided, Prisma uses default(now())
    const clinical = await prisma.clinical.create({
      data: {
        componentName,
        componentValue,
        measureDateTime: measureDateTime ? new Date(measureDateTime) : undefined,
        patient: { connect: { id: patientId } }
      }
    });

    res.status(201).json(clinical);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to add clinical record' });
  }
});

// Get clinicals for a patient
app.get('/patients/:id/clinicals', async (req, res) => {
  try {
    const patientId = parseInt(req.params.id, 10);
    const clinicals = await prisma.clinical.findMany({
      where: { patientId },
      orderBy: { measureDateTime: 'desc' }
    });
    res.json(clinicals);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to fetch clinicals' });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
*/