import UserAuthCredsEntity from "@/core/auth/entities/UserAuthCredsEntity";
import { IUserAuthProvider } from "@/core/auth/providers/IUserAuthProvider";
import { EmailValidationError } from "../entities/errors/EmailValidationError";

type Dto = {
  email: string;
};

export class SendOtpToEmailUseCase {
  constructor(private userAuthProvider: IUserAuthProvider) {}

  async execute(data: Dto): Promise<void> {
    const userAuthCredsEntity = new UserAuthCredsEntity(data.email);
    if (!userAuthCredsEntity.validateEmail()) {
      throw new EmailValidationError();
    }

    await this.userAuthProvider.sendOtpToEmail(userAuthCredsEntity.email);
  }
}
