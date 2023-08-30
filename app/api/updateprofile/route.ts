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

    if (!name) {
      throw new Error('Missing fields');
    }

    // await prisma.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     email,
    //     occupation,
    //     location,
    //     socialId,
    //     linkedin,
    //     twitter,
    //     dribbble,
    //     instagram,
    //   },
    // });

    // const hasPost = await prisma.post.findFirst({
    //   where: {
    //     userId: id,
    //   },
    // });

    // const newPostData = {
    //   name: name,
    //   occupation: occupation,
    //   location: location,
    //   creatorsImage: profileImage,
    // };

    // if (hasPost) {
    //   await prisma.post.updateMany({
    //     where: {
    //       userId: id,
    //     },
    //     data: {
    //       ...newPostData,
    //     },
    //   });
    // }
    return NextResponse.json({ message: 'User updated' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while updating profile' },
      { status: 500 }
    );
  }
}
