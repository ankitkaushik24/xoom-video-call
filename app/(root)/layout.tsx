import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import SteamProvider from "@/providers/StreamProvider";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="flex flex-col text-white w-screen h-screen">
      <NavBar />
      <div className="flex flex-1 h-0">
        <SideBar />
        <section className="p-8 bg-dark-2 flex-grow overflow-auto">
          <SteamProvider>{children}</SteamProvider>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
