import { WidgetType } from "@/app/(protected)/_components/widgets/widgets-list";

export type InvitationType = {
  id: string;
  userId: string;
  nameOne: string;
  nameTwo: string;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  InviteWidget?: WidgetType[];
};
