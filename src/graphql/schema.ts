import { GraphQLObjectType, GraphQLSchema } from "graphql";

// Define QueryType
const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: {},
});

// Define MutationType
const mutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {},
});

const schema1: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

export default schema1;
