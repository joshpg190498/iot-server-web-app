const typeDefs = `#graphql
  type Query {
    login(email: String!, password: String!): String
  }

`

export default typeDefs