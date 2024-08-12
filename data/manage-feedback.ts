"use server";

import { db } from "@/lib/db";

import { PaginationState } from "@/app/(admin)/_components/data-table";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export const getManageFeedbackList = async (
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
    } else if (id === "createdAt") {
      // for date objects
      const dateObj = value as Date;
      const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
      const date = ("0" + dateObj.getDate()).slice(-2);
      const year = dateObj.getFullYear();
      const offset = -dateObj.getTimezoneOffset() / 60;
      const dateString = year + "/" + month + "/" + date;
      const minDate = new Date(dateString + " 00:00:00.0" + offset);
      const maxDate = new Date(dateString + " 23:59:59.0" + offset);
      minDate.setTime(minDate.getTime() + offset * 60 * 60 * 1000);
      maxDate.setTime(maxDate.getTime() + offset * 60 * 60 * 1000);

      Object.assign(filtersQuery, {
        [id]: { gte: minDate, lte: maxDate },
      });
    } else {
      // for string
      Object.assign(filtersQuery, {
        [id]: { contains: value, mode: "insensitive" },
      });
    }
  }

  try {
    const feedbacks = await db.feedback.findMany({
      where: {
        ...filtersQuery,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        userId: true,
        message: true,
        state: true,
        createdAt: true,
      },
      orderBy: sortingQuery,
      take: pagination.pageSize || 10,
      skip: pagination.pageIndex * pagination.pageSize || 0,
    });

    const feedbackCount = await db.feedback.count({
      where: {
        ...filtersQuery,
      },
    });

    return {
      data: feedbacks,
      rowCount: feedbackCount,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to get feedbacks: " + error };
  }
};
