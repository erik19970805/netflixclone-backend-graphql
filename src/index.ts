import schema from '@graphql/schema';
import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import prisma from './client';
import { tokens } from './config/env';

dotenv.config();

const startServer = () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
        const token = auth.substring(7);
        const { id } = <{ id: string }>jwt.verify(token, tokens.accessToken);
        const currentUser = await prisma.user.findUnique({ where: { id } });
        return { currentUser };
      }
      return undefined;
    },
  });
  server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
};

startServer();
