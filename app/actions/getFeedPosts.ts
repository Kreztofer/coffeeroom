import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getFeedPosts() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const feeds = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return feeds;
  } catch (error) {
    return null;
  }
}
