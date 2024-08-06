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
  let userCount = 0;

  const sortingQuery = {};
  for (const { id, desc } of sorting) {
    Object.assign(sortingQuery, { [id]: desc ? "desc" : "asc" });
  }

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  try {
    const userCount = await db.user.count();
    const users = await db.user.findMany({
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
