import { GraphQLJSON } from 'graphql-type-json';
import { pubsub } from "../../pubsub";

const resolvers = {
  JSON: GraphQLJSON,
  Subscription: {
    newDeviceData: {
      subscribe: (_: any, { id_device }: { id_device: any }) => {
        return pubsub.asyncIterator(`NEW_${id_device}_DATA`)
      },
      resolve: (payload: any) => {
        return payload.newDeviceData
      }
    }
  }
}

export default resolvers
