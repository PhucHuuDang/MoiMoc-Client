"use client";

import { useAuthContext } from "@/provider/auth-provider";

import { Suspense, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { clientGetData } from "@/api/actions/get-data-api";

import { DataTable } from "../../products/data-table-products/data-table";
import { usersColumn } from "./users-column";

import { useQuery } from "@tanstack/react-query";

interface UserManagementProps {
  initialTab?: "all-users" | "add-user";
}

export function UserManagement({
  initialTab = "all-users",
}: UserManagementProps) {
  const auth = useAuthContext();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => await clientGetData("/users", auth?.token),
  });

  const UserDataTableSkeleton = () => {
    return (
      <div className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-20 ml-auto" />
        </div>
        <div className="overflow-hidden rounded-lg border border-gray-700">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                {[
                  "Avatar",
                  "Name",
                  "Email",
                  "Role",
                  "Designation",
                  "Created At",
                  "Updated At",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {Array.from({ length: 8 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-32" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-28" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-28" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {initialTab === "all-users" && (
        <>
          {!isLoading ? (
            <Suspense fallback={<span>Loading...</span>}>
              <DataTable columns={usersColumn} data={data} filterName="name" />
            </Suspense>
          ) : (
            <UserDataTableSkeleton />
          )}
        </>
      )}
    </div>
  );
}
