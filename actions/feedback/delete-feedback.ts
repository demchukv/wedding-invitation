"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const deleteFeedback = async (feedbackId: string) => {
  const userRole = await currentRole();

  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  await db.feedback.delete({
    where: {
      id: feedbackId,
    },
  });

  return { success: "Feedback deleted!" };
};

export default deleteFeedback;
