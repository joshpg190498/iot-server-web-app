export interface IDevice {
  id?: number;
  id_device?: string;
  description?: string;
  active?: boolean;
  isEditMode?: boolean;
}

export class Device implements IDevice {
  constructor(
    public id?: number,
    public id_device?: string,
    public description?: string,
    public active?: boolean,
    public isEditMode?: boolean,
  ) {}
}