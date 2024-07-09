import ChatMessageEntity, { ChatMessageUIType } from "../entities/ChatMessageEntity";
import { RetrieveChatType } from "../use-cases/RetrieveChatUseCase";
import { RetrieveSessionType } from "../use-cases/RetrieveSessionUseCase";
import { RetrieveUserPromptType } from "../use-cases/RetrieveUserPromptUseCase";

export interface ICloudDBProvider {
  retrieveUserPrompts(data: RetrieveUserPromptType): Promise<ChatMessageUIType[]>;
  retrieveMaxSessionId(data: RetrieveSessionType): Promise<number | null>;
  retrieveChatBySession(data: RetrieveChatType): Promise<ChatMessageUIType[]>;
  recordMessage({ newMessage }: { newMessage: ChatMessageEntity }): Promise<void>;
}
