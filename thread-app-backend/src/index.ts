import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PrismaClients } from "./lib/db";

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
    type Mutation {
      createUser(firstName:String!, lastName:String!, email:String!, password:String! ):Boolean
    }
    `, // Schema
    resolvers: {
      Query: {
        hello: () => `Hey there , I am a graphQl server`,
        say: (_, { name }: { name: String }) => `Hey ${name}, How are you`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            firstName,
            lastName,
            email,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          }
        ) => {
          await PrismaClients.user.create({
            data: {
              email,
              firstName,
              lastName,
              password,
              salt: "random Salt",
            },
          });
          return true;
        },
      },
    }, // resolvers
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: " Server is Up and Running" });
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`🚀 Server ready at ${PORT}`));
}

init();
