import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="font-nunito text-center">
      Welcome to your dashboard
      <Link href="/dashboard/about">About Page</Link>
    </div>
  );
};

export default page;
