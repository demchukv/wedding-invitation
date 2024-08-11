"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { InviteWidgetType } from "@/types/invitation";

export const updateInviteWidgets = async (
  inviteId: string,
  widgets: InviteWidgetType[]
) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  try {
    await db.inviteWidget.deleteMany({ where: { inviteId } });
    if (widgets.length > 0) {
      await db.inviteWidget.createMany({ data: widgets });
    }
    console.log("inviteId", inviteId, "widgets", widgets);
    return { success: "Widgets updated!" };
  } catch (error) {
    return { error: "Failed to update widgets: " + error };
  }
  //TODO: check if widgets exist or not and update them or insert them
};
