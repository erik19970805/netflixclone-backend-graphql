import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GqlMovie, GqlMovieInput } from './GqlMovie';

export const listIdField = {
  type: new GraphQLNonNull(GraphQLID),
  description: 'Id of the list',
};

export const listTitleField = {
  type: GraphQLString,
  description: 'Title of the list',
};

export const listContentField = { type: new GraphQLList(GqlMovieInput), description: 'Movies of the list' };

export const listFields = {
  title: { type: new GraphQLNonNull(GraphQLString), description: 'Title of the list' },
  type: { type: GraphQLString, description: 'Type of the list' },
  genre: { type: GraphQLString, description: 'Genre of the list' },
  content: { type: new GraphQLList(GqlMovie), description: 'Movies of the list' },
};

export const GqlList = new GraphQLObjectType({
  name: 'List',
  description: 'A list',
  fields: { id: listIdField, ...listFields },
});
