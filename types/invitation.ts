import { Prisma } from "@prisma/client";

export type InvitationType = {
  id: string;
  userId: string;
  nameOne: string;
  nameTwo: string;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  InviteWidget?: InviteWidgetType[];
};

export type InviteWidgetType = {
  id: string;
  inviteId: string;
  widgetId: string;
  order: number;
  name: string;
  displayName: string;
  file: string;
  description: string;
  version: string;
  widgetData: Prisma.InputJsonObject;
  createdAt?: Date;
  updatedAt?: Date;
};
