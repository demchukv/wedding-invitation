"use client";

import { columns } from "@/app/(admin)/_components/invitations/columns-invitation";
import {
  DataTable,
  PaginationState,
} from "@/app/(admin)/_components/data-table";
import { InvitationType } from "@/types/invitation";
import { getManageInvitationsList } from "@/data/manage-invitations";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTransition } from "react";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export default function ManageInvitationsPage() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<InvitationType[]>([]);
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
  const initFiltering = [] as ColumnFiltersState;

  const getData = async (
    pagination: PaginationState,
    sorting: SortingState,
    filters: ColumnFiltersState
  ) => {
    startTransition(() => {
      getManageInvitationsList(pagination, sorting, filters).then(res => {
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
    newSorting: SortingState,
    columnFilters: ColumnFiltersState
  ) => {
    getData(newPagination, newSorting, columnFilters);
  };

  useEffect(() => {
    getData(initPagination, initSorting, initFiltering);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Array.isArray(data) && (
        <main className="p-4 sm:px-6 sm:py-0">
          <DataTable
            columns={columns}
            data={data}
            rowCount={rowCount}
            pagination={initPagination}
            sorting={initSorting}
            handlePaginationChange={handlePaginationChange}
            isPending={isPending}
          />
        </main>
      )}
    </>
  );
}
