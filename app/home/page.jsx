import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      This is the homepage
      <Link href="/user/dashboard">click here for dashboard</Link>
    </div>
  );
};

export default page;
