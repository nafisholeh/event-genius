import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";

export class ValidateUserAuthUseCase {
  constructor(private userAuthProvider: IUserAuthProvider) {}

  async execute(): Promise<boolean> {
    return await this.userAuthProvider.validateUserAuth();
  }
}
