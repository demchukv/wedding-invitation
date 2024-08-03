"use client";

import InvitationsListItem from "@/components/invitations/invitations-list-item";

// type Invitation = {
//   id: string;
//   userId: string;
//   nameOne: string;
//   nameTwo: string;
//   endDate: Date;
//   createdAt: Date;
//   updatedAt: Date;
// };
// type InvitationList = {
//   invitations: Invitation[];
// };

export const InvitationsList = ({
  invitations,
}: {
 
}) => {
  return (
    <>
      <h1 className="text-3xl text-white drop-shadow-md">Invitations</h1>
      <div>
        {invitations && invitations.length > 0 ? (
          <ul>
            {invitations.map(invitation => (
              <li key={invitation.id}>
                <InvitationsListItem invitation={invitation} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No invitations found.</p>
        )}
      </div>
    </>
  );
};
