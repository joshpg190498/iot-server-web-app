import { getCpuTemperatureByIdDeviceController, getCpuUsageByIdDeviceController, getDashboardDeviceDataRTByIdDeviceController, getDevicesController, getDiskUsageByIdDeviceController, getLoadAverageByIdDeviceController, getNetworkStatsByIdDeviceController, getRamUsageByIdDeviceController } from '../../controllers/dashboard.controller';

const resolvers = {
  Query: {
    dashboardDevices: getDevicesController,
    ramUsage: getRamUsageByIdDeviceController,
    cpuTemperature: getCpuTemperatureByIdDeviceController,
    cpuUsage: getCpuUsageByIdDeviceController,
    diskUsage: getDiskUsageByIdDeviceController,
    loadAverage: getLoadAverageByIdDeviceController,
    networkStats: getNetworkStatsByIdDeviceController,
    dashboardDeviceDataRT: getDashboardDeviceDataRTByIdDeviceController
  }
};

export default resolvers