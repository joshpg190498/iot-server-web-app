import { getCpuTemperatureByIdDeviceController, getDevicesController, getRamUsageByIdDeviceController } from '../../controllers/dashboard.controller';

const resolvers = {
  Query: {
    dashboardDevices: getDevicesController,
    ramUsage: getRamUsageByIdDeviceController,
    cpuTemperature: getCpuTemperatureByIdDeviceController
  }
};

export default resolvers