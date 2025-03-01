"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="font-nunito ">
      Welcome {session?.user?.name}
      <Link href="/dashboard/about">Click here About Page</Link>
      <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
        SignOut
      </button>
    </div>
  );
};

export default page;
