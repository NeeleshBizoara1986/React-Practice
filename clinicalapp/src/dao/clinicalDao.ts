import type { Clinical } from '../../generated/prisma/client';
import { prisma } from './patientDao';

export type ClinicalCreateInput = {
  componentName: string;
  componentValue: string;
  measureDateTime?: Date | string;
  patientId: number;
};

export type ClinicalUpdateInput = Partial<ClinicalCreateInput>;

/** Create a new clinical record */
export async function createClinical(data: ClinicalCreateInput): Promise<Clinical> {
  const { measureDateTime, ...rest } = data;
  return prisma.clinical.create({
    data: {
      ...rest,
      measureDateTime: measureDateTime ? new Date(measureDateTime) : undefined
    }
  });
}

/** Get a clinical by id */
export async function getClinicalById(id: number): Promise<Clinical | null> {
  return prisma.clinical.findUnique({ where: { id } });
}

/** List clinical records for a patient, ordered by measureDateTime desc */
export async function getClinicalsForPatient(patientId: number): Promise<Clinical[]> {
  return prisma.clinical.findMany({ where: { patientId }, orderBy: { measureDateTime: 'desc' } });
}

/** List all clinical records */
export async function getAllClinicals(): Promise<Clinical[]> {
  return prisma.clinical.findMany({ orderBy: { measureDateTime: 'desc' } });
}

/** Update clinical by id; returns updated record or null if not found */
export async function updateClinical(id: number, data: ClinicalUpdateInput): Promise<Clinical | null> {
  try {
    return await prisma.clinical.update({ where: { id }, data });
  } catch (err: any) {
    if (err?.code === 'P2025') return null;
    throw err;
  }
}

/** Delete a clinical record by id; returns deleted record or null if not found */
export async function deleteClinical(id: number): Promise<Clinical | null> {
  try {
    return await prisma.clinical.delete({ where: { id } });
  } catch (err: any) {
    if (err?.code === 'P2025') return null;
    throw err;
  }
}

/* Example usage:
import { createClinical, getClinicalsForPatient } from './dao/clinicalDao';

await createClinical({ componentName: 'BP', componentValue: '120/80', patientId: 1 });
const clinicals = await getClinicalsForPatient(1);
*/
