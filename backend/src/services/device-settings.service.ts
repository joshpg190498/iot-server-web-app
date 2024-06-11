import config from "../config"
import { DeviceReadingInput, DeviceReadingSetting } from "../interfaces/device-settings.interface"
import { runProducer } from "../kafka/kafka.producer"
import { getDeviceReadingSettingsByIdDeviceRepository, getDeviceReadingSettingsRepository, updateDeviceReadingSettingsRepository } from "../repositories/device-settings.repository"

const DATA_RECEPTION_KAFKA_TOPIC = config.kafka.topic

export async function getDeviceReadingSettingsService(): Promise<DeviceReadingSetting[]> {
  return await getDeviceReadingSettingsRepository()
}

export async function getDeviceReadingSettingsByIdDeviceService(id_device: string): Promise<DeviceReadingSetting[]> {
  return await getDeviceReadingSettingsByIdDeviceRepository(id_device)
}

export async function updateDeviceReadingSettingsService(id_device: string, settings: DeviceReadingInput[]): Promise<boolean> {
  try {
    const newUpdate = await updateDeviceReadingSettingsRepository(id_device, settings)
    await runProducer(DATA_RECEPTION_KAFKA_TOPIC, id_device, newUpdate)
    return true  
  } catch (err) {
    console.error(err)
    return false
  }
}
