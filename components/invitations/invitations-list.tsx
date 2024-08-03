"use client";

import { deleteInvitation } from "@/actions/invitations/delete";
import { useTransition } from "react";
import InvitationsListItem from "@/components/invitations/invitations-list-item";
import { InvitationType } from "@/types/invitation";
import CardWrapper from "@/components/auth/card-wrapper";
import { toast } from "sonner";

export const InvitationsList = ({
  invitations,
}: {
  invitations: InvitationType[];
}) => {
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteInvitation(id)
        .then(data => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
          }
        })
        .catch(error => toast.error("Something went wrong! " + error));
    });
  };

  return (
    <>
      <CardWrapper
        headerTitle="Invitations"
        headerLabel="List your invitations"
        backButtonHref=""
        backButtonLabel=""
      >
        <ul className="space-y-4">
          {invitations.map(invitation => (
            <li key={invitation.id}>
              <InvitationsListItem
                invitation={invitation}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      </CardWrapper>
    </>
  );
};
