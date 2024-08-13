/*
  Warnings:

  - The primary key for the `Activity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `conversions` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Activity_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "conversions";

-- CreateTable
CREATE TABLE "Postback" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "offer_id" INTEGER NOT NULL,
    "offer_name" TEXT NOT NULL,
    "affiliate_id" INTEGER NOT NULL,
    "session_ip" TEXT NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "aff_sub" TEXT NOT NULL,
    "aff_sub2" TEXT NOT NULL,
    "aff_sub3" TEXT NOT NULL,
    "aff_sub4" TEXT,
    "aff_sub5" TEXT,
    "source" TEXT,
    "ran" TEXT,

    CONSTRAINT "Postback_pkey" PRIMARY KEY ("id")
);
