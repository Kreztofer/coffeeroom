import { NextResponse, NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function PUT(req: NextRequest) {
  try {
    const data = await req.formData();
    const profileImage = data.get('image');
    const name: string | null | undefined =
      data.get('name') !== null ? String(data.get('name')) : null;
    const id: string | undefined =
      data.get('id') !== null ? String(data.get('id')) : undefined;
    const email: string | null | undefined =
      data.get('email') !== null ? String(data.get('email')) : null;
    const occupation: string | null | undefined =
      data.get('occupation') !== null ? String(data.get('occupation')) : null;
    const location: string | null | undefined =
      data.get('location') !== null ? String(data.get('location')) : null;
    const twitter: string | null | undefined =
      data.get('twitter') !== null ? String(data.get('twitter')) : null;
    const instagram: string | null | undefined =
      data.get('instagram') !== null ? String(data.get('instagram')) : null;
    const dribbble: string | null | undefined =
      data.get('dribbble') !== null ? String(data.get('dribbble')) : null;
    const linkedin: string | null | undefined =
      data.get('linkedin') !== null ? String(data.get('linkedin')) : null;
    const socialId: number | null | undefined =
      data.get('socialId') !== null ? Number(data.get('socialId')) : null;

    // if (!profileImage) {
    //   await prisma.user.update({
    //     where: {
    //       id: id,
    //     },
    //     data: {
    //       name,
    //       email,
    //       occupation,
    //       location,
    //       socialId,
    //       linkedin,
    //       twitter,
    //       dribbble,
    //       instagram,
    //     },
    //   });

    //   const hasPost = await prisma.post.findFirst({
    //     where: {
    //       userId: id,
    //     },
    //   });

    //   if (hasPost) {
    //     await prisma.post.updateMany({
    //       where: {
    //         userId: id,
    //       },
    //       data: {
    //         name: name,
    //         occupation: occupation,
    //         location: location,
    //       },
    //     });
    //   }
    // } else {
    //@ts-ignore
    const byteData = await profileImage.arrayBuffer();
    const buffer = Buffer.from(byteData);
    // @ts-ignore
    const path = `./public/uploads/${profileImage?.name}`;

    const imagePath = path.slice(8);

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        profileImage: imagePath,
      },
    });

    // const hasPost = await prisma.post.findFirst({
    //   where: {
    //     userId: id,
    //   },
    // });

    // if (hasPost) {
    //   await prisma.post.updateMany({
    //     where: {
    //       userId: id,
    //     },
    //     data: {
    //       name: name,
    //       occupation: occupation,
    //       location: location,
    //       creatorsProfileImage: imagePath,
    //     },
    //   });
    // }
    await writeFile(path, buffer);

    return NextResponse.json({ message: 'User updated' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while updating profile' },
      { status: 500 }
    );
  }
}
