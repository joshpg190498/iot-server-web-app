import deviceTypes from "./types/device.types"
import deviceResolvers from "./resolvers/device.resolver"
import deviceSettingsTypes from "./types/device-settings.types"
import deviceSettingsResolver from "./resolvers/device-settings.resolver"
import userTypes from "./types/user.type"
import userResolvers from "./resolvers/user.resolver"
import authTypes from "./types/auth.types"
import authResolvers from "./resolvers/auth.resolver"

export default {
  typeDefs: [deviceTypes, deviceSettingsTypes, userTypes, authTypes],
  resolvers: [deviceResolvers, deviceSettingsResolver, userResolvers, authResolvers]
}