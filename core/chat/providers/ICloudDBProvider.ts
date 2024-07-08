import { ChatMessageUIType } from "../entities/ChatMessageEntity";

export type RoleType = "user" | "assistant";

export interface ICloudDBProvider {
  retrieveChatBySession({ sessionId }: { sessionId: number }): Promise<ChatMessageUIType[]>;
  recordMessage({ data }: { data: ChatMessageUIType }): Promise<void>;
}
