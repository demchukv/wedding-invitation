import Link from "next/link";

import { Button } from "@/components/ui/button";

const InvitationsPage = () => {
  return (
    <div>
      <div className="mb-4">
        <Button variant="outline">
          <Link href="/invitations/create">CREATE INVITATION</Link>
        </Button>
      </div>
      <p>Invitations Page</p>
    </div>
  );
};

export default InvitationsPage;
