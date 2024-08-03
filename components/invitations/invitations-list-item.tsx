import Link from "next/link";
import { InvitationType } from "@/types/invitation";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const InvitationsListItem = ({
  invitation,
}: {
  invitation: InvitationType;
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
      <Link href={`/invitations/${invitation.id}`}>
        {invitation.nameOne} + {invitation.nameTwo}
      </Link>
      <div className="flex gap-2">
        <Button variant="default" size="sm">
          <Link href={`/invitations/${invitation.id}`}>
            <CiEdit />
          </Link>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            alert("make delete");
          }}
        >
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
};

export default InvitationsListItem;
