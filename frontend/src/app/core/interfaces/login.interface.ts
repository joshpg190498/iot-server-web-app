export interface ILogin {
  email?: string;
  password?: string;
}

export class Login implements ILogin {
  constructor(
    public email?: string,
    public password?: string
  ) {}
}