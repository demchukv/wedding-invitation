"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const checkedFeedback = async (feedbackId: string) => {
  const userRole = await currentRole();

  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  await db.feedback.update({
    where: {
      id: feedbackId,
    },
    data: {
      state: "CHECKED",
    },
  });

  return { success: "Feedback checked!" };
};
