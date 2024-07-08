export class NoUserDataError extends Error {
  constructor(message: string = "You are not authorized to perform this actions") {
    super(message);
    this.name = "NoUserDataError";
  }
}
