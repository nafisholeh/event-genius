export class OtpRequiredError extends Error {
  constructor(message: string = "OTP must not be empty") {
    super(message);
    this.name = "OtpRequiredErrors";
  }
}
