import express, { Request, Response } from 'express';
import { prisma } from '../dao/patientDao';

const router = express.Router();

const wrap = (fn: (req: Request, res: Response) => Promise<any>) =>
  (req: Request, res: Response, next: any) => fn(req, res).catch(next);

// Create a clinical record
router.post('/', wrap(async (req, res) => {
  const { componentName, componentValue, measureDateTime, patientId } = req.body;
  const pid = Number(patientId);
  if (!componentName || !componentValue || !Number.isInteger(pid)) {
    return res.status(400).json({ error: 'Invalid input: componentName, componentValue, patientId (integer) are required' });
  }

  // Ensure patient exists
  const patient = await prisma.patient.findUnique({ where: { id: pid } });
  if (!patient) return res.status(404).json({ error: 'Patient not found' });

  const clinical = await prisma.clinical.create({
    data: {
      componentName,
      componentValue,
      measureDateTime: measureDateTime ? new Date(measureDateTime) : undefined,
      patient: { connect: { id: pid } }
    }
  });

  res.status(201).json(clinical);
}));

// List clinicals, optionally filter by patientId
router.get('/', wrap(async (req, res) => {
  const { patientId } = req.query;
  let where: any = undefined;
  if (patientId !== undefined) {
    const pid = Number(patientId);
    if (!Number.isInteger(pid)) return res.status(400).json({ error: 'Invalid patientId' });
    where = { patientId: pid };
  }

  const clinicals = await prisma.clinical.findMany({ where, orderBy: { measureDateTime: 'desc' } });
  res.json(clinicals);
}));

// Get by id
router.get('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const clinical = await prisma.clinical.findUnique({ where: { id } });
  if (!clinical) return res.status(404).json({ error: 'Clinical not found' });
  res.json(clinical);
}));

// Replace
router.put('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const { componentName, componentValue, measureDateTime, patientId } = req.body;
  const data: any = { componentName, componentValue };
  if (measureDateTime !== undefined) data.measureDateTime = new Date(measureDateTime);
  if (patientId !== undefined) {
    const pid = Number(patientId);
    if (!Number.isInteger(pid)) return res.status(400).json({ error: 'Invalid patientId' });
    data.patientId = pid;
  }
  try {
    const updated = await prisma.clinical.update({ where: { id }, data });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Clinical not found' });
    throw err;
  }
}));

// Partial update
router.patch('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  const data = { ...req.body } as any;
  if (data.measureDateTime !== undefined) data.measureDateTime = new Date(data.measureDateTime);
  if (data.patientId !== undefined) {
    const pid = Number(data.patientId);
    if (!Number.isInteger(pid)) return res.status(400).json({ error: 'Invalid patientId' });
    data.patientId = pid;
  }
  // remove undefined fields
  const cleaned = Object.fromEntries(Object.entries(data).filter(([,v]) => v !== undefined));
  try {
    const updated = await prisma.clinical.update({ where: { id }, data: cleaned });
    res.json(updated);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Clinical not found' });
    throw err;
  }
}));

// Delete
router.delete('/:id', wrap(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const deleted = await prisma.clinical.delete({ where: { id } });
    res.json(deleted);
  } catch (err: any) {
    if (err?.code === 'P2025') return res.status(404).json({ error: 'Clinical not found' });
    throw err;
  }
}));

export default router;

/* Notes:
- Uses shared `prisma` from `src/dao/patientDao` to avoid multiple PrismaClient instances.
- `wrap` helper reduces try/catch repetition and forwards errors to Express error handlers.
- Input values are validated and cleaned before sending to Prisma.
*/
