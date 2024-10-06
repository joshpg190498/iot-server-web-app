const typeDefs = `#graphql
  type DeviceReadingSetting {
    id: ID!
    id_device: String!
    parameter: String!
    period: Int!
    active: Boolean!
    threshold_value: Float
    has_threshold: Boolean!
    description: String!
  }

  input DeviceReadingSettingInput {
    parameter: String!
    period: Int!
    active: Boolean!
    threshold_value: Float
    description: String
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