import { RetrieveSessionUseCase } from "@/core/chat/use-cases/RetrieveSessionUseCase";
import { PostgresqlPrisma } from "@/providers/PostgresqlPrisma";
import { SupabaseAuth } from "@/providers/SupabaseAuth";
import { PrismaClient } from "@prisma/client";

export default class RetrieveSessionFactory extends RetrieveSessionUseCase {
  constructor(client: PrismaClient) {
    super(new PostgresqlPrisma(client), new SupabaseAuth());
  }
}
