import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface UserInvitationsTypes {
  userId: string;
}
export const UserInvitations = ({ userId }: UserInvitationsTypes) => {
  return (
    <>
      <DialogTitle>User Invitations</DialogTitle>
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
