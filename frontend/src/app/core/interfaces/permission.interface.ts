export interface IPermission {
  id?: number;
  permission_name?: string;
  icon?: string;
  path?: string;
  description?: string;
}

export class Permission implements IPermission {
  constructor(
    public email?: number,
    public permission_name?: string,
    public icon?: string,
    public path?: string,
    public description?: string
  ) {}
}