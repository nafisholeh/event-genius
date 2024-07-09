import { RetrieveUserPromptUseCase } from "@/core/chat/use-cases/RetrieveUserPromptUseCase";
import { PostgresqlPrisma } from "@/providers/PostgresqlPrisma";
import { SupabaseAuth } from "@/providers/SupabaseAuth";
import { PrismaClient } from "@prisma/client";

export default class RetrieveUserPromptFactory extends RetrieveUserPromptUseCase {
  constructor(client: PrismaClient) {
    super(new PostgresqlPrisma(client), new SupabaseAuth());
  }
}
