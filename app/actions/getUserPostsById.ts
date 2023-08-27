import prisma from '@/app/libs/prismadb';

interface IParams {
  profileId?: string;
}

export default async function getUserPostsById(params: IParams) {
  try {
    const { profileId } = params;

    const posts = await prisma.post.findMany({
      where: {
        userId: profileId,
      },
    });

    return posts;
  } catch (error: any) {
    return null;
  }
}
