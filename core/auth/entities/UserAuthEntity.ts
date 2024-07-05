export class UserAuthEntity {
  private _email: string;
  private _isLoggedIn: boolean;

  constructor(email: string, isLoggedIn: boolean) {
    this._email = email;
    this._isLoggedIn = isLoggedIn;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public set isLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }
}
