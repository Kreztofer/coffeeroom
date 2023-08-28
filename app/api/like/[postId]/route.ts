import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  postId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { postId } = params;

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    let updatedLikes = [...(post.likes || [])];

    updatedLikes.push(currentUser.id);

    const updated = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: updatedLikes,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.log(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid ID');
  }

  let updatedLikes = [...(post.likes || [])];

  updatedLikes = updatedLikes.filter((likes) => likes !== currentUser.id);

  const updated = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: updatedLikes,
    },
  });

  return NextResponse.json(updated);
}
