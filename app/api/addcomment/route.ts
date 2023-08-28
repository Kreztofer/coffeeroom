import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function PATCH(req: any) {
  try {
    const { comment, commentPic, postId, name, id } = await req.json();

    await prisma.post.update({
      where: { id: postId },
      data: {
        comments: {
          push: {
            comment: comment,
            commentPic: commentPic,
            name: name,
            userId: id,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Friend list updated' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: 'An error occured' }, { status: 500 });
  }
}
