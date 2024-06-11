import { getDeviceReadingSettingsByIdDeviceController, getDeviceReadingSettingsController, updateDeviceReadingSettingsController } from "../../controllers/device-settings.controller";

const resolvers = {
  Query: {
    deviceReadingSettings: getDeviceReadingSettingsController,
    deviceReadingSettingsByIdDevice: getDeviceReadingSettingsByIdDeviceController
  },
  Mutation: {
    updateDeviceReadingSettings: updateDeviceReadingSettingsController
  },
};

export default resolvers
