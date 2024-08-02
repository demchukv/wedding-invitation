'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { FeedbackSchema } from '@/schemas';

import { currentUser } from '@/lib/auth';

export const addFeedback = async (values: z.infer<typeof FeedbackSchema>) => {
  const user = await currentUser();

  if (user) {
    values.userId = user.id;
  }

  const validateFields = FeedbackSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields' };
  }

  const { name, email, phone, message, userId } = validateFields.data;

  await db.feedback.create({
    data: {
      name,
      email,
      phone,
      message,
      userId,
    },
  });

  return { success: 'Feedback sent!' };
};
