import { RetrieveChatUseCase } from "@/core/chat/use-cases/RetrieveChatUseCase";
import { PostgresqlPrisma } from "@/providers/PostgresqlPrisma";
import { SupabaseAuth } from "@/providers/SupabaseAuth";
import { PrismaClient } from "@prisma/client";

export default class RetrieveChatFactory extends RetrieveChatUseCase {
  constructor(client: PrismaClient) {
    super(new PostgresqlPrisma(client), new SupabaseAuth());
  }
}
