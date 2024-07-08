export class UserAuthEntity {
  private _email: string;
  private _userId: string;
  private _isLoggedIn: boolean;

  constructor(email: string, userId: string, isLoggedIn: boolean) {
    this._email = email;
    this._userId = userId;
    this._isLoggedIn = isLoggedIn;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get userId(): string {
    return this._userId;
  }

  public set userId(value: string) {
    this._userId = value;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
}
