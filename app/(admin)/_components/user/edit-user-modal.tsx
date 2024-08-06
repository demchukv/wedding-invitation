import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BeatLoader } from "react-spinners";
import { useTransition, useState, useEffect } from "react";
import { getUserById } from "@/data/user";
import { UserTypes } from "@/types/users";
import { EditUserForm } from "@/app/(admin)/_components/user/edit-user-form";
import { FormError } from "@/components/form-error";

interface EditUserFormProps {
  userId: string;
}
export const EditUserModal = ({ userId }: EditUserFormProps) => {
  const [user, setUser] = useState<UserTypes | null>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const getUserData = async (userId: string) => {
    startTransition(() => {
      getUserById(userId).then(res => {
        if (res) {
          setUser(res);
        } else {
          setError("Something went wrong! Try again later.");
        }
      });
    });
  };

  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>{user?.name}</DialogTitle>
        <DialogDescription>Edit user information</DialogDescription>
      </DialogHeader>

      <div className="mt-2 min-w-[400px]">
        {isPending && <BeatLoader />}
        {!isPending && user && <EditUserForm user={user} />}
        <FormError message={error} />
      </div>
    </>
  );
};
