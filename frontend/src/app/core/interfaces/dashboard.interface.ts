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

export interface IRamUsage {
  id?: number;
  id_device?: string;
  total_ram?: number;
  free_ram?: number;
  used_ram?: number;
  used_percent_ram?: number;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class RamUsage implements IRamUsage {
  constructor(
    public id?: number,
    public id_device?: string,
    public total_ram?: number,
    public free_ram?: number,
    public used_ram?: number,
    public used_percent_ram?: number,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface ICpuTemperature {
  id?: number;
  id_device?: string;
  sensor_key?: string;
  temperature?: number;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class CpuTemperature implements ICpuTemperature {
  constructor(
    public id?: number,
    public id_device?: string,
    public sensor_key?: string,
    public temperature?: number,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}
