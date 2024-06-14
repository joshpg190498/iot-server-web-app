import { createDeviceController, getDeviceByIdController, getDevicesController, updateDeviceController, deleteDeviceController } from '../../controllers/device.controller';

const resolvers = {
  Query: {
    devices: getDevicesController,
    device: getDeviceByIdController
  },
  Mutation: {
    createDevice: createDeviceController,
    updateDevice: updateDeviceController,
    deleteDevice: deleteDeviceController 
  },
};

export default resolvers
