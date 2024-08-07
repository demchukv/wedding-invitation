"use server";

import { db } from "@/lib/db";

export const deleteAccount = async (
  userId: string,
  providerAccountId: string
) => {
  if (!userId || !providerAccountId) {
    return { error: "Missing userId or providerAccountId" };
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return { error: "User not found" };
  }
  const account = await db.account.findFirst({
    where: {
      providerAccountId,
    },
  });

  if (!account) {
    return { error: "Account not found" };
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      accounts: {
        deleteMany: {
          providerAccountId,
        },
      },
    },
  });
  return { success: "Account deleted!" };
};
