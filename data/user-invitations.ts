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
    console.log(error);
    return null;
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
    console.log(error);
    return null;
  }
};
