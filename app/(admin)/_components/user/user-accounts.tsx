"use client";

import { getAllAccountsByUserId } from "@/data/account";

import {
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
import { startTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { UserTypes, UserAccountTypes } from "@/types/users";
interface UserAccountsProps {
  userId: string;
}
export const UserAccounts = ({ userId }: UserAccountsProps) => {
  const [accounts, setAccounts] = useState<UserAccountTypes[]>([]);
  const [user, setUser] = useState<UserTypes | null>();

  const getData = async (userId: string) => {
    startTransition(() => {
      getAllAccountsByUserId(userId).then(res => {
        if (res.success) {
          setAccounts(res.accounts);
          setUser(res.user);
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map(account => (
              <TableRow key={account.providerAccountId}>
                <TableCell>{account.provider}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell className="text-sm">
                  {account.createdAt.toLocaleDateString()}{" "}
                  {account.createdAt.toLocaleTimeString()}
                </TableCell>
                <TableCell className="text-sm">
                  {account.updatedAt.toLocaleDateString()}{" "}
                  {account.updatedAt.toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
