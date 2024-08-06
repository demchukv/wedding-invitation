"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { UserTypes } from "@/types/users";
import Image from "next/image";
import { UserRole } from "@prisma/client";
import { ActionsUserMenu } from "@/app/(admin)/_components/user/actions-user-menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enumToArray } from "@/lib/enum-helpers";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date";
    selectValues?: { label: string; value: string }[];
  }
}

// import { EditableTextCell } from "@/app/(admin)/_components/editable-text-cell";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<UserTypes>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableMultiSort: true,
    // cell: EditableTextCell,
  },
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <Button variant="ghost">Image</Button>;
    },

    cell: ({ getValue }) => {
      const image = getValue<string>();
      if (!image) {
        return "";
      } else {
        return (
          <Image
            width={32}
            height={32}
            src={image}
            alt="user image"
            className="rounded-full"
          />
        );
      }
    },
    meta: {
      filterVariant: "select",
      selectValues: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableMultiSort: true,
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Verified
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
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: {
      filterVariant: "select",
      selectValues: enumToArray(UserRole),
    },
    enableMultiSort: true,
    cell: ({ getValue }) => {
      const role = getValue<UserTypes["role"]>();
      if (role === UserRole.ADMIN) {
        return <span className="text-sm text-green-800 font-bold">{role}</span>;
      } else {
        return <span className="text-sm text-blue-500">{role}</span>;
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
      const user = row.original;
      return <ActionsUserMenu user={user} />;
    },
  },
];
