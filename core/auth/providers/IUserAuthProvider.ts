export interface IUserAuthProvider {
  sendOtpToEmail(email: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<void>;
}
