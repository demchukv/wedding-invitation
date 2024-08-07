"use client";

import { getUserInvitationsList } from "@/data/user-invitations";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { InvitationType } from "@/types/invitation";
import { Edit, Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteInvitation } from "@/actions/invitations/manage/delete-invitation";

interface UserAccountsProps {
  userId: string;
}
export const UserInvitations = ({ userId }: UserAccountsProps) => {
  const [data, setData] = useState<InvitationType[]>([]);
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onClickDelete = async (inviteId: string) => {
    startTransition(() => {
      deleteInvitation(userId, inviteId).then(res => {
        if (res.success) {
          toast.success("Invitation deleted successfully");
          getData(userId);
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  const getData = async (userId: string) => {
    startTransition(() => {
      getUserInvitationsList(userId).then(res => {
        if (Array.isArray(res)) {
          setData(res);
        } else {
          toast.error(res.error);
        }
      });
    });
  };

  useEffect(() => {
    getData(userId);
  }, [userId]);

  return (
    <>
      <DialogContent className="max-w-min">
        <DialogHeader>
          <DialogTitle>{user?.name}</DialogTitle>
          <DialogDescription>List of user invitations</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name one</TableHead>
                <TableHead>Name two</TableHead>
                <TableHead>Event date</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>&nbsp;</TableHead>
                <TableHead>&nbsp;</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <BeatLoader className="mr-4" />
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isPending && data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No invitations
                  </TableCell>
                </TableRow>
              )}
              {!isPending &&
                data.length > 0 &&
                data.map(invite => (
                  <TableRow key={invite.id}>
                    <TableCell className="font-semibold">
                      {invite.nameOne}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {invite.nameTwo}
                    </TableCell>
                    <TableCell className="text-sm">
                      {invite.endDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {invite.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {invite.updatedAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="custom" size="sm">
                        <Link href={`/invitations/${invite.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          onClickDelete(invite.id);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </>
  );
};
