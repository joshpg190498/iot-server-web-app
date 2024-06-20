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

export interface RamUsage {
  id: number,
  id_device: string,
  total_ram: number,
  free_ram: number,
  used_ram: number,
  used_percent_ram: number,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface CpuTemperature {
  id: number,
  id_device: string,
  sensor_key: string,
  temperature: number,
  collected_at_utc: string,
  inserted_at_utc: string
}
