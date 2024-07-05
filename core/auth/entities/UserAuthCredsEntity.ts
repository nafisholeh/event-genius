export default class UserAuthCredsEntity {
  private _email: string;
  private _otp?: string;

  constructor(email: string, otp?: string) {
    this._email = email;
    this._otp = otp;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get otp(): string | undefined {
    return this._otp;
  }

  public set otp(value: string | undefined) {
    this._otp = value;
  }

  public validateEmail(): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(this._email);
  }
}
