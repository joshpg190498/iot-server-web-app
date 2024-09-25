import { CpuTemperature, CpuUsage, Device, DiskUsage, LoadAverage, NetworkStats, RamUsage } from "../interfaces/dashboard.interface";
import { getCpuTemperatureByIdDeviceRepository, getCpuUsageByIdDeviceRepository, getDevicesRepository, getDiskUsageByIdDeviceRepository, getLoadAverageByIdDeviceRepository, getNetworkStatsByIdDeviceRepository, getRamUsageByIdDeviceRepository } from "../repositories/dashboard.repository";


export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}

export async function getRamUsageByIdDeviceService(id_device: string): Promise<RamUsage[]> {
  return await getRamUsageByIdDeviceRepository(id_device)
}

export async function getCpuTemperatureByIdDeviceService(id_device: string): Promise<CpuTemperature[]> {
  return await getCpuTemperatureByIdDeviceRepository(id_device)
}

export async function getCpuUsageByIdDeviceService(id_device: string): Promise<CpuUsage[]> {
  return await getCpuUsageByIdDeviceRepository(id_device)
}

export async function getDiskUsageByIdDeviceService(id_device: string): Promise<DiskUsage[]> {
  return await getDiskUsageByIdDeviceRepository(id_device)
}

export async function getLoadAverageByIdDeviceService(id_device: string): Promise<LoadAverage[]> {
  return await getLoadAverageByIdDeviceRepository(id_device)
}

export async function getNetworkStatsByIdDeviceService(id_device: string): Promise<NetworkStats[]> {
  return await getNetworkStatsByIdDeviceRepository(id_device)
}
