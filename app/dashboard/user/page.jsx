"use client";
import Link from "next/link";
import React, { useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  return (
    <div className="font-nunito flex items-center justify-center flex-col ">
      <h1 className="font-bold text-xl">Welcome, {session?.user?.name}😎</h1>

      <button
        className="bg-blue-500 rounded-lg max-w-md hover:bg-blue-400 text-white font-semibold px-4 py-2 cursor-pointer transition"
        onClick={() => signOut({ callbackUrl: "/auth/login" })}
      >
        SignOut
      </button>
    </div>
  );
};

export default page;
