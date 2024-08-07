"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const deleteInvitation = async (userId: string, inviteId: string) => {
  const userRole = await currentRole();
  if (!userRole || userRole !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }
  if (!userId || !inviteId) {
    return { error: "Missing userId or inviteId" };
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return { error: "User not found" };
  }
  const invite = await db.invite.findFirst({
    where: {
      id: inviteId,
    },
  });

  if (!invite) {
    return { error: "Invitation not found" };
  }

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      invites: {
        delete: {
          id: inviteId,
        },
      },
    },
  });
  return { success: "Invitation deleted!" };
};
