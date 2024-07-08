export type ChatMessage = {
  content: string;
  role: "user" | "assistant";
  sessionId: number;
  userId: string;
  createdAt: Date;
};

export type RoleType = "user" | "assistant";

export type ChatMessageList = {
  id: string;
  created_at: Date;
  session_id: number | null;
  content: string | null;
  role: RoleType | null;
  user_id: string | null;
}[];

export interface ICloudDBProvider {
  readMessages(): Promise<ChatMessageList>;
  recordMessage({ data }: { data: ChatMessage }): Promise<void>;
}
