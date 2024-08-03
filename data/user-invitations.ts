import { db } from "@/lib/db";

export const getUserInvitationsList = async (userId: string) => {
  try {
    const userInvitations = await db.invite.findMany({
      where: {
        userId,
      },
    });
    return userInvitations;
  } catch (error) {
    return { error: "Something went wrong" + error };
  }
};

export const getUserInvitationById = async (id: string) => {
  try {
    const userInvitation = await db.invite.findUnique({
      where: {
        id,
      },
    });
    return userInvitation;
  } catch (error) {
    return null;
  }
};
