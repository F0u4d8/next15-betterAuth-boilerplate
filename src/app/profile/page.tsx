import { SignOutButton } from "@/components/auth/SignoutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");



  return (
    <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-4">
      <div className="space-y-4">

        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="flex items-center gap-2">
        

          <SignOutButton />
        </div>
      </div>

      <h2 className="text-2xl font-bold">Permissions</h2>

      <div className="space-x-4">
        <Button size="sm">MANAGE OWN POSTS</Button>
      
      </div>

      {session.user.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.user.image}
          alt="User Image"
          className="size-32 border border-primary rounded-md object-cover"
        />
      ) : (
        <div className="size-32 border border-primary rounded-md bg-primary text-primary-foreground flex items-center justify-center">
          <span className="uppercase text-lg font-bold">
            {session.user.name.slice(0, 2)}
          </span>
        </div>
      )}

      <pre className="text-sm overflow-clip">
        {JSON.stringify(session, null, 2)}
      </pre>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-blue-600">
        <h2 className="text-2xl font-bold">Update User</h2>

      
      </div>

      <div className="space-y-4 p-4 rounded-b-md  border border-t-8 border-red-600">
        <h2 className="text-2xl font-bold">Change Password</h2>

      </div>
    </div>
  );
}