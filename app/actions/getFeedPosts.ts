import prisma from '@/app/libs/prismadb';

export default async function getFeedPosts() {
  try {
    const feeds = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!feeds) {
      return [];
    } else {
      return feeds;
    }
  } catch (error) {
    return null;
  }
}
