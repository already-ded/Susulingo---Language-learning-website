// app/api/debug-user/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();

  return Response.json({
    userId,
    email: user?.emailAddresses?.[0]?.emailAddress,
    firstName: user?.firstName,
  });
}
