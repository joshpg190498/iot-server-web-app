const typeDefs = `#graphql
  type Device {
    id: Int
    id_device: String
    description: String
    active: Boolean
  }

  type Query {
    devices: [Device]
    device(id: Int!): Device
  }

  type Mutation {
    createDevice(id_device: String!, description: String!): Device
    updateDevice(id: Int!, description: String!): Device
    deleteDevice(id: Int!): Boolean
  }
`

export default typeDefs