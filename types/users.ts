import { UserRole } from "@prisma/client";

export type UserTypes = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
