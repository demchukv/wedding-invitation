import { ReviewState } from "@prisma/client";

export type ReviewType = {
  id: string;
  userId: string;
  name: string;
  state: ReviewState;
  rating: number;
  message: string;
  createdAt?: Date;
};
