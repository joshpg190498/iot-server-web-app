import { createDeviceController, deleteDeviceController, getDeviceByIdController, getDevicesController, updateDeviceController } from '../../controllers/devices.controller';

const resolvers = {
  Query: {
    devices: getDevicesController,
    deviceById: getDeviceByIdController
  },
  Mutation: {
    createDevice: createDeviceController,
    updateDevice: updateDeviceController,
    deleteDevice: deleteDeviceController 
  },
};

export default resolvers
