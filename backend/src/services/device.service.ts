import config from "../config"
import { Device, DeviceInput } from "../interfaces/devices.interface"
import { createDeviceRepository, deleteDeviceRepository, getDeviceByIdRepository, getDevicesRepository, updateDeviceRepository } from "../repositories/device.repository"
import { runProducer } from "../kafka/kafka.producer"

const KAFKA_TOPIC = config.kafka.topic

export async function getDevicesService(): Promise<Device[]> {
  return await getDevicesRepository()
}

export async function getDeviceByIdService(id: number): Promise<Device> {
  return await getDeviceByIdRepository(id)
}

export async function createDeviceService(input: DeviceInput): Promise<Device> {
  const {newDevice, newUpdate} = await createDeviceRepository(input)
  await runProducer(KAFKA_TOPIC, newDevice.id_device, newUpdate)
  return newDevice
}

export async function updateDeviceService(id: number, input: DeviceInput): Promise<Device> {
  return await updateDeviceRepository(id, input)
}
export async function deleteDeviceService(id: number): Promise<boolean> {
  return await deleteDeviceRepository(id)
}