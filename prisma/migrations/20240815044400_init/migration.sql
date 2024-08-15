/*
  Warnings:

  - Made the column `aff_sub4` on table `Postback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Postback" ALTER COLUMN "aff_sub4" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Postback" ADD CONSTRAINT "Postback_aff_sub4_fkey" FOREIGN KEY ("aff_sub4") REFERENCES "Event"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
