import config from "./config"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import schema from "./schema"
import buildContext from "./middlewares/context"


const setHttpPlugin = {
    async requestDidStart() {
      return {
        async willSendResponse(requestContext: any) {
            console.log(requestContext)
          /* response.http.headers.set('custom-header', 'hello'); */
          /* if (response.body.kind === 'single' &&
              response.body.singleResult.errors?.[0]?.extensions?.code === 'TEAPOT') {
            response.http.status = 418;
          } */
        },
      };
    },
  }

const server = new ApolloServer({
    resolvers: schema.resolvers,
    typeDefs: schema.typeDefs,
    plugins: [setHttpPlugin]
})

async function runServer() {
    await server.start()

    const app = express()
    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => buildContext({ req })
        }),
      );
    
    app.listen(config.api.port, "0.0.0.0", () => {
        console.log(`Server is running on ${config.api.port}`)
    })
    
}

runServer()