"use client";

import InvitationsListItem from "@/components/invitations/invitations-list-item";
import { InvitationType } from "@/types/invitation";
import CardWrapper from "@/components/auth/card-wrapper";

export const InvitationsList = ({
  invitations,
}: {
  invitations: InvitationType[];
}) => {
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
              <InvitationsListItem invitation={invitation} />
            </li>
          ))}
        </ul>
      </CardWrapper>
    </>
  );
};
