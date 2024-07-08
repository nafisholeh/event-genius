import ChatMessageEntity, { ChatMessageUIType } from "@/core/chat/entities/ChatMessageEntity";
import { ICloudDBProvider } from "@/core/chat/providers/ICloudDBProvider";
import { PrismaClient, RoleType } from "@prisma/client";

export class PostgresqlPrisma implements ICloudDBProvider {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async retrieveChatBySession({ sessionId }: { sessionId: number }): Promise<ChatMessageUIType[]> {
    const retrievedChat = await this.client.chatMessages.findMany({
      where: {
        session_id: sessionId,
      },
    });

    return retrievedChat.map(ChatMessageEntity.fromDatabase);
  }

  async recordMessage({ data }: { data: ChatMessageUIType }): Promise<void> {
    await this.client.chatMessages.create({
      data: {
        content: data.content,
        role: data.role === "assistant" ? RoleType.ASSISTANT : RoleType.USER,
        session_id: data.sessionId,
        created_at: data.createdAt,
        user_id: data.userId,
      },
    });
  }
}
