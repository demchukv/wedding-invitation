import { FeedbackState } from "@prisma/client";

export type FeedbackType = {
  id: string;
  userId: string;
  state: FeedbackState;
  message: string;
  createdAt: Date;
};
