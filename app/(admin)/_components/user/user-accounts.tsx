"use client";

import { getAllAccountsByUserId } from "@/data/account";

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
import { UserAccountTypes } from "@/types/users";
import { Trash } from "lucide-react";
import { BeatLoader } from "react-spinners";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/actions/users/delete-account";

interface UserAccountsProps {
  userId: string;
}
export const UserAccounts = ({ userId }: UserAccountsProps) => {
  const [accounts, setAccounts] = useState<UserAccountTypes[]>([]);
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onclickDelete = async (providerAccountId: string) => {
    startTransition(() => {
      deleteAccount(userId, providerAccountId).then(res => {
        if (res.success) {
          toast.success("Account deleted successfully");
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
      getAllAccountsByUserId(userId).then(res => {
        if (res.success) {
          setAccounts(res.accounts);
        }
        if (res.error) {
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
          <DialogDescription>List of linked accounts</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
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
              {!isPending && accounts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No linked accounts
                  </TableCell>
                </TableRow>
              )}
              {!isPending &&
                accounts.length > 0 &&
                accounts.map(account => (
                  <TableRow key={account.providerAccountId}>
                    <TableCell className="font-semibold text-lg">
                      {account.provider}
                    </TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell className="text-sm">
                      {account.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {account.updatedAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onclickDelete(account.providerAccountId)}
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
