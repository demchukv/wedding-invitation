"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

import {
  PaginationState,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

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
      // for ignored fields
      continue;
    } else if (
      id === "emailVerified" ||
      id === "createdAt" ||
      id === "updatedAt"
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
