/*
  Warnings:

  - You are about to drop the column `postbackId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Postback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_postbackId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "postbackId";

-- DropTable
DROP TABLE "Postback";
