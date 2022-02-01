/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { IApolloServerContext } from "@interfaces/IApolloServerContext";
import { GraphQLFieldConfig, GraphQLString } from "graphql";
import { IUser, IUserArgs } from "@interfaces/IUser";

export const signIn: GraphQLFieldConfig<unknown, IApolloServerContext, IUser> = {
  type: GraphQLString,
  args: {},
  resolve: async (_source: unknown, { username }, _context: IApolloServerContext) => {},
};
