"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { UpdateUserSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const updateUser = async (values: z.infer<typeof UpdateUserSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(values.id);
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== dbUser.id) {
      return { error: "Email already exists!" };
    }
    values.emailVerified = new Date();
  }

  if (values.newPassword && values.newPassword.length > 0) {
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  console.log({ ...values });
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Settings updated!" };
};
