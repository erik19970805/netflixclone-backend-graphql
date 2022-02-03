import { signIn, signUp } from '@graphql/resolvers/auth';
import { getUsers, getUser, deleteUser, updateUser } from '@graphql/resolvers/user';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getUsers, getUser },
});

const mutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: { signIn, signUp, updateUser, deleteUser },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema;
