import { NextResponse } from 'next/server';
import { createUser } from '@/queries/users';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/dbConnect';
import User, { IUser } from '@/app/models/User';

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  await dbConnect();

  // check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse('User already exists', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      verify: true,
    } as IUser);
  } catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }

  console.log(name, email, password);

  return new NextResponse('User created', { status: 201 });
};
