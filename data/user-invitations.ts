"use server";

import { db } from "@/lib/db";
import { InvitationType } from "@/types/invitation";

export const getUserInvitationsList = async (
  userId: string
): Promise<InvitationType[] | { error: string }> => {
  try {
    const userInvitations = await db.invite.findMany({
      where: {
        userId,
      },
    });
    return userInvitations;
  } catch (err) {
    return { error: "Something went wrong" + err };
  }
};

export const getUserInvitationById = async (
  id: string
): Promise<InvitationType | null> => {
  try {
    const userInvitation = await db.invite.findUnique({
      select: {
        id: true,
        userId: true,
        nameOne: true,
        nameTwo: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
        InviteWidget: {
          select: {
            id: true,
            inviteId: true,
            widgetId: true,
            widgetData: true,
            widgetOrder: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return userInvitation;
  } catch (error) {
    return null;
  }
};
