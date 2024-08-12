'use client'

import { ReviewType } from "@/types/review";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useEffect, useState, useTransition } from "react";
import { DataTable, PaginationState } from "../../_components/data-table";
import { getManageReviewList } from "@/data/manage-reviews";
import { toast } from "sonner";
import { columns } from "../../_components/reviews/columns-review";

const ManageReviewsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<ReviewType[]>([]);
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
      getManageReviewList(pagination, sorting, filters).then(res => {
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
};

export default ManageReviewsPage;
