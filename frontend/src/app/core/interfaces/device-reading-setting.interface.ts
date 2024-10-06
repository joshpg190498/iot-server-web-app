export interface IDeviceReadingSetting {
  id?: number;
  id_device?: string;
  parameter?: string
  period?: number
  active?: boolean
  threshold_value?: number | null
  description?: string
}

export class DeviceReadingSetting implements IDeviceReadingSetting {
  constructor(
    public id?: number,
    public id_device?: string,
    public parameter?: string,
    public period?: number,
    public active?: boolean,
    public threshold_value?: number | null,
    public description?: string,

  ) {}
}