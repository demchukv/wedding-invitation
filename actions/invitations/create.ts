"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { InviteCreateSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const createInvitation = async (
  values: z.infer<typeof InviteCreateSchema>
) => {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    return { error: "Unauthorized" };
  }
  values.userId = user.id;
  const validateFields = InviteCreateSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { userId, nameOne, nameTwo, endDate } = validateFields.data;

  try {
    const res = await db.invite.create({
      data: {
        userId,
        nameOne,
        nameTwo,
        endDate,
      },
    });

    console.log(res);

    return { success: "Invitation created!", id: res.id };
  } catch (error) {
    throw error;
  }
};
