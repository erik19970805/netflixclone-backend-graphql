import { signIn, signUp } from '@mutation/auth';
import { users } from '@query/user';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { users },
});

const mutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: { signIn, signUp },
});

const schema1: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema1;
