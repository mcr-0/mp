-- CreateTable
CREATE TABLE "Postback" (
    "id" SERIAL NOT NULL,
    "offer_id" TEXT NOT NULL,
    "offer_name" TEXT,
    "affiliate_id" TEXT,
    "source" TEXT,
    "session_ip" TEXT NOT NULL,
    "payout" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "session_timestamp" INTEGER NOT NULL,
    "aff_sub" TEXT,
    "aff_sub2" TEXT,
    "aff_sub3" TEXT,
    "aff_sub4" TEXT,
    "aff_sub5" TEXT,
    "ran" TEXT,

    CONSTRAINT "Postback_pkey" PRIMARY KEY ("id")
);
