import ChatMessageEntity, { ChatMessageUIType } from "../entities/ChatMessageEntity";
import { RetrieveChatType } from "../use-cases/RetrieveChatUseCase";

export interface ICloudDBProvider {
  retrieveMaxSessionId(): Promise<number | null>;
  retrieveChatBySession(data: RetrieveChatType): Promise<ChatMessageUIType[]>;
  recordMessage({ newMessage }: { newMessage: ChatMessageEntity }): Promise<void>;
}
