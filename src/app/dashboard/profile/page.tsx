"use client";

import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <>
        <div className="flex flex-col items-center justify-center bg-zinc-800">
          <h1>Profile</h1>
          <p>Signed in as {session?.user?.email}</p>
        </div>
      </>
    );
  }
}
