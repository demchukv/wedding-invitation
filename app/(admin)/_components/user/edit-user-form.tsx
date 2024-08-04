import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface EditUserFormProps {
  userId: string;
}
export const EditUserForm = ({ userId }: EditUserFormProps) => {
  return (
    <>
      <DialogTitle>Edit User</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        FORM - {userId}
      </div>
    </>
  );
};
