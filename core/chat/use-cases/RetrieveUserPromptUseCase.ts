import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { ICloudDBProvider } from "../providers/ICloudDBProvider";
import { NoUserDataError } from "../entities/errors/NoUserDataError";

export type RetrieveUserPromptType = {
  userId: string;
};

export class RetrieveUserPromptUseCase {
  constructor(
    private cloudDBProvider: ICloudDBProvider,
    private userAuthProvider: IUserAuthProvider,
  ) {}

  async execute(): Promise<string> {
    const userId = await this.userAuthProvider.getUserId();
    if (!userId) {
      throw new NoUserDataError();
    }

    const retrievedUserPrompts = await this.cloudDBProvider.retrieveUserPrompts({ userId });

    const userPrompts = retrievedUserPrompts.reduce((acc, currentMessage) => {
      if (currentMessage.content) {
        return acc + " " + currentMessage.content;
      }
      return acc;
    }, "");

    return userPrompts;
  }
}
