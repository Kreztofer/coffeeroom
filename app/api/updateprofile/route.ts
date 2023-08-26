import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function PUT(req: Request) {
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

    if (profileImage !== '') {
      const newUserData = {
        name,
        email,
        occupation,
        location,
        socialId,
        profileImage: profileImage,
        twitter: twitter,
        instagram: instagram,
        dribbble: dribbble,
        linkedin: linkedin,
      };

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...newUserData,
        },
      });

      const hasPost = await prisma.post.findFirst({
        where: {
          userId: id,
        },
      });

      const newPostData = {
        name: name,
        occupation: occupation,
        location: location,
        creatorsImage: profileImage,
      };

      if (hasPost) {
        await prisma.post.updateMany({
          where: {
            userId: id,
          },
          data: {
            ...newPostData,
          },
        });
      }
      return NextResponse.json({ message: 'User updated' }, { status: 201 });
    } else {
      const newUserData = {
        name,
        email,
        occupation,
        location,
        socialId,
        twitter: twitter,
        instagram: instagram,
        dribbble: dribbble,
        linkedin: linkedin,
      };

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...newUserData,
        },
      });

      const hasPost = await prisma.post.findFirst({
        where: {
          userId: id,
        },
      });

      const newPostData = {
        name: name,
        occupation: occupation,
        location: location,
        creatorsImage: profileImage,
      };

      if (hasPost) {
        await prisma.post.updateMany({
          where: {
            userId: id,
          },
          data: {
            ...newPostData,
          },
        });
      }
      return NextResponse.json({ message: 'User updated' }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while registering the user' },
      { status: 500 }
    );
  }
}
