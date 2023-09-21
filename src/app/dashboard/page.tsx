"use client";
import { ConfigProvider } from "antd";
import { useSession } from "next-auth/react";

export default function DashBoardPage() {
  const { data: session, status } = useSession();

  return (
    <ConfigProvider>
      <div className="relative isolate overflow-hidden sm:py-32 dark:to-zinc-600 bg-[url('/waves-background.svg')] bg-fixed bg-left-top bg-cover 2xl:h-[calc(100vh-4rem)] items-center p-8 w-full sm:h-[calc(100vh-1rem)]">
        <div>
          <h1>Content Here</h1>
        </div>
      </div>
    </ConfigProvider>
  );
  // }
}
