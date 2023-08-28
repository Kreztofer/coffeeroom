import prisma from '@/app/libs/prismadb';

interface IParams {
  userId?: string;
}

export default async function getUsersFriends(params: IParams) {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user && user.friends) {
      const friends = await Promise.all(
        user.friends.map((userId: any) =>
          prisma.user.findUnique({
            where: {
              id: userId,
            },
          })
        )
      );

      const formattedFriends = friends.map((friend) => ({
        id: friend?.id || '',
        name: friend?.name || '',
        profileImage: friend?.profileImage || '',
        occupation: friend?.occupation || '',
      }));
      return formattedFriends;
    }
  } catch (error) {}
}
