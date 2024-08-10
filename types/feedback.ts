import { FeedbackState } from "@prisma/client";

export type FeedbackType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  userId: string | null;
  state: FeedbackState;
  message: string;
  createdAt: Date;
};
