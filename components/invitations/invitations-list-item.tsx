import Link from "next/link";
import { InvitationType } from "@/types/invitation";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const InvitationsListItem = ({
  invitation,
  onDelete,
}: {
  invitation: InvitationType;
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
      <Link href={`/invitations/${invitation.id}`}>
        <p>
          {invitation.nameOne} + {invitation.nameTwo}
        </p>
        <p>Event date: {new Date(invitation.endDate).toLocaleDateString()}</p>
      </Link>
      <div className="flex gap-2">
        <Button variant="custom" size="sm" title="Go to edit invitation">
          <Link href={`/invitations/${invitation.id}`}>
            <CiEdit />
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          title="Delete invitation and all related data"
          onClick={() => onDelete(invitation.id)}
        >
          <MdDeleteOutline />
        </Button>
      </div>
    </div>
  );
};

export default InvitationsListItem;
