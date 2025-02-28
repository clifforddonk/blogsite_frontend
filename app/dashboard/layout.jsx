import { Children } from "react";
import Sidebar from "../components/layout/Sidebar";

export default function BlogLayout({ children }) {
  return (
    <main className="flex  text-gray-900 font-nunito">
      <Sidebar />
      <section className="w-full px-4 sm:px-8">
        {/* <Header className="h-20" /> */}
        <main className="mb-10">{children}</main>
        {/* <Footer /> */}
      </section>
    </main>
  );
}
