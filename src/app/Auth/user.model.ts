export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpDate: Date,
    public name?: string,
    public gender?:string
  ) {}

  get token() {
    if (!this._tokenExpDate || new Date() > this._tokenExpDate) {
      return null;
    }
    return this._token;
  }
}
