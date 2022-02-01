import { GraphQLString } from "graphql";

export interface IUser {
  username: string;
  email: string;
  password: string;
  image: string;
  role: string;
}

export interface IUserArgs {
  username: typeof GraphQLString;
  email: typeof GraphQLString;
  password: typeof GraphQLString;
  image: typeof GraphQLString;
  role: typeof GraphQLString;
}
