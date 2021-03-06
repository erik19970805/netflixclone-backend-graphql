import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IApolloServerContext } from '@interfaces/IApolloServerContext';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import prisma from '@src/client';
import { tokens } from '@src/config/env';
import { User } from '@prisma/client';
import { UserInputError } from 'apollo-server';
import { GqlSignIn, GqlSignUp } from '@graphql/types/GqlAuth';
import { userFields } from '@graphql/types/GqlUser';

const { email: emailField, username: usernameField } = userFields;
const passwordField = { type: new GraphQLNonNull(GraphQLString), description: 'password of the user' };

export const signIn: GraphQLFieldConfig<unknown, IApolloServerContext, User> = {
  type: GqlSignIn,
  args: {
    email: emailField,
    password: passwordField,
  },
  resolve: async (_, args) => {
    const { email } = args;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UserInputError('Wrong email or password!');
    const isMatch = await bcrypt.compare(args.password, user.password);
    if (!isMatch) throw new UserInputError('Wrong email or password!');
    const accessToken = jwt.sign({ id: user.id }, tokens.accessToken, { expiresIn: '5d' });
    return { accessToken };
  },
};

export const signUp: GraphQLFieldConfig<unknown, IApolloServerContext, User> = {
  type: GqlSignUp,
  args: {
    username: usernameField,
    email: emailField,
    password: passwordField,
  },
  resolve: async (_, args) => {
    const { username, email, password: reqPassword } = args;
    const hashPassword = await bcrypt.hash(reqPassword, 12);
    return prisma.user.create({ data: { username, email, password: hashPassword } });
  },
};
