"use server";

import { db } from "@/lib/db";

export const deleteInvitation = async (userId: string, inviteId: string) => {
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
