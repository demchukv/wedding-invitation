'use server'

import { db } from "@/lib/db"
import { ReviewType } from "@/types/review";

export const getAllReviews = async (): Promise<ReviewType[] | {error:string}> => {
  try {
    const reviews = await db.review.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      }
    });
    return reviews;
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