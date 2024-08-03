import Link from "next/link";

import { Button } from "@/components/ui/button";
import { InvitationsList } from "@/components/invitations/invitations-list";

import { getUserInvitationsList } from "@/data/user-invitations";
import { currentUser } from "@/lib/auth";
import { Suspense } from "react";

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

const InvitationsPage = async () => {
  const user = await currentUser();
  const invitations = await getUserInvitationsList(user?.id as string);
  console.log(invitations);
  return (
    <div>
      <div className="mb-4">
        <Button variant="outline">
          <Link href="/invitations/create">CREATE INVITATION</Link>
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <InvitationsList invitations={invitations} />
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
