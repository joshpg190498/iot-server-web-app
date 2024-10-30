import { getAllHistoricDataGraphService, getTabularDataService } from "../services/data-historic-tabular.service"


export async function getAllHistoricDataController (_: any, args: any) {
  try {
    const data = await getAllHistoricDataGraphService(args.id_device, args.table_pointer)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}

export async function getTabularDataController (_: any, args: any) {
  try {
    const data = await getTabularDataService(args.id_device, args.table_pointer)
    return data
  } catch (err: any) {
    console.error(err)
    throw new Error(err)
  }
}