const typeDefs = `#graphql
  type DeviceReadingSetting {
    id: ID!
    id_device: String!
    parameter: String!
    period: Int!
    active: Boolean!
    threshold_value: Float
  }

  input DeviceReadingSettingInput {
    parameter: String!
    period: Int!
    active: Boolean!
    threshold_value: Float
  }

  type Query {
    deviceReadingSettings: [DeviceReadingSetting]
    deviceReadingSettingsByIdDevice(id_device: String!): [DeviceReadingSetting] 
  }

  type Mutation {
    updateDeviceReadingSettings(id_device: String!, settings: [DeviceReadingSettingInput]!): Boolean
  }
`

export default typeDefs