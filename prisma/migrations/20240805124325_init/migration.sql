-- CreateTable
CREATE TABLE "user" (
    "xata_id" TEXT NOT NULL DEFAULT ('rec_'::text || (xata_private.xid())::text),
    "xata_version" INTEGER NOT NULL DEFAULT 0,
    "xata_createdat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "xata_updatedat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "_pgroll_new_user_xata_id_key" ON "user"("xata_id");
