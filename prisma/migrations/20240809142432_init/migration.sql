/*
  Warnings:

  - You are about to drop the column `userId` on the `conversions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "conversions" DROP COLUMN "userId",
ADD COLUMN     "userid" TEXT;
