-- DropForeignKey
ALTER TABLE "Postback" DROP CONSTRAINT "Postback_aff_sub4_fkey";

-- AlterTable
ALTER TABLE "Postback" ALTER COLUMN "aff_sub4" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Postback" ADD CONSTRAINT "Postback_aff_sub4_fkey" FOREIGN KEY ("aff_sub4") REFERENCES "Event"("cid") ON DELETE SET NULL ON UPDATE CASCADE;
