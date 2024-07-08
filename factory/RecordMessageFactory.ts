import { RecordMessageUseCase } from "@/core/chat/use-cases/RecordMessageUseCase";
import { PostgresqlPrisma } from "@/providers/PostgresqlPrisma";
import { SupabaseAuth } from "@/providers/SupabaseAuth";
import { PrismaClient } from "@prisma/client";

export default class RecordMessageFactory extends RecordMessageUseCase {
  constructor(client: PrismaClient) {
    super(new PostgresqlPrisma(client), new SupabaseAuth());
  }
}
