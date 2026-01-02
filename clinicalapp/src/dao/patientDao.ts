// import { PrismaClient, Patient } from '../';
import { PrismaClient, Patient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Keep a single PrismaClient instance to avoid too many connections during dev reloads
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prisma v7 requires an adapter or Accelerate. Adapter uses your DATABASE_URL:
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = globalThis.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

export type PatientCreateInput = {
  firstName: string;
  lastName: string;
  age: number;
};

export type PatientUpdateInput = Partial<PatientCreateInput>;

/**
 * Create a new patient
 */
export async function createPatient(data: PatientCreateInput): Promise<Patient> {
  return prisma.patient.create({ data });
}

/**
 * Get patient by id, returns null if not found
 */
export async function getPatientById(id: number): Promise<Patient | null> {
  return prisma.patient.findUnique({ where: { id } });
}

/**
 * List all patients, optionally include related clinical records
 */
export async function getAllPatients(includeClinical = true): Promise<Patient[]> {
  return prisma.patient.findMany({ include: { clinicals: includeClinical } as any });
}

/**
 * Update a patient by id. Returns the updated patient or null if not found.
 */
export async function updatePatient(
  id: number,
  data: PatientUpdateInput
): Promise<Patient | null> {
  try {
    return await prisma.patient.update({ where: { id }, data });
  } catch (err: any) {
    // Prisma throws a known error code P2025 when record not found
    if (err?.code === 'P2025') return null;
    throw err;
  }
}

/**
 * Delete a patient by id. Returns deleted patient or null if not found.
 */
export async function deletePatient(id: number): Promise<Patient | null> {
  try {
    return await prisma.patient.delete({ where: { id } });
  } catch (err: any) {
    if (err?.code === 'P2025') return null;
    throw err;
  }
}

// Optional: export prisma for advanced queries in other modules
export { prisma };

/* Example usage:

import { createPatient, getAllPatients } from './dao/patient';

await createPatient({ firstName: 'Jane', lastName: 'Doe', age: 34 });
const patients = await getAllPatients();
*/
