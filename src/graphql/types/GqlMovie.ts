import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const movieIdField = {
  type: new GraphQLNonNull(GraphQLID),
  description: 'Id of the movie',
};

export const movieTitleField = {
  type: GraphQLString,
  description: 'Title of the movie',
};

export const movieFields = {
  title: { type: new GraphQLNonNull(GraphQLString), description: 'Title of the movie' },
  description: { type: GraphQLString, description: 'Description of the movie' },
  image: { type: GraphQLString, description: 'Image of the movie' },
  imageTitle: { type: GraphQLString, description: 'Image title of the movie' },
  imageSmall: { type: GraphQLString, description: 'Small image of the movie' },
  trailer: { type: GraphQLString, description: 'Trailer of the movie' },
  video: { type: GraphQLString, description: 'Video of the movie' },
  year: { type: GraphQLString, description: 'Year of the movie' },
  limit: { type: GraphQLFloat, description: 'Limit of the movie' },
  genre: { type: GraphQLString, description: 'Genre of the movie' },
  isSeries: { type: GraphQLBoolean, description: 'Is the movie a series?' },
};

export const GqlMovie = new GraphQLObjectType({
  name: 'Movie',
  description: 'A movie',
  fields: { id: movieIdField, ...movieFields },
});

export const GqlMovieInput = new GraphQLInputObjectType({
  name: 'MovieInput',
  description: 'A movie',
  fields: { id: movieIdField, ...movieFields, title: movieTitleField },
});
