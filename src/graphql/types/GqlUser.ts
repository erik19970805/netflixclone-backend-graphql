import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const userFields = {
  id: { type: new GraphQLNonNull(GraphQLID), description: 'id of the user' },
  username: { type: new GraphQLNonNull(GraphQLString), description: 'username of the user' },
  email: { type: new GraphQLNonNull(GraphQLString), description: 'email of the user' },
  image: { type: GraphQLString, description: 'image of the user' },
  role: { type: GraphQLString, description: 'role of user' },
};

export const GqlUser = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: userFields,
});
