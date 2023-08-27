import { Post, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null | undefined;
};

export type SafePosts = Omit<Post, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type Friends = {
  _id: string;
  name: string;
  image: string;
  occupation: string;
  location: string;
};
