import { GqlMovie, movieFields, movieIdField, movieTitleField } from '@graphql/types/GqlMovie';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { Movie } from '@prisma/client';
import prisma from '@src/client';
import { AuthenticationError } from 'apollo-server';
import { GraphQLFieldConfig, GraphQLList } from 'graphql';

export const getMovie: GraphQLFieldConfig<unknown, IApolloServerContext, { id: string }> = {
  type: GqlMovie,
  args: { id: movieIdField },
  resolve: async (_, { id }, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    return prisma.movie.findUnique({ where: { id } });
  },
};

export const getMovies: GraphQLFieldConfig<unknown, IApolloServerContext> = {
  type: new GraphQLList(GqlMovie),
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    return prisma.movie.findMany();
  },
};

export const getMovieRandom: GraphQLFieldConfig<unknown, IApolloServerContext, { isSeries: boolean }> = {
  type: GqlMovie,
  args: { isSeries: movieFields.isSeries },
  resolve: async (_, { isSeries }, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    const moviesCount = await prisma.movie.count();
    const skip = Math.floor(Math.random() * moviesCount);
    return prisma.movie.findFirst({ where: { isSeries }, take: 1, skip });
  },
};

export const createMovie: GraphQLFieldConfig<unknown, IApolloServerContext, Movie> = {
  type: GqlMovie,
  args: movieFields,
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    if (currentUser.role !== 'admin') throw new AuthenticationError('You are not authorized');
    return prisma.movie.create({ data: args });
  },
};

export const updateMovie: GraphQLFieldConfig<unknown, IApolloServerContext, Movie> = {
  type: GqlMovie,
  args: { id: movieIdField, ...movieFields, title: movieTitleField },
  resolve: async (_, args, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    if (currentUser.role !== 'admin') throw new AuthenticationError('You are not authorized');
    return prisma.movie.update({ where: { id: args.id }, data: args });
  },
};

export const deleteMovie: GraphQLFieldConfig<unknown, IApolloServerContext, { id: string }> = {
  type: GqlMovie,
  args: { id: movieIdField },
  resolve: async (_, { id }, context) => {
    const { currentUser } = context;
    if (!currentUser) throw new AuthenticationError('Not authenticated');
    if (currentUser.role !== 'admin') throw new AuthenticationError('You are not authorized');
    return prisma.movie.delete({ where: { id } });
  },
};
