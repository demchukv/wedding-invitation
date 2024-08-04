"use client";

import { columns } from "@/app/(admin)/_components/columns-user";
import {
  DataTable,
  PaginationState,
} from "@/app/(admin)/_components/data-table";
import { UserTypes } from "@/types/users";
import { getManageUserList } from "@/data/manage-users";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTransition } from "react";

export default function UsersPage() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<UserTypes[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const initPagination = {
    pageIndex: 0,
    pageSize: 1,
  };

  const getData = async (pagination: PaginationState) => {
    startTransition(() => {
      getManageUserList(pagination).then(res => {
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
  const handlePaginationChange = (newPagination: PaginationState) => {
    getData(newPagination);
  };

  useEffect(() => {
    getData(initPagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Array.isArray(data) && (
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={data}
            rowCount={rowCount}
            pagination={initPagination}
            handlePaginationChange={handlePaginationChange}
            isPending={isPending}
          />
        </div>
      )}
    </>
  );
}
