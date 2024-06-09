import deviceTypes from "./types/devices.types"
import deviceResolvers from "./resolvers/devices.resolver"

export default {
  typeDefs: [deviceTypes],
  resolvers: [deviceResolvers]
}