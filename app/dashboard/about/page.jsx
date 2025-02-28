import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href="/dashboard/user">return to user dashboard</Link>
    </div>
  );
};

export default page;
