export interface IUserAuthProvider {
  sendOtpToEmail(email: string): Promise<Error | null>;
  verifyOtp(email: string, otp: string): Promise<void>;
  validateUserAuth(): Promise<boolean>;
  getUserId(): Promise<string | undefined>;
}
