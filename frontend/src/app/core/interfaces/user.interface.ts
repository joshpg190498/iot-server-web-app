export interface IUser {
  id?: number;
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  active?: boolean;
  id_role?: number;
  role?: string;
  isEditMode?: boolean
}

export class User implements IUser {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public first_name?: string,
    public last_name?: string,
    public active?: boolean,
    public id_role?: number,
    public role?: string,
    public isEditMode?: boolean,
  ) {}
}