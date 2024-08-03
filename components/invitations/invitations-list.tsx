"use client";

import InvitationsListItem from "@/components/invitations/invitations-list-item";
import { InvitationType } from "@/types/invitation";

export const InvitationsList = ({
  invitations,
}: {
  invitations: InvitationType[];
}) => {
  return (
    <>
      <h1 className="text-3xl text-white drop-shadow-md">Invitations</h1>
      <div>
        <ul>
          {invitations.map(invitation => (
            <li key={invitation.id}>
              <InvitationsListItem invitation={invitation} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
