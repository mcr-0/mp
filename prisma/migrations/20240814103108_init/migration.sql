-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP;