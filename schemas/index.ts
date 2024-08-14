import { UserRole } from "@prisma/client";
import { MdPassword } from "react-icons/md";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    data => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  )
  .refine(
    data => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  );

export const UpdateUserSchema = z.object({
  id: z.string(),
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string()),
  newPassword: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),
  emailVerified: z.optional(z.date()),
});

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(1),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(6),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const FeedbackSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is required",
    }),
  phone: z.string().regex(/^\+?3?8?0\d{2}\s?\d{3}\s?\d{4}$/, {
    message: "Invalid phone number",
  }),
  userId: z.optional(z.string()),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

export const ReviewSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required",
  }),
  userId: z.string(),
  message: z.string().min(1, {
    message: "Message is required",
  }),
  rating: z.number({
    invalid_type_error: "Rating must be a number",
  }),
});

export const UpdateReviewSchema = z.object({
  id: z.string(),
  message: z.string().min(1, {
    message: "Message is required",
  }),
  rating: z.number(),
});

export const InviteCreateSchema = z.object({
  userId: z.string().min(1),
  nameOne: z
    .string({
      message: "Name is required",
    })
    .min(2),
  nameTwo: z
    .string({
      message: "Name is required",
    })
    .min(2),
  endDate: z.date({
    message: "Date is required",
  }),
});
