import ChatMessageEntity, { ChatMessageUIType } from "../entities/ChatMessageEntity";
import { RetrieveSessionType } from "../use-cases/RetrieveSessionUseCase";
import { RetrieveUserPromptType } from "../use-cases/RetrieveUserPromptUseCase";

export type RetrieveChatType = {
  sessionId: number;
  userId: string;
};

export interface ICloudDBProvider {
  retrieveUserPrompts(data: RetrieveUserPromptType): Promise<ChatMessageUIType[]>;
  retrieveMaxSessionId(data: RetrieveSessionType): Promise<number | null>;
  retrieveChatBySession(data: RetrieveChatType): Promise<ChatMessageUIType[]>;
  recordMessage({ newMessage }: { newMessage: ChatMessageEntity }): Promise<void>;
}
