import express, { Request, Response } from 'express';
import { prisma } from '../dao/patientDao';

const router = express.Router();

const wrap = (fn: (req: Request, res: Response) => Promise<any>) =>
  (req: Request, res: Response, next: any) => fn(req, res).catch(next);

// Create a patient
router.post('/', wrap(async (req, res) => {
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName || !Number.isInteger(age)) {
    return res.status(400).json({ error: 'Invalid input: firstName, lastName, age (integer) are required' });
  }
  const patient = await prisma.patient.create({ data: { firstName, lastName, age } });
  res.status(201).json(patient);
}));

// List patients (include clinicals by default)
router.get('/', wrap(async (req, res) => {
  const includeClinical = req.query.includeClinical !== 'false';
  const patients = await prisma.patient.findMany({ include: { clinicals: includeClinical } as any });
  res.json(patients);
}));

// Get single patient
router.get('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const patient = await prisma.patient.findUnique({ where: { id }, include: { clinicals: true } });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });
  res.json(patient);
}));

// Update (replace)
router.put('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const { firstName, lastName, age } = req.body;
  const data: any = { firstName, lastName };
  if (age !== undefined) {
    if (!Number.isInteger(age)) return res.status(400).json({ error: 'Invalid age' });
    data.age = age;
  }
  try {
    const updated = await prisma.patient.update({ where: { id }, data });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Patient not found' });
    throw err;
  }
}));

// Partial update
router.patch('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const data = { ...req.body } as any;
  if (data.age !== undefined) {
    if (!Number.isInteger(data.age)) return res.status(400).json({ error: 'Invalid age' });
  }
  const cleaned = Object.fromEntries(Object.entries(data).filter(([,v]) => v !== undefined));
  try {
    const updated = await prisma.patient.update({ where: { id }, data: cleaned });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Patient not found' });
    throw err;
  }
}));

// Delete
router.delete('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const deleted = await prisma.patient.delete({ where: { id } });
    res.json(deleted);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Patient not found' });
    throw err;
  }
}));

export default router;
