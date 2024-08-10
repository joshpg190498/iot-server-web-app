export interface IRole {
  id?: number;
  role_name?: string;
  description?: string
}

export class Role implements IRole {
  constructor(
    public id?: number,
    public role_name?: string,
    public description?: string
  ) {}
}