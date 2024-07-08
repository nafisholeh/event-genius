import { ChatMessageUIType } from "../entities/ChatMessageEntity";

export type ChatMessage = {
  content: string;
  role: "user" | "assistant";
  sessionId: number;
  userId: string;
  createdAt: Date;
};

export type RoleType = "user" | "assistant";

export interface ICloudDBProvider {
  retrieveChatBySession({ sessionId }: { sessionId: number }): Promise<ChatMessageUIType[]>;
  recordMessage({ data }: { data: ChatMessage }): Promise<void>;
}
