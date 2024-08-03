import { columns } from "./columns";
import { DataTable } from "./data-table";
import { UserTypes } from "@/types/users";
import { getManageUserList } from "@/data/manage-user-list";

async function getData(): Promise<UserTypes[]> {
  // Fetch data from your API here.
  const res = await getManageUserList();
  if (!res) return [];
  return res;
}

export default async function UsersPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
