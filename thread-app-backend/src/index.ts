import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.port || 8000);

  // create graphQl server

  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
    hello:String
    say(name:String):String
    }
    `, // Schema
    resolvers: {
      Query: {
        hello: () => `Hey there , I am a graphQl server`,
        say: (_, { name }: { name: String }) => `Hey ${name}, How are you`,
      },
    }, // resolvers
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: " Server is Up and Running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
}

init();
