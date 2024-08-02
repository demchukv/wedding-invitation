"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { InviteCreateSchema } from "@/schemas";

export const createInvitation = async (
  values: z.infer<typeof InviteCreateSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = InviteCreateSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { nameOne, nameTwo, endDate } = validateFields.data;

  try {
    // await db.invitation.create({

    // });
    console.log(values);
  } catch (error) {
    throw error;
  }
};
