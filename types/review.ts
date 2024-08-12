import { ReviewState } from "@prisma/client";

export type ReviewType = {
  id: string;
  name: string;
  userId: string;
  state: ReviewState;
  rating: number;
  message: string;
  createdAt?: Date;
};
