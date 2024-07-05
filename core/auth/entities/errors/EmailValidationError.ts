export class EmailValidationError extends Error {
  constructor(message: string = "Invalid email format") {
    super(message);
    this.name = "EmailValidationError";
  }
}
