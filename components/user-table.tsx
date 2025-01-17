"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { fetchUsers } from "@/lib/api";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "rfid",
    header: "RFID ID",
  },
  {
    accessorKey: "available",
    header: "Availability Status",
    cell: ({ row }) => (
      <span
        className={row.original.available ? "text-green-600" : "text-red-600"}
      >
        {row.original.available ? "Available" : "Unavailable"}
      </span>
    ),
  },
  {
    accessorKey: "enteredDepartment",
    header: "Department Entry Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.enteredDepartment ? "text-green-600" : "text-red-600"
        }
      >
        {row.original.enteredDepartment ? "Entered" : "Not Entered"}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Account Update Date",
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
    sortingFn: 'datetime',
  },
];

export default function UserTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchInterval: 1000,
  });

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // Actualiza la paginación aquí
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div>
      <Input
        placeholder="Search users..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(String(event.target.value))}
        className="max-w-sm mb-4"
      />
      <DataTable table={table} columns={columns} />
    </div>
  );
}
