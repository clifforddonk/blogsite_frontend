import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="font-nunito">
      Welcome to your dashboard
      <Link href="/home">back</Link>
    </div>
  );
};

export default page;
