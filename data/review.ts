"use server";

import { db } from "@/lib/db";
import { ReviewType } from "@/types/review";

export const getAllReviews = async (
  take: number | undefined
): Promise<{ success: boolean; data: ReviewType[] } | { error: string }> => {
  try {
    const reviews = await db.review.findMany({
      where: {
        state: "APPROVED",
      },
      take: take || 6,
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.log(error);
    return { error: "Error fetching reviews. " + error };
  }
};

export const getReviewById = async (id: string) => {
  try {
    const review = await db.review.findUnique({
      where: {
        id,
      },
    });
    return review;
  } catch {
    return null;
  }
};
