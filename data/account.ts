"use server";

import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });
    return account;
  } catch {
    return null;
  }
};

export const getAllAccountsByUserId = async (userId: string) => {
  try {
    const accounts = await db.account.findMany({
      select: {
        userId: true,
        type: true,
        provider: true,
        providerAccountId: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        userId,
      },
    });
    const user = await db.user.findUnique({
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
      where: {
        id: userId,
      },
    });
    return { success: true, accounts: accounts, user: user };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong! " + error };
  }
};
