import { getDeviceReadingSettingsByIdDeviceController, getDeviceReadingSettingsController, updateDeviceReadingSettingsController } from "../../controllers/device-reading-setting.controller";

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
