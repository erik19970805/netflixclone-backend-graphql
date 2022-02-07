import { GqlUser, userFields, userFieldsUpdate } from '@graphql/types/GqlUser';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { User } from '@prisma/client';
import prisma from '@src/client';
import { AuthenticationError } from 'apollo-server';
import { GraphQLFieldConfig, GraphQLList } from 'graphql';

export const getUsers: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  type: new GraphQLList(GqlUser),
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    if (currentUser.role !== 'admin') throw new AuthenticationError('You are not authorized');
    return prisma.user.findMany();
  },
};

export const getUser: GraphQLFieldConfig<unknown, IApolloServerContext, { id: string }> = {
  type: GqlUser,
  args: { id: userFields.id },
  resolve: async (_, { id }) => prisma.user.findUnique({ where: { id } }),
};

export const updateUser: GraphQLFieldConfig<unknown, IApolloServerContext, User> = {
  type: GqlUser,
  args: userFieldsUpdate,
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    return prisma.user.update({ where: { id: currentUser.id }, data: args });
  },
};

export const deleteUser: GraphQLFieldConfig<unknown, IApolloServerContext, User> = {
  type: GqlUser,
  args: { id: userFields.id },
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    return prisma.user.delete({ where: { id: currentUser.id } });
  },
};
