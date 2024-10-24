import { CpuTemperature, CpuUsage, Device, DiskUsage, LoadAverage, NetworkStats, RamUsage } from "../interfaces/dashboard.interface";
import { getCpuTemperatureByIdDeviceRepository, getCpuUsageByIdDeviceRepository, getDevicesRepository, getDiskUsageByIdDeviceRepository, getLoadAverageByIdDeviceRepository, getNetworkStatsByIdDeviceRepository, getRamUsageByIdDeviceRepository } from "../repositories/dashboard.repository";


export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}

export async function getRamUsageByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<RamUsage[]> {
  return await getRamUsageByIdDeviceRepository(id_device, startTime, endTime)
}

export async function getCpuTemperatureByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<CpuTemperature[]> {
  return await getCpuTemperatureByIdDeviceRepository(id_device, startTime, endTime)
}

export async function getCpuUsageByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<CpuUsage[]> {
  return await getCpuUsageByIdDeviceRepository(id_device, startTime, endTime)
}

export async function getDiskUsageByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<DiskUsage[]> {
  return await getDiskUsageByIdDeviceRepository(id_device, startTime, endTime)
}

export async function getLoadAverageByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<LoadAverage[]> {
  return await getLoadAverageByIdDeviceRepository(id_device, startTime, endTime)
}

export async function getNetworkStatsByIdDeviceService(
  id_device: string, 
  startTime: any = null,
  endTime: any = null
): Promise<NetworkStats[]> {
  return await getNetworkStatsByIdDeviceRepository(id_device, startTime, endTime)
}
