import { ICloudDBProvider, ChatMessage, ChatMessageList } from "@/core/chat/providers/ICloudDBProvider";
import { PrismaClient, RoleType } from "@prisma/client";

export type RecordMessageFunction = (message: ChatMessage) => Promise<void>;

export class PostgresqlPrisma implements ICloudDBProvider {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async readMessages(): Promise<ChatMessageList> {
    const messages = await this.client.chatMessages.findMany();

    return messages as ChatMessageList;
  }

  async recordMessage({ data }: { data: ChatMessage }): Promise<void> {
    await this.client.chatMessages.create({
      data: {
        content: data.content,
        role: data.role === "assistant" ? RoleType.ASSISTANT : RoleType.USER,
        session_id: data.sessionId,
        created_at: data.createdAt.toISOString(),
        user_id: data.userId,
      },
    });
  }
}
