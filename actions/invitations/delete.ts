"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const deleteInvitation = async (id: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }
  try {
    await db.invite.delete({
      where: {
        id,
      },
    });

    return { success: "Invitation deleted!" };
  } catch (error) {
    return { error: "Failed to delete invitation: " + error };
  }
};
