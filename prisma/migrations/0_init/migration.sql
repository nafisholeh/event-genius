-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('user', 'assistant');

-- CreateTable
CREATE TABLE "public"."ChatMessages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "session_id" SMALLINT,
    "content" TEXT,
    "role" "public"."RoleType",
    "user_id" UUID DEFAULT auth.uid(),

    CONSTRAINT "Chat Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_session_createdat" ON "public"."ChatMessages"("session_id", "created_at");

