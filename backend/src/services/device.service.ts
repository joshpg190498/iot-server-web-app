import config from "../config"
import { Device } from "../interfaces/device.interface"
import { createDeviceRepository, deleteDeviceRepository, getDeviceByIdRepository, getDevicesRepository, updateDeviceRepository } from "../repositories/device.repository"
import { runProducer } from "../kafka/kafka.producer"

const DEVICE_UPDATE_KAFKA_TOPIC = config.kafka.topics.deviceUpdateEvents

export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}

export async function getDeviceByIdService(id: number): Promise<Device> {
  return await getDeviceByIdRepository(id)
}

export async function createDeviceService(id_device: string, description: string): Promise<Device> {
  const {newDevice, newUpdate} = await createDeviceRepository(id_device, description)
  await runProducer(DEVICE_UPDATE_KAFKA_TOPIC, newDevice.id_device, newUpdate)
  return newDevice
}

export async function updateDeviceService(id: number, description: string): Promise<Device> {
  return await updateDeviceRepository(id, description)
}
export async function deleteDeviceService(id: number): Promise<boolean> {
  return await deleteDeviceRepository(id)
}