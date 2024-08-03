import Link from "next/link";

import { Button } from "@/components/ui/button";
import { InvitationsList } from "@/components/invitations/invitations-list";

import { getUserInvitationsList } from "@/data/user-invitations";
import { currentUser } from "@/lib/auth";
import { InvitationListSkeleton } from "@/components/invitations/invitation-list-skeleton";
import { Suspense } from "react";

const InvitationsPage = async () => {
  const user = await currentUser();
  const invitations = await getUserInvitationsList(user?.id as string);

  return (
    <div>
      <div className="mb-4">
        <Button variant="default" className="w-full">
          <Link href="/invitations/create">CREATE INVITATION</Link>
        </Button>
      </div>
      <Suspense fallback={<InvitationListSkeleton />}>
        {Array.isArray(invitations) && invitations.length > 0 && (
          <InvitationsList invitations={invitations} />
        )}
        {Array.isArray(invitations) && invitations.length === 0 && (
          <h2>No invitations found.</h2>
        )}
      </Suspense>
    </div>
  );
};

export default InvitationsPage;
