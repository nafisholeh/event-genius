import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";
import { ChatMessageUIType } from "../entities/ChatMessageEntity";

export type RetrieveChatType = {
  sessionId: number;
  userId: string;
};

export class RetrieveChatUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(data: RetrieveChatType): Promise<ChatMessageUIType[]> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const retrievedChat = await this.cloudDBProvider.retrieveChatBySession({
      sessionId: data.sessionId,
      userId,
    });

    const sortedChat = retrievedChat.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return sortedChat;
  }
}
