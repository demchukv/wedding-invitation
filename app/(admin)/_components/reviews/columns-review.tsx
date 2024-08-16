"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewType } from "@/types/review";
import { ActionsReviewMenu } from "./action-reviews-menu";
import { ReviewState } from "@prisma/client";
import { enumToArray } from "@/lib/enum-helpers";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date";
    selectValues?: { label: string; value: string }[];
  }
}

const inputTextColor = (state: string) => {
  switch (state) {
    case 'APPROVED':
      return 'px-2 py-1 rounded-md border-2 border-green-600 text-green-600';
    case 'DECLINED':
      return 'px-2 py-1 rounded-md border-2 border-red-600 text-red-600'; 
    default:
      return 'px-2 py-1 rounded-md border-2 text-black';
  }
};

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
    accessorKey: "name",
    header: () => {
      return (
        <Button
          variant="ghost"
        >
          Name
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const name = getValue<string>();
      return (
          <p>{name}</p>
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
    meta: {
      filterVariant: "date",
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
        return <p className={inputTextColor(state)}>{state}</p>;
      }
    },
    meta: {
      filterVariant: "select",
      selectValues: enumToArray(ReviewState),
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
