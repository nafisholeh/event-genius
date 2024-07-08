import { ICloudDBProvider, RoleType } from "../providers/ICloudDBProvider";
import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";

type Dto = {
  content: string;
  role: RoleType;
  sessionId: number;
};

export class RecordMessageUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(data: Dto): Promise<void> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const createdAt = new Date().toISOString();

    await this.cloudDBProvider.recordMessage({
      data: {
        id: null,
        content: data.content,
        role: data.role,
        sessionId: data.sessionId,
        createdAt: createdAt,
        userId: userId,
      },
    });
  }
}
