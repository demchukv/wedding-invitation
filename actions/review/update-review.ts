"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { UpdateReviewSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { getReviewById } from "@/data/review";

export const updateReview = async (values: z.infer<typeof UpdateReviewSchema>) => {
  const user = await currentUser();
  if (user!!.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const dbReview = await getReviewById(values.id);
  if (!dbReview) {
    return { error: "Review not found" };
  }

  await db.review.update({
    where: { id: dbReview!!.id },
    data: {
      ...values,
    },
  });

  return { success: "Review updated!" };
};
