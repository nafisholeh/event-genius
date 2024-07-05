export interface IUserAuthProvider {
  sendOtpToEmail(email: string): Promise<void>;
}
