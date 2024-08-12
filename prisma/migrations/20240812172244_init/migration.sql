/*
  Warnings:

  - The `offer_id` column on the `conversions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "conversions" DROP COLUMN "offer_id",
ADD COLUMN     "offer_id" INTEGER;
