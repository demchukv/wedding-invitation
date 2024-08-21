"use server";

import { Prisma } from "@prisma/client";
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
      for (const widget of widgets) {
        await db.inviteWidget.create({
          data: {
            id: widget.id,
            inviteId: widget.inviteId,
            widgetId: widget.widgetId,
            order: widget.order,
            name: widget.name,
            displayName: widget.displayName,
            file: widget.file,
            version: widget.version,
            description: widget.description,
            widgetData: widget.widgetData as Prisma.JsonObject,
          },
        });
      }
    }
    return { success: "Invitation saved!" };
  } catch (error) {
    return { error: "Failed to update invitation: " + error };
  }
};
