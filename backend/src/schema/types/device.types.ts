const typeDefs = `#graphql
  type Device {
    id: Int
    id_device: String
    description: String
    active: Boolean
  }

  input DeviceInput {
    id_device: String!
    description: String!
    active: Boolean
  }

  type Query {
    devices: [Device]
    device(id: Int!): Device
  }

  type Mutation {
    createDevice(input: DeviceInput!): Device
    updateDevice(id: Int!, input: DeviceInput!): Device
    deleteDevice(id: Int!): Boolean
  }
`

export default typeDefs