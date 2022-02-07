import { signIn, signUp } from '@graphql/resolvers/auth';
import { getUsers, getUser, deleteUser, updateUser } from '@graphql/resolvers/user';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getList, createList } from './resolvers/list';
import { getMovie, getMovies, getMovieRandom, createMovie, updateMovie, deleteMovie } from './resolvers/movie';

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getUsers, getUser },
});

const mutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    signIn,
    signUp,
    updateUser,
    deleteUser,
    getMovie,
    getMovieRandom,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    getList,
    createList,
  },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema;
