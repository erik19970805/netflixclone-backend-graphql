import { User } from '@prisma/client';

export interface IApolloServerContext {
  currentUser: User | null;
}
