"use server";

import { db } from "@/lib/db";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { PaginationState } from "@/app/(admin)/_components/data-table";

export const getManageUserList = async (pagination: PaginationState) => {
  const role = await currentRole();
  let userCount = 0;

  if (role !== UserRole.ADMIN) {
    return { error: "Forbidden!" };
  }

  try {
    userCount = await db.user.count();
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! " + error };
  }
  try {
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
      orderBy: { createdAt: "desc" },
    });
    return { data: users, rowCount: userCount, success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! " + error };
  }
};
