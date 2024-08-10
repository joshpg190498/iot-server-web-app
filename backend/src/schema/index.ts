import deviceTypes from "./types/device.types"
import deviceResolvers from "./resolvers/device.resolver"
import deviceSettingsTypes from "./types/device-settings.types"
import deviceSettingsResolver from "./resolvers/device-settings.resolver"
import userTypes from "./types/user.types"
import userResolvers from "./resolvers/user.resolver"
import authTypes from "./types/auth.types"
import authResolvers from "./resolvers/auth.resolver"
import dashboardTypes from "./types/dashboard.types"
import dashboardResolvers from "./resolvers/dashboard.resolver"
import roleTypes from "./types/role.types"
import roleResolvers from "./resolvers/role.resolver"

export default {
  typeDefs: [deviceTypes, deviceSettingsTypes, userTypes, authTypes, dashboardTypes, roleTypes],
  resolvers: [deviceResolvers, deviceSettingsResolver, userResolvers, authResolvers, dashboardResolvers, roleResolvers]
}