import ChatMessageEntity, { ChatMessageUIType } from "../entities/ChatMessageEntity";

export interface ICloudDBProvider {
  retrieveChatBySession({ sessionId }: { sessionId: number }): Promise<ChatMessageUIType[]>;
  recordMessage({ newMessage }: { newMessage: ChatMessageEntity }): Promise<void>;
}
