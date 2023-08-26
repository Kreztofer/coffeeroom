import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const checkIfUserExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (checkIfUserExists) {
    return NextResponse.json(
      { message: 'User already Registered' },
      { status: 401 }
    );
  } else {
    const viewedProfile = Math.floor(Math.random() * 1000);
    const impressions = Math.floor(Math.random() * 1000);
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        viewedProfile,
        impressions,
      },
    });

    return NextResponse.json(user);
  }
}
