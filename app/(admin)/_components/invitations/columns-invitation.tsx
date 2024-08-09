"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { InvitationType } from "@/types/invitation";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { ActionsUserMenu } from "@/app/(admin)/_components/invitations/actions-invitation-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enumToArray } from "@/lib/enum-helpers";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date";
    selectValues?: { label: string; value: string }[];
  }
}

export const columns: ColumnDef<InvitationType>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <Button variant="ghost">ID</Button>;
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
    header: ({ column }) => {
      return <Button variant="ghost">userID</Button>;
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
    accessorKey: "nameOne",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name One
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableMultiSort: true,
    // cell: EditableTextCell,
  },
  {
    accessorKey: "nameTwo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name Two
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableMultiSort: true,
    // cell: EditableTextCell,
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      if (!date) {
        return "no";
      }
      return (
        <span className="text-sm font-mono">{date.toLocaleDateString()}</span>
      );
    },
    meta: {
      filterVariant: "date",
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
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
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
      const invitation = row.original;
      return <ActionsUserMenu invitation={invitation} />;
    },
  },
];
