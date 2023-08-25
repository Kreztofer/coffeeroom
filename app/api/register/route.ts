import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectMongoDB } from '@/app/libs/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    await connectMongoDB();
    let user = await User.findOne({ email });
    if (user)
      return NextResponse.json(
        { message: 'User already Registered' },
        { status: 401 }
      );

    const viewedProfile = Math.floor(Math.random() * 10000);
    const impressions = Math.floor(Math.random() * 10000);
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      viewedProfile,
      impressions,
    });

    return NextResponse.json({ message: 'User Registered' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occured while registering the user' },
      { status: 500 }
    );
  }
}
