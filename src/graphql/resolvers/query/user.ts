import { GqlUser } from '@graphql/types/GqlUser';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { IUser } from '@interfaces/IUser';
import prisma from '@src/client';
import { GraphQLFieldConfig, GraphQLList } from 'graphql';

export const users: GraphQLFieldConfig<unknown, IApolloServerContext, IUser> = {
  type: new GraphQLList(GqlUser),
  resolve: async () => prisma.user.findMany(),
};

export const nuevo = '';
