import config from "./config"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import schema from "./schema"

const server = new ApolloServer(schema);

async function runServer() {
    await server.start()

    const app = express()
    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server),
      );
    
    app.listen(config.api.port, "0.0.0.0", () => {
        console.log(`Server is running on ${config.api.port}`)
    })
    
}

runServer()