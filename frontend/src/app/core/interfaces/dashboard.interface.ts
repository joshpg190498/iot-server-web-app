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
  cpu_count?: number;
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
    public cpu_count?: number,
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
  temperature?: number | string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class CpuTemperature implements ICpuTemperature {
  constructor(
    public id?: number,
    public id_device?: string,
    public sensor_key?: string,
    public temperature?: number | string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface ICpuUsage {
  id?: number;
  id_device?: string;
  cpu_usage?: number | string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class CpuUsage implements ICpuUsage {
  constructor(
    public id?: number,
    public id_device?: string,
    public cpu_usage?: number | string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface IDiskUsage {
  id?: number;
  id_device?: string;
  disk_name?: string;
  total_disk?: number | string;
  free_disk?: number | string;
  used_disk?: number | string;
  used_percent_disk?: number | string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class DiskUsage implements IDiskUsage {
  constructor (
    public id?: number,
    public id_device?: string,
    public disk_name?: string,
    public total_disk?: number | string,
    public free_disk?: number | string,
    public used_disk?: number | string,
    public used_percent_disk?: number | string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface ILoadAverage {
  id?: number;
  id_device?: string;
  load_average_1m?: number | string;
  load_average_5m?: number | string;
  load_average_15m?: number | string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class LoadAverage implements ILoadAverage {
  constructor (
    public id?: number,
    public id_device?: string,
    public load_average_1m?: number | string,
    public load_average_5m?: number | string,
    public load_average_15m?: number | string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface INetworkStats {
  id?: number;
  id_device?: string;
  interface_name?: string;
  bytes_sent?: number | string;
  bytes_recv?: number | string;
  packets_sent?: number | string;
  packets_recv?: number | string;
  errin?: number | string;
  errout?: number | string;
  dropin?: number | string;
  droput?: number | string;
  collected_at_utc?: string;
  inserted_at_utc?: string
}

export class NetworkStats implements INetworkStats {
  constructor (
    public id?: number,
    public id_device?: string,
    public interface_name?: string,
    public bytes_sent?: number | string,
    public bytes_recv?: number | string,
    public packets_sent?: number | string,
    public packets_recv?: number | string,
    public errin?: number | string,
    public errout?: number | string,
    public dropin?: number | string,
    public dropout?: number | string,
    public collected_at_utc?: string,
    public inserted_at_utc?: string
  ) {}
}

export interface IDashboardDeviceData {
  ramUsage?: RamUsage[],
  cpuTemperature?: CpuTemperature[],
  cpuUsage?: CpuUsage[]
  diskUsage?: DiskUsage[]
  loadAverage?: LoadAverage[]
  networkStats?: NetworkStats[]
}

export class DashboardDeviceData implements IDashboardDeviceData {
  constructor (
    public ramUsage?: RamUsage[],
    public cpuTemperature?: CpuTemperature[],
    public cpuUsage?: CpuUsage[],
    public diskUsage?: DiskUsage[],
    public loadAverage?: LoadAverage[],
    public networkStats?: NetworkStats[]
  ) {}
}