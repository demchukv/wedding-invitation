import { db } from "@/lib/db";

export const getManageUserList = async () => {
  try {
    const userCount = await db.user.count();
  } catch (error) {
    console.log(error);
    return null;
  }
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};
