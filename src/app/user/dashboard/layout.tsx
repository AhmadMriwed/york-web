"use client";

import { ThemeProvider } from "@/components/pars/ThemeContext";
import Profile from "@/components/profile/Profile";
import Sidebar from "@/components/user/pars/Sidebar";
import Topbar from "@/components/user/pars/Topbar";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div>
      <ThemeProvider>
        <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
          <Sidebar />
          <Topbar setOpenProfile={setOpenProfile} />
          {children}
          <Profile open={openProfile} setOpen={setOpenProfile} />
        </section>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
