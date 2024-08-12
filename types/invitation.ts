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
  widgetData: JsonValue;
  createdAt?: Date;
  updatedAt?: Date;
};

export declare type JsonValue =
  | string
  | number
  | boolean
  | Prisma.InputJsonObject
  | Prisma.InputJsonArray
  | Prisma.JsonObject
  | Prisma.JsonArray
  | null
  | typeof Prisma.JsonNull;
