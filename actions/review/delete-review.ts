"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const deleteReview = async (id: string) => {
  const userRole = await currentRole();
  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  if (!id) {
    return { error: "Missing id" };
  }

  const review = await db.review.findUnique({
    where: {
      id: id,
    },
  });
  if (!review) {
    return { error: "User not found!" };
  }

  await db.review.delete({
    where: {
      id: id,
    },
  });
  return { success: "Review has been deleted!" };
};
