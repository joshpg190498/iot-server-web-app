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

export interface CpuTemperature {
  id: number,
  id_device: string,
  sensor_key: string,
  temperature: number,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface CpuUsage {
  id: number,
  id_device: string,
  cpu_usage: number,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface DiskUsage {
  id: number,
  id_device: string,
  disk_name: string,
  total_disk: number,
  free_disk: number,
  used_disk: number,
  used_percent_disk: number,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface LoadAverage {
  id: number,
  id_device: string,
  load_average_1m: number,
  load_average_5m: number,
  load_average_15m: number,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface NetworkInformation {
  id: number,
  id_device: string,
  interface_name: string,
  mtu: number,
  hardware_addr: string,
  flags: string,
  addrs: string,
  collected_at_utc: string,
  inserted_at_utc: string
}

export interface NetworkStats {
  id: number,
  id_device: string,
  interface_name: string,
  bytes_sent: number,
  bytes_recv: number,
  packets_sent: number,
  packets_recv: number,
  errout: number,
  errin: number,
  dropin: number,
  dropout: number,
  collected_at_utc: string,
  inserted_at_utc: string
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