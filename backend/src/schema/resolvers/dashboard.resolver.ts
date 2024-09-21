import { getCpuTemperatureByIdDeviceController, getCpuUsageByIdDeviceController, getDevicesController, getDiskUsageByIdDeviceController, getLoadAverageByIdDeviceController, getRamUsageByIdDeviceController } from '../../controllers/dashboard.controller';

const resolvers = {
  Query: {
    dashboardDevices: getDevicesController,
    ramUsage: getRamUsageByIdDeviceController,
    cpuTemperature: getCpuTemperatureByIdDeviceController,
    cpuUsage: getCpuUsageByIdDeviceController,
    diskUsage: getDiskUsageByIdDeviceController,
    loadAverage: getLoadAverageByIdDeviceController
  }
};

export default resolvers