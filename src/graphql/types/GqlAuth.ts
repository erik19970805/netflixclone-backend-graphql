import { GraphQLObjectType, GraphQLString } from 'graphql';
import { GqlUser, userFields } from './GqlUser';

export const GqlSignUp = new GraphQLObjectType({
  name: 'SignUp',
  description: 'Registration for new users',
  fields: userFields,
});

export const GqlSignIn = new GraphQLObjectType({
  name: 'SignIn',
  description: 'User login',
  fields: { user: { type: GqlUser }, accessToken: { type: GraphQLString, description: 'Access token' } },
});
