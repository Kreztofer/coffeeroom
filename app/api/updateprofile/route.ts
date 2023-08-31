import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function PUT(req: NextRequest) {
  try {
    const {
      name,
      email,
      id,
      profileImage,
      occupation,
      location,
      socialId,
      linkedin,
      twitter,
      dribbble,
      instagram,
    } = await req.json();

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        occupation,
        location,
        socialId,
        profileImage,
        linkedin,
        twitter,
        dribbble,
        instagram,
      },
    });

    const hasPost = await prisma.post.findFirst({
      where: {
        userId: id,
      },
    });

    if (hasPost) {
      await prisma.post.updateMany({
        where: {
          userId: id,
        },
        data: {
          name: name,
          occupation: occupation,
          location: location,
          creatorsProfileImage: profileImage,
        },
      });
    }
    return NextResponse.json({ message: 'User updated' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while updating profile' },
      { status: 500 }
    );
  }
}
