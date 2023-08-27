import prisma from '@/app/libs/prismadb';

export interface IParams {
  profileId?: string;
}

export default async function getUserProfileById(params: IParams) {
  try {
    const { profileId } = params;

    const userProfile = await prisma.user.findUnique({
      where: {
        id: profileId,
      },
    });

    if (!userProfile) {
      return null;
    }

    const currentUser = { ...userProfile };
    Reflect.deleteProperty(currentUser, 'password');
    const newUser = currentUser;
    return {
      ...newUser,
      id: newUser.id.toString(),
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
      emailVerified: newUser.emailVerified?.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
