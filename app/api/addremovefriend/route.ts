import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function PATCH(req: Request) {
  try {
    const { userId, friendId } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });

    let updatedUserFriends = [...(user?.friends || [])];
    let updatedFriends = [...(friend?.friends || [])];

    updatedUserFriends.push(friendId);
    updatedFriends.push(userId);

    if (user?.friends.includes(friendId)) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          friends: user?.friends
            ? user.friends.filter((userId: any) => userId !== friendId)
            : [],
        },
      });
      await prisma.user.update({
        where: { id: friendId },
        data: {
          friends: friend?.friends
            ? friend.friends.filter((id: any) => id !== userId)
            : [],
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          friends: updatedUserFriends,
        },
      });

      await prisma.user.update({
        where: {
          id: friendId,
        },
        data: {
          friends: updatedFriends,
        },
      });
    }

    return NextResponse.json(
      { message: 'Friend list updated' },
      { status: 201 }
    );
  } catch (error: any) {
    return null;
  }
}
