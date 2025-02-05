import deviceTypes from "./types/device.types"
import deviceResolvers from "./resolvers/device.resolver"
import deviceReadingSettingTypes from "./types/device-reading-setting.types"
import deviceReadingSettingResolver from "./resolvers/device-reading-setting.resolver"
import userTypes from "./types/user.types"
import userResolvers from "./resolvers/user.resolver"
import authTypes from "./types/auth.types"
import authResolvers from "./resolvers/auth.resolver"
import dashboardTypes from "./types/dashboard.types"
import dashboardResolvers from "./resolvers/dashboard.resolver"
import roleTypes from "./types/role.types"
import roleResolvers from "./resolvers/role.resolver"
import subscriptionTypes from "./types/subscription.types"
import subscriptionResolvers from "./resolvers/subscription.resolver"
import dataHistoricTypes from "./types/data-historic-tabular.types"
import dataHistoricResolvers from "./resolvers/data-historic-tabular.resolver"
import thresholdAlertTypes from "./types/threshold-alert.types"
import thresholdAlertResolvers from "./resolvers/threshold-alert.resolver"
import parameterTypes from "./types/parameter.types"
import parameterResolvers from "./resolvers/parameter.resolver"

export default {
  typeDefs: [
    deviceTypes, 
    deviceReadingSettingTypes, 
    userTypes, 
    authTypes, 
    dashboardTypes, 
    roleTypes, 
    subscriptionTypes,
    dataHistoricTypes,
    thresholdAlertTypes,
    parameterTypes
  ],
  resolvers: [
    deviceResolvers, 
    deviceReadingSettingResolver, 
    userResolvers, 
    authResolvers, 
    dashboardResolvers, 
    roleResolvers, 
    subscriptionResolvers,
    dataHistoricResolvers,
    thresholdAlertResolvers,
    parameterResolvers
  ]
}