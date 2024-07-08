import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";
import ChatMessageEntity, { RoleType } from "../entities/ChatMessageEntity";

export type RecordMessageType = {
  content: string;
  role: RoleType;
  sessionId: number;
};

export class RecordMessageUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(data: RecordMessageType): Promise<void> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const normalizedRole = data.role.toUpperCase() as RoleType;
    const createdAt = new Date();

    const newMessage = new ChatMessageEntity("", userId, normalizedRole, data.content, createdAt, data.sessionId);
    await this.cloudDBProvider.recordMessage({ newMessage });
  }
}
