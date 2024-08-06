"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

import {
  PaginationState,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { formatDate } from "date-fns";
import { equal } from "assert";

export const getManageUserList = async (
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
    if (id === "role") {
      // for enums
      Object.assign(filtersQuery, {
        [id]: { equals: value },
      });
    } else if (id === "image") {
      // for custom algoritms
      Object.assign(filtersQuery, {
        [id]: value === "false" ? { equals: null } : { not: null },
      });
    } else if (
      id === "emailVerified" ||
      id === "createdAt" ||
      id === "updatedAt"
    ) {
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
    const userCount = await db.user.count();
    const users = await db.user.findMany({
      where: { ...filtersQuery },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: pagination.pageIndex * pagination.pageSize || 0,
      take: pagination.pageSize || 10,
      orderBy: sortingQuery,
    });
    return { data: users, rowCount: userCount, success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! " + error };
  }
};

export const getUsersStatistics = async () => {
  try {
    const totalAdminsCount = await db.user.count({
      where: { role: UserRole.ADMIN },
    });
    const totalUsersCount = await db.user.count({
      where: { role: UserRole.USER },
    });
    return {
      totalAdminsCount: totalAdminsCount,
      totalUsersCount: totalUsersCount,
      success: true,
    };
  } catch (error) {
    return { error: "Something went wrong! " + error };
  }
};
