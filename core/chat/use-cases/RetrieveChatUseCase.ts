import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";
import { ChatMessageUIType } from "../entities/ChatMessageEntity";

type Dto = {
  sessionId: number;
};

export class RetrieveChatUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(data: Dto): Promise<ChatMessageUIType[]> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const retrievedChat = await this.cloudDBProvider.retrieveChatBySession({
      sessionId: data.sessionId,
    });

    const sortedChat = retrievedChat.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return sortedChat;
  }
}
