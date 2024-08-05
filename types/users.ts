import { UserRole } from "@prisma/client";

export type UserTypes = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAccountTypes = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  createdAt: Date;
  updatedAt: Date;
};
