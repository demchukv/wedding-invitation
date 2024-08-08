'use server'

import { db } from "@/lib/db";

import { PaginationState } from "@/app/(admin)/_components/data-table";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export const getManageReviewList = async (
    pagination: PaginationState,
    sorting: SortingState,
    filters: ColumnFiltersState
  ) => {
    const role = await currentRole();
  
    if (role !== UserRole.ADMIN) {
      return { error: "Forbidden!" };
    }
  
    const sortingQuery = {};
    for (const { id, desc } of sorting) {
      Object.assign(sortingQuery, { [id]: desc ? "desc" : "asc" });
    }
    const filtersQuery = {};
    for (const { id, value } of filters) {
      if (id === "state") {
        // for enums
        Object.assign(filtersQuery, {
          [id]: { equals: value },
        });
      } else if (id === "rating") {
        Object.assign(filtersQuery, {
          [id]: Number(value) ,
        });
        // for ignored fields
        continue;
      } else if (
        id === "createdAt"
      ) {
        // for date objects
        continue;
      } else {
        // for string
        Object.assign(filtersQuery, {
          [id]: { contains: value, mode: "insensitive" },
        });
      }
    }
    console.log(filtersQuery);
  
    try {
      const reviewCount = await db.review.count();
      const reviews = await db.review.findMany({
        where: { ...filtersQuery },
        select: {
          id: true,
          userId: true,
          message: true,
          rating: true,
          createdAt: true,
          state: true,
        },
        skip: pagination.pageIndex * pagination.pageSize || 0,
        take: pagination.pageSize || 10,
        orderBy: sortingQuery,
      });
      return { data: reviews, rowCount: reviewCount, success: true };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong! " + error };
    }
  };