import { CpuTemperature, Device, RamUsage } from "../interfaces/dashboard.interface";
import { getCpuTemperatureByIdDeviceRepository, getDevicesRepository, getRamUsageByIdDeviceRepository } from "../repositories/dashboard.repository";


export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}

export async function getRamUsageByIdDeviceService(id_device: string): Promise<RamUsage[]> {
  return await getRamUsageByIdDeviceRepository(id_device)
}

export async function getCpuTemperatureByIdDeviceService(id_device: string): Promise<CpuTemperature[]> {
  return await getCpuTemperatureByIdDeviceRepository(id_device)
}
