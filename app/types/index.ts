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
  id: string;
  name: string;
  profileImage: string;
  occupation: string;
};
