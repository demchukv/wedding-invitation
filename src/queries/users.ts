import User, { IUser } from '@/app/models/User';

export async function createUser(user: IUser) {
  try {
    await User.create(user);
  } catch (e: any) {
    throw new Error(e);
  }
}
