import { getHistoricDataRepository, getHourlyHistoricDataByIdDeviceRepository } from "../repositories/data-historic-tabular.repository"

export async function getHistoricDataService(
  id_device: string,
  table_pointer: string,
  startTime: any = null,
  endTime: any = null
): Promise<any> {
  return await getHistoricDataRepository(id_device, table_pointer, startTime, endTime)
}

export async function getHourlyHistoricDataService(
  id_device: string,
  table_pointer: string,
  startTime: any = null,
  endTime: any = null
): Promise<any> {
  return await getHourlyHistoricDataByIdDeviceRepository(id_device, table_pointer, startTime, endTime)
}

export async function getAllHistoricDataGraphService(
  id_device: string,
  table_pointer: string,
) {
  const endTime = new Date()
  const oneDayStartTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000)
  const sevenDaysStartTime = new Date(endTime.getTime() - 7 * 24 * 60 * 60 * 1000)
  const oneMonthStartTime = new Date(endTime.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sixMonthsStartTime = new Date(endTime.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
  const [oneDay, sevenDays, oneMonth, sixMonths] = await Promise.all([
    getHistoricDataService(id_device, table_pointer, oneDayStartTime, endTime),
    getHourlyHistoricDataService(id_device, table_pointer, sevenDaysStartTime, endTime),
    getHourlyHistoricDataService(id_device, table_pointer, oneMonthStartTime, endTime),
    getHourlyHistoricDataService(id_device, table_pointer, sixMonthsStartTime, endTime),
  ])
  return {
    oneDay,
    sevenDays,
    oneMonth,
    sixMonths
  }
}

export async function getTabularDataService(
  id_device: string,
  table_pointer: string
) {
  const data = await getHistoricDataService(id_device, table_pointer)
  return {
    data
  }
}