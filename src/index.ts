import schema1 from "@graphql/schema";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

dotenv.config();

const startServer = () => {
  const server = new ApolloServer({ schema: schema1 });
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

startServer();
