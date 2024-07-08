import ChatMessageEntity, { ChatMessageUIType } from "@/core/chat/entities/ChatMessageEntity";
import { ICloudDBProvider } from "@/core/chat/providers/ICloudDBProvider";
import { RetrieveChatType } from "@/core/chat/use-cases/RetrieveChatUseCase";
import { PrismaClient, RoleType } from "@prisma/client";

export class PostgresqlPrisma implements ICloudDBProvider {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async retrieveChatBySession(data: RetrieveChatType): Promise<ChatMessageUIType[]> {
    const retrievedChat = await this.client.chatMessages.findMany({
      where: {
        session_id: data.sessionId,
      },
    });

    return retrievedChat.map(ChatMessageEntity.fromDatabase);
  }

  async recordMessage({ newMessage }: { newMessage: ChatMessageEntity }): Promise<void> {
    const normalizedMessage = newMessage.toDatabaseFormat();

    // let database generate ID
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...messageWithoutId } = normalizedMessage;

    await this.client.chatMessages.create({
      data: {
        ...messageWithoutId,
        role: normalizedMessage.role as RoleType,
      },
    });
  }
}
