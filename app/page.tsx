import { Suspense } from "react";
import UserTable from "@/components/user-table";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Users in Building</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UserTable />
      </Suspense>
    </div>
  );
}
