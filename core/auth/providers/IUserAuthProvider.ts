export interface IUserAuthProvider {
  sendOtpToEmail(email: string): Promise<Error | null>;
  verifyOtp(email: string, otp: string): Promise<Error | null>;
  validateUserAuth(): Promise<boolean>;
  getUserId(): Promise<string | undefined>;
}
