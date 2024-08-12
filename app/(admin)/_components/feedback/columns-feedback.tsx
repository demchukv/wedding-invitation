"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FeedbackType } from "@/types/feedback";
import { ActionsFeedbackMenu } from "./action-feedback-menu";
import { FeedbackState } from "@prisma/client";
import { enumToArray } from "@/lib/enum-helpers";
import { ArrowUpDown } from "lucide-react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date";
    selectValues?: { label: string; value: string }[];
  }
}

export const columns: ColumnDef<FeedbackType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const id = getValue<string>();
      return (
        <div title={id} className="text-sm truncate font-mono w-[80px]">
          {id}
        </div>
      );
    },
  },

  {
    accessorKey: "userId",
    header: () => {
      return <Button variant="ghost">User</Button>;
    },
    cell: ({ getValue }) => {
      const userId = getValue<string>();
      return (
        <div title={userId} className="text-sm truncate font-mono w-[80px]">
          {userId}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => {
      return <Button variant="ghost">Email</Button>;
    },
    cell: ({ getValue }) => {
      const email = getValue<string>();
      if (!email) {
        return "";
      } else {
        return <p>{email}</p>;
      }
    },
  },
  {
    accessorKey: "phone",
    header: () => {
      return <Button variant="ghost">Phone</Button>;
    },
    cell: ({ getValue }) => {
      const phone = getValue<string>();
      if (!phone) {
        return "";
      } else {
        return <p>{phone}</p>;
      }
    },
  },
  {
    accessorKey: "message",
    header: () => {
      return <Button variant="ghost">Message</Button>;
    },
    cell: ({ getValue }) => {
      const message = getValue<string>();
      if (!message) {
        return "";
      } else {
        return (
          <p className="truncate text-sm font-mono w-[200px]">{message}</p>
        );
      }
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          State
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const state = getValue<string>();
      if (state === "NEW") {
        return <p className="text-sm font-bold text-green-800">{state}</p>;
      } else {
        return <p className="text-sm font-bold text-red-800">{state}</p>;
      }
    },
    meta: {
      filterVariant: "select",
      selectValues: enumToArray(FeedbackState),
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return (
        <span className="text-sm font-mono">
          {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </span>
      );
    },
    meta: {
      filterVariant: "date",
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionsFeedbackMenu feedback={row.original} />;
    },
  },
];
