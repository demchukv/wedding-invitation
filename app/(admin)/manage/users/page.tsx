"use client";

import { columns } from "@/app/(admin)/_components/user/columns-user";
import {
  DataTable,
  PaginationState,
} from "@/app/(admin)/_components/data-table";
import { UserTypes } from "@/types/users";
import { getManageUserList } from "@/data/manage-users";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { SortingState } from "@tanstack/react-table";

export default function UsersPage() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<UserTypes[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const initPagination = {
    pageIndex: 0,
    pageSize: 20,
  };
  const initSorting = [
    {
      id: "createdAt",
      desc: true,
    },
  ];

  const getData = async (
    pagination: PaginationState,
    sorting: SortingState
  ) => {
    startTransition(() => {
      getManageUserList(pagination, sorting).then(res => {
        if (res?.success) {
          setData(res.data || []);
          setRowCount(res.rowCount || 0);
        }
        if (res?.error) {
          toast.error(res.error);
        }
      });
    });
  };
  const handlePaginationChange = (
    newPagination: PaginationState,
    newSorting: SortingState
  ) => {
    getData(newPagination, newSorting);
  };

  useEffect(() => {
    getData(initPagination, initSorting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Array.isArray(data) && (
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={data}
            rowCount={rowCount}
            pagination={initPagination}
            sorting={initSorting}
            handlePaginationChange={handlePaginationChange}
            isPending={isPending}
          />
        </div>
      )}
    </>
  );
}
