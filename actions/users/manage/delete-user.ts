"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const deleteUser = async (userId: string) => {
  const userRole = await currentRole();
  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  if (!userId) {
    return { error: "Missing userId" };
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return { error: "User not found!" };
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  });
  return { success: "User and all related data deleted!" };
};
