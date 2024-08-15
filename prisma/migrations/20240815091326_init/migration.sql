/*
  Warnings:

  - A unique constraint covering the columns `[aff_sub4]` on the table `Postback` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "postbackId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Postback_aff_sub4_key" ON "Postback"("aff_sub4");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_postbackId_fkey" FOREIGN KEY ("postbackId") REFERENCES "Postback"("aff_sub4") ON DELETE SET NULL ON UPDATE CASCADE;
