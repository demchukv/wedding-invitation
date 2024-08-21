import Link from "next/link";
import { InvitationType } from "@/types/invitation";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { PuffLoader } from "react-spinners";
const InvitationsListItem = ({
  invitation,
  onDelete,
  isPending,
}: {
  invitation: InvitationType;
  onDelete: (id: string) => void;
  isPending: boolean;
}) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-between rounded-lg border border-solid border-mbrown p-5 shadow-md">
      <Link href={`/invitations/${invitation.id}`}>
        <p className="text-2xl">
          {invitation.nameOne} + {invitation.nameTwo}
        </p>
        <p>Event date: {new Date(invitation.endDate).toLocaleDateString()}</p>
      </Link>
      <div className="flex gap-4">
        <Button
          variant="one"
          size="sm"
          title="Go to edit invitation"
          disabled={isPending}
        >
          <Link
            href={`/invitations/${invitation.id}`}
            className="flex gap-2 items-center"
          >
            <CiEdit /> Edit
          </Link>
        </Button>
        <Button
          variant="two"
          size="sm"
          title="Delete invitation and all related data"
          onClick={() => onDelete(invitation.id)}
          disabled={isPending}
          className="gap-2"
        >
          {isPending ? (
            <PuffLoader size={18} />
          ) : (
            <>
              <MdDeleteOutline /> Delete
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InvitationsListItem;
