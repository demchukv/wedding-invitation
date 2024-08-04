import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserAccountsProps {
  userId: string;
}
export const UserAccounts = ({ userId }: UserAccountsProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>User Accounts</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        FORM - {userId}
      </div>
    </>
  );
};
