import deviceTypes from "./types/devices.types"
import deviceResolvers from "./resolvers/devices.resolver"
import deviceSettingsTypes from "./types/device-settings.types"
import deviceSettingsResolver from "./resolvers/device-settings.resolver"

export default {
  typeDefs: [deviceTypes, deviceSettingsTypes],
  resolvers: [deviceResolvers, deviceSettingsResolver]
}