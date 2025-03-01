"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.replace("/auth/login");
  }, [router]);

  return null; // Return null instead of an empty fragment
};

export default Page;
