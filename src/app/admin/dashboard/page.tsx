
  import { auth } from "@/lib/auth";
  import { headers } from "next/headers";
  import { redirect } from "next/navigation";
  
  export default async function Page() {
    const headersList = await headers();
  
    const session = await auth.api.getSession({
      headers: headersList,
    });
  
    if (!session) redirect("/auth/login");
  
    if (session.user.role !== "ADMIN") {
      return (
        <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
          <div className="space-y-4">
           
  
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
  
            <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
              FORBIDDEN
            </p>
          </div>
        </div>
      );
    }
  

  
 
    return (
      <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
        <div className="space-y-4">
  
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
  
          <p className="p-2 rounded-md text-lg bg-green-600 text-white font-bold">
            ACCESS GRANTED
          </p>
        </div>
  
        <div className="w-full overflow-x-auto">
          <table className="table-auto min-w-full whitespace-nowrap">
            <thead>
              <tr className="border-b text-sm text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
  
           
          </table>
        </div>
      </div>
    );
  }