"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const deleteAccount = async (
  userId: string,
  providerAccountId: string
) => {
  const userRole = await currentRole();
  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

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
