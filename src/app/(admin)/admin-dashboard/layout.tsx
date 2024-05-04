"use client";

import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";
import { ThemeProvider } from "@/components/Pars/ThemeContext";
import Profile from "@/components/profile/Profile";
import React, { useEffect, useState } from "react";
import SessionSlidebar from "@/components/sessions/SessionSlidebar";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
   const [openProfile, setOpenProfile] = useState(false);
   const [sessionSlidebarIsVisible, setSessionSlidebarIsVisible] =
      useState<boolean>(false);
   const pathName: string = usePathname();
   useEffect(() => {
      if (
         pathName.includes("courses/training-session") &&
         (pathName.includes("session-info") ||
            pathName.includes("life-session") ||
            pathName.includes("joined-users") ||
            pathName.includes("attendance-requests"))
      )
         setSessionSlidebarIsVisible(true);
      else setSessionSlidebarIsVisible(false);
   }, [pathName]);

   return (
      <div>
         <ThemeProvider>
            <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
               {sessionSlidebarIsVisible ? <SessionSlidebar /> : <Sidebar />}
               <Topbar setOpenProfile={setOpenProfile} />
               {children}
               <Profile open={openProfile} setOpen={setOpenProfile} />
            </section>
         </ThemeProvider>
      </div>
   );
};

export default Layout;
