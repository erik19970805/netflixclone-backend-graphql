import { GqlList, listContentField, listFields } from '@graphql/types/GqlList';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { List, Movie } from '@prisma/client';
import prisma from '@src/client';
import { AuthenticationError } from 'apollo-server';
import { GraphQLFieldConfig, GraphQLList } from 'graphql';

export const getList: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  type: new GraphQLList(GqlList),
  resolve: async (_, arg, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    return prisma.list.findMany({ include: { content: true } });
  },
};

export const createList: GraphQLFieldConfig<unknown, IApolloServerContext, List & { content: Movie[] }> = {
  type: GqlList,
  args: { ...listFields, content: listContentField },
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    if (currentUser.role !== 'admin') throw new AuthenticationError('You are not authorized');
    return prisma.list.create({
      data: {
        ...args,
        content: {
          connect: args.content,
        },
      },
      include: {
        content: true,
      },
    });
  },
};
