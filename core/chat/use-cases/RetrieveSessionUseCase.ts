import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";

export type RetrieveSessionType = {
  userId: string;
};

export class RetrieveSessionUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(): Promise<number[]> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const retrievedMaxSessionId = await this.cloudDBProvider.retrieveMaxSessionId({ userId });

    if (retrievedMaxSessionId) {
      const sessionList = [];

      for (let i = 0; i <= retrievedMaxSessionId; i++) {
        sessionList.push(i);
      }

      return sessionList;
    }

    return [];
  }
}
