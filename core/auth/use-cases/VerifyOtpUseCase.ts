import UserAuthCredsEntity from "../entities/UserAuthCredsEntity";
import { OtpRequiredError } from "../entities/errors/OtpRequiredError";
import { IUserAuthProvider } from "../providers/IUserAuthProvider";

type Dto = {
  email: string;
  otp: string;
};

export default class VerifyOtpUseCase {
  constructor(private userAuthProvider: IUserAuthProvider) {}

  async execute(data: Dto): Promise<void> {
    const userAuthCredsEntity = new UserAuthCredsEntity(data.email, data.otp);
    if (userAuthCredsEntity.otp === undefined) {
      throw new OtpRequiredError();
    }

    const error = await this.userAuthProvider.verifyOtp(userAuthCredsEntity.email, userAuthCredsEntity.otp);

    if (error) {
      throw error;
    }
  }
}
