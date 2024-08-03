import { columns } from "./columns";
import { DataTable } from "./data-table";
import { UserTypes } from "@/types/users";
import { getManageUserList } from "@/data/manage-users";

async function getData(): Promise<UserTypes[]> {
  const res = await getManageUserList();
  return res || [];
}

export default async function UsersPage() {
  const data = await getData();

  return (
    <>
      {Array.isArray(data) && data.length > 0 && (
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      )}
    </>
  );
}
