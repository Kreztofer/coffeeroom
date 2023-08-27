import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request, res: NextResponse) {
  try {
    const { userId, description, postImage, hashtag } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const newPost = await prisma.post.create({
      data: {
        userId,
        name: user?.name,
        location: user?.location,
        description,
        hashtag: hashtag,
        creatorsImage: user?.image,
        creatorsProfileImage: user?.profileImage,
        postImage: postImage,
      },
    });

    return NextResponse.json(newPost);

    // if (postImage) {
    //   const newPost = await prisma.post.create({
    //     data: {
    //       userId,
    //       name: user?.name,
    //       location: user?.location,
    //       description,
    //       hashtag: hashtag,
    //       creatorsImage: user?.image,
    //       creatorsProfileImage: user?.profileImage,
    //       postImage: postImage,
    //     },
    //   });

    //   return NextResponse.json(newPost);
    // } else {
    //   const newPost = await prisma.post.create({
    //     data: {
    //       userId,
    //       name: user?.name,
    //       location: user?.location,
    //       description,
    //       hashtag: hashtag,
    //       creatorsImage: user?.image,
    //       creatorsProfileImage: user?.profileImage,
    //     },
    //   });
    //   return NextResponse.json(newPost);
    // }
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while creating a post' },
      { status: 500 }
    );
  }
}
