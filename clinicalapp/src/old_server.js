
// src/server.js
import 'dotenv/config';
import express from 'express';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client'; // generated client
import patientRouter from './controllers/patientController.js';
import clinicalRouter from './controllers/clinicalController.js';

const app = express();
app.use(express.json());

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma  = new PrismaClient({ adapter });

// mount patient and clinical routes
app.use('/patients', patientRouter);
app.use('/clinicals', clinicalRouter);

app.get('/health', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


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