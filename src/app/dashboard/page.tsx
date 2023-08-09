"use client";

import { useSession } from "next-auth/react";

export default function DashBoardPage() {
  const { data: session, status } = useSession()
  
  if (status === "authenticated") {
    return <p>Signed in as {session?.user?.email}</p>
  }

}