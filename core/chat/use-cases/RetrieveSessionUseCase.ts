import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";

export class RetrieveSessionUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(): Promise<number[] | null> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const retrievedMaxSessionId = await this.cloudDBProvider.retrieveMaxSessionId();

    if (retrievedMaxSessionId) {
      const sessionList = [];

      for (let i = 0; i <= retrievedMaxSessionId; i++) {
        sessionList.push(i);
      }

      return sessionList;
    }

    return null;
  }
}
