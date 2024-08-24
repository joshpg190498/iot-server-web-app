const typeDefs = `#graphql
  scalar JSON
  
  type NewDeviceData {
    id_device: String
    parameter: String
    data: JSON
    collected_at_utc: String
  }

  type Subscription {
    newDeviceData(id_device: String!): NewDeviceData
  }
`

export default typeDefs