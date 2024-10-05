"use client";

import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";
import { ThemeProvider } from "@/components/Pars/ThemeContext";
import Profile from "@/components/profile/Profile";
import React, { useEffect, useState } from "react";
import SessionSidebar from "@/components/sessions/SessionSidebar";
import { usePathname } from "next/navigation";
import CourseSidebar from "@/components/courses/CourseSidebar";
// import ReduxProvider from '@/store/provider'

// interface UserResponse {
//   user: string | null;
//   error: AxiosError | null;
// }

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [sidebar, setSidebar] = useState<"sessions" | "courses" | "default">(
    "default"
  );
  const pathName: string = usePathname();
  useEffect(() => {
    if (
      pathName.includes("courses/training-session") &&
      (pathName.includes("session-info") ||
        pathName.includes("life-session") ||
        pathName.includes("joined-users") ||
        pathName.includes("attendance-requests"))
    ) {
      setSidebar("sessions");
    } else if (pathName.includes("courses/course-info")) {
      setSidebar("courses");
    } else setSidebar("default");
  }, [pathName]);

  // const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // const { push } = useRouter();
  // useEffect(() => {
  //   (async () => {
  //     const { user, error } = await getUser();

  //     if (error) {
  //       push("/admin-login");
  //       return;
  //     }

  //     // if the error did not happen, if everything is alright
  //     setIsSuccess(true);
  //   })();
  // }, [push]);

  // if (!isSuccess) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div>
      <ThemeProvider>
        <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
          {sidebar === "default" ? (
            <Sidebar />
          ) : sidebar === "sessions" ? (
            <SessionSidebar />
          ) : (
            <CourseSidebar />
          )}
          <Topbar setOpenProfile={setOpenProfile} />
          {children}
          <Profile open={openProfile} setOpen={setOpenProfile} />
        </section>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
