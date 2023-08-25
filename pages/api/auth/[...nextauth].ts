import { connectMongoDB } from '@/app/libs/mongodb';
import User from '@/models/user';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectMongoDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
          const user = await User.findOne({ email: credentials?.email });

          if (!user || !user?.password) {
            throw new Error('Invalid credentials');
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }

          return user;
        } catch (error) {
          throw new Error('Something went wrong');
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
