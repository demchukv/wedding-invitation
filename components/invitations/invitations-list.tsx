"use client";

import { deleteInvitation } from "@/actions/invitations/delete";
import { useTransition } from "react";
import InvitationsListItem from "@/components/invitations/invitations-list-item";
import { InvitationType } from "@/types/invitation";
import CardWrapper from "@/components/auth/card-wrapper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const InvitationsList = ({
  invitations,
}: {
  invitations: InvitationType[];
}) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteInvitation(id)
        .then(data => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
            router.refresh();
          }
        })
        .catch(error => toast.error("Something went wrong! " + error));
    });
  };

  return (
    <>
      <ul className="grid grid-cols-2 gap-4">
        {invitations.map(invitation => (
          <li key={invitation.id}>
            <InvitationsListItem
              invitation={invitation}
              onDelete={onDelete}
              isPending={isPending}
            />
          </li>
        ))}
      </ul>
    </>
  );
};
