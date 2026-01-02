-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinical" (
    "id" SERIAL NOT NULL,
    "componentName" TEXT NOT NULL,
    "componentValue" TEXT NOT NULL,
    "measureDateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Clinical_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Clinical_patientId_idx" ON "Clinical"("patientId");

-- CreateIndex
CREATE INDEX "Clinical_measureDateTime_idx" ON "Clinical"("measureDateTime");

-- AddForeignKey
ALTER TABLE "Clinical" ADD CONSTRAINT "Clinical_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
