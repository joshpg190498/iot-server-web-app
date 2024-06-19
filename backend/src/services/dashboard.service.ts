import { Device } from "../interfaces/dashboard.interface";
import { getDevicesRepository } from "../repositories/dashboard.repository";


export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}
