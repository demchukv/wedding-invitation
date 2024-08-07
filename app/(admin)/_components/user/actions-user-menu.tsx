import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserTypes } from "@/types/users";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { EditUserModal } from "@/app/(admin)/_components/user/edit-user-modal";
import { UserAccounts } from "@/app/(admin)/_components/user/user-accounts";
import { UserInvitations } from "@/app/(admin)/_components/user/user-invitations";
import { UserDeleteAlert } from "@/app/(admin)/_components/user/user-delete-alert";

export const ActionsUserMenu = ({ user }: { user: UserTypes }) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (action: string) => {
    setModalType(action);
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openModal("edit")}>
            Edit user
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openModal("accounts")}>
            User accounts
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openModal("invitations")}>
            User invitations
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openModal("delete")}>
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} modal={true} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}

        {modalType === "edit" && <EditUserModal userId={user.id} />}
        {modalType === "accounts" && <UserAccounts userId={user.id} />}
        {modalType === "invitations" && <UserInvitations userId={user.id} />}
        {modalType === "delete" && (
          <UserDeleteAlert userId={user.id} setOpen={setOpen} />
        )}
      </Dialog>
    </>
  );
};
