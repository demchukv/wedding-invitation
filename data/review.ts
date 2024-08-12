'use server'

import { db } from "@/lib/db"

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