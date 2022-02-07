import { GqlList, listContentField, listFields } from '@graphql/types/GqlList';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { List, Movie } from '@prisma/client';
import prisma from '@src/client';
import { GraphQLFieldConfig, GraphQLList } from 'graphql';

export const getList: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  type: new GraphQLList(GqlList),
  resolve: async () => prisma.list.findMany(),
};

export const createList: GraphQLFieldConfig<unknown, IApolloServerContext, List & { content: Movie[] }> = {
  type: GqlList,
  args: { ...listFields, content: listContentField },
  resolve: async (_, args) =>
    prisma.list.create({
      data: {
        ...args,
        content: {
          connect: [{ id: 'ckz8ngwm60016q0thl9ru0avt' }, { id: 'ckz8nem460006q0th9i07mtwu' }],
        },
      },
      include: {
        content: true,
      },
    }),
};
