/*
  Warnings:

  - The `offer_id` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "offer_id",
ADD COLUMN     "offer_id" INTEGER;
