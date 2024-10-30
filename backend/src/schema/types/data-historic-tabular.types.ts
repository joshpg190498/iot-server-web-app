const typeDefs = `#graphql
  scalar JSON

  type Parameter {
    id_parameter: String
    default_period: Int
    table_pointer: String
    description: String
    has_threshold: Boolean
    default_threshold_value: Float
  }

  type HistoricData {
    oneDay: [JSON]
    sevenDays: [JSON]
    oneMonth: [JSON]
    sixMonths: [JSON]
  }

  type TabularData {
    data: [JSON]
  }

  type Query {
    parameters: [Parameter]
    hourlyParameters: [Parameter]
    historicData(id_device: String!, table_pointer: String!): HistoricData
    tabularData(id_device: String!, table_pointer: String!): TabularData
  }
`

export default typeDefs