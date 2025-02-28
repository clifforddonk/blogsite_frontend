import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      This is the homepage
      <Link href="/user/dashboard">
        <button>click here for dashboard</button>
      </Link>
    </div>
  );
};

export default page;
