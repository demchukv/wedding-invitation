import { deleteUser } from "@/actions/users/manage/delete-user";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

interface EditUserFormProps {
  userId: string;
  setOpen: (open: boolean) => void;
}
export const UserDeleteAlert = ({ userId, setOpen }: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const onClickDelete = async () => {
    startTransition(() => {
      deleteUser(userId).then(res => {
        if (res.success) {
          toast.success("Invitation deleted successfully");
          setOpen(false);
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete user
            account and remove user data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          Do you want to continue?
          <br />
          Click <b>Delete</b> below to proceed or click <b>Cancel</b> to go
          back.
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => onClickDelete()}
            disabled={isPending}
          >
            {isPending ? <BeatLoader /> : "Delete"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
