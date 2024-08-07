"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { ActionsUserMenu } from "@/app/(admin)/_components/user/actions-user-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewType } from "@/types/review";
import { ActionsReviewMenu } from "./action-reviews-menu";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

export const columns: ColumnDef<ReviewType>[] = [
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
    accessorKey: "message",
    header: () => {
      return <Button variant="ghost">Message</Button>;
    },
    cell: ({ getValue }) => {
      const message = getValue<string>();
      if (!message) {
        return "";
      } else {
        return <p>{message}</p>;
      }
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const rating = getValue<string>();
      if (!rating) {
        return "";
      } else {
        return <p>{rating}</p>;
      }
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
      if (!state) {
        return "";
      } else {
        return <p>{state}</p>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original;
      return <ActionsReviewMenu review={review} />;
    },
  },
];
