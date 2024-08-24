import config from "./config"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import { WebSocketServer } from "ws"
import { useServer } from "graphql-ws/lib/use/ws"
import schema from "./schema"
import buildContext from "./middlewares/context"
import "./kafka/kafka.consumer"
import { makeExecutableSchema } from "graphql-tools"

const executableSchema = makeExecutableSchema({ typeDefs: schema.typeDefs, resolvers: schema.resolvers })

const server = new ApolloServer({ schema: executableSchema })

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
    
    const httpServer = app.listen(config.api.port, "0.0.0.0", () => {
        console.log(`Server is running on ${config.api.port}`)
    })

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/subscriptions"
    })

    useServer({ schema: executableSchema }, wsServer)

    
}

runServer()