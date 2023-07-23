import React, { ReactElement, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
interface LayoutProps {
  children: ReactElement;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className=" max-w-screen-md w-full flex flex-col gap-4 ">
        {children}
        </main>

    </>
  );
}

export default Layout;
