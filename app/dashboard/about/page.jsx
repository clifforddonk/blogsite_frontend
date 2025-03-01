"use client";
import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div>
      Welcome {session?.user?.name}
      <Link href="/dashboard/user">return to user dashboard</Link>
    </div>
  );
};

export default page;
