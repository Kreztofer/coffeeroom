import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectMongoDB } from '../libs/mongodb';
import User from '@/models/user';

export async function getSession() {
  return await getServerSession(authOptions);
}
export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    await connectMongoDB();

    const myCurrentUser = await User.findOne({
      email: session.user.email,
    });

    if (!myCurrentUser) {
      return null;
    }
    const currentUser = { ...myCurrentUser };
    Reflect.deleteProperty(currentUser._doc, 'password');
    const newUser = currentUser._doc;
    return {
      ...newUser,
      _id: newUser._id.toString(),
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
