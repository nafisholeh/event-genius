import ChatMessageEntity, { ChatMessageUIType } from "@/core/chat/entities/ChatMessageEntity";
import { ICloudDBProvider, RetrieveChatType } from "@/core/chat/providers/ICloudDBProvider";
import { RetrieveSessionType } from "@/core/chat/use-cases/RetrieveSessionUseCase";
import { RetrieveUserPromptType } from "@/core/chat/use-cases/RetrieveUserPromptUseCase";
import { PrismaClient, RoleType } from "@prisma/client";

export class PostgresqlPrisma implements ICloudDBProvider {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async retrieveUserPrompts(data: RetrieveUserPromptType): Promise<ChatMessageUIType[]> {
    const retrievedUserPrompts = await this.client.chatMessages.findMany({
      where: {
        role: "USER",
        user_id: data.userId,
      },
    });

    return retrievedUserPrompts.map(ChatMessageEntity.fromDatabase);
  }

  async retrieveMaxSessionId(data: RetrieveSessionType): Promise<number | null> {
    const retrievedMaxSessionId = await this.client.chatMessages.aggregate({
      _max: { session_id: true },
      where: {
        user_id: data.userId,
      },
    });

    return retrievedMaxSessionId._max.session_id;
  }

  async retrieveChatBySession(data: RetrieveChatType): Promise<ChatMessageUIType[]> {
    const retrievedChat = await this.client.chatMessages.findMany({
      where: {
        session_id: data.sessionId,
        user_id: data.userId,
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
