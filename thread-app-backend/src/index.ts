import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphQlServer from "./graphQl";

async function init() {
  const app = express();
  app.use(express.json());
  const PORT = Number(process.env.port || 8000);

  // create graphQl server

  app.get("/", (req, res) => {
    res.json({ message: " Server is Up and Running" });
  });

  app.use("/graphql", expressMiddleware(await createApolloGraphQlServer()));

  app.listen(PORT, () => console.log(`🚀 Server ready at ${PORT}`));
}

init();
