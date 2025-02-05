const typeDefs = `#graphql

  type ThresholdAlert {
    id: Int
    id_device: String
    id_parameter: String
    table_pointer: String
    id_reference: Int
    data: String
    email_sent: Boolean
    created_at_utc: String
  }

  type Query {
    thresholdAlertData(id_device: String!, id_parameter: String!): [ThresholdAlert]
  }
`

export default typeDefs