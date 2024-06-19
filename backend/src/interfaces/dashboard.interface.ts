export interface Device {
  id: number,
  id_device: string,
  creation_datetime_utc: string,
  update_datetime_utc?: string,
  hostname?: string,
  processor?: string,
  ram?: string,
  hostid?: string,
  os?: string,
  kernel?: string,
  collected_at_utc?: string,
  inserted_at_utc?: string
}
