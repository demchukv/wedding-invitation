import Link from "next/link";

import { Button } from "@/components/ui/button";
import { InvitationsList } from "@/components/invitations/invitations-list";

import { getUserInvitationsList } from "@/data/user-invitations";
import { currentUser } from "@/lib/auth";
import { InvitationListSkeleton } from "@/components/invitations/invitation-list-skeleton";
import { Suspense } from "react";
import { PageTitle } from "@/components/page-title";

const InvitationsPage = async () => {
  const user = await currentUser();
  if (!user) {
    return (
      <div>
        <h1>Unauthorized!</h1>
      </div>
    );
  }
  const invitations = await getUserInvitationsList(user?.id as string);

  return (
    <>
      <PageTitle>Invitations</PageTitle>
      <div className="w-full grid gripd-cols-1 md:grid-cols-2 gap-10 md:gap-28">
        <Suspense fallback={<InvitationListSkeleton />}>
          {Array.isArray(invitations) && invitations.length > 0 && (
            <InvitationsList invitations={invitations} />
          )}
          {Array.isArray(invitations) && invitations.length === 0 && (
            <h2>You still don’t have your own invitations. Let’s start now.</h2>
          )}
        </Suspense>
        <div className="mb-4">
          <Button variant="one" size="auto" className="w-full" asChild>
            <Link href="/invitations/create">Create invitation</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InvitationsPage;
