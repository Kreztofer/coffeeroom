import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export default async function getFeedPosts() {
  try {
    const feeds = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!feeds) {
      return null;
    }

    const safePosts = feeds.map((post) => ({
      ...post,
      id: post.id.toString(),
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return safePosts;
  } catch (error) {
    return null;
  }
}
