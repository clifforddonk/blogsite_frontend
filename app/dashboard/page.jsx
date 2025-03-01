"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (session) {
      router.push("/dashboard/user");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading......</p>;
  }
  return null;
}
