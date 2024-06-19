export interface IDevice {
  id?: number;
  id_device?: string;
  creation_datetime_utc?: string;
  update_datetime_utc?: string;
  hostname?: string;
  processor?: string;
  ram?: string;
  hostid?: string;
  os?: string;
  kernel?: string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class Device implements IDevice {
  constructor(
    public id?: number,
    public id_device?: string,
    public creation_datetime_utc?: string,
    public update_datetime_utc?: string,
    public hostname?: string,
    public processor?: string,
    public ram?: string,
    public hostid?: string,
    public os?: string,
    public kernel?: string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}