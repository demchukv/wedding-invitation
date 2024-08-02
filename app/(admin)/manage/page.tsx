"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@prisma/client";

const ManagePage = () => {
  const user = useCurrentUser();
  // console.log(JSON.stringify(user, null, 2));
  if (user?.role !== UserRole.ADMIN) {
    return <div className=" text-3xl text-white">Unauthorized!</div>;
  }

  return <div>Manage Page {JSON.stringify(user, null, 2)}</div>;
};

export default ManagePage;
