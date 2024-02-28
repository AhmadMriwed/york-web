"use client";
import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";
import { ThemeProvider } from "@/components/Pars/ThemeContext";
import React, { useEffect, useState } from "react";
import SessionSlidebar from "@/components/sessions/SessionSlidebar";
import { usePathname } from "next/navigation";
// import ReduxProvider from '@/store/provider'

// interface UserResponse {
//   user: string | null;
//   error: AxiosError | null;
// }

const Layout = ({ children }: { children: React.ReactNode }) => {
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
        {/* <ReduxProvider> */}
        <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
          {sessionSlidebarIsVisible ? <SessionSlidebar /> : <Sidebar />}
          <Topbar />
          {children}
        </section>
        {/* </ReduxProvider> */}
      </ThemeProvider>
    </div>
  );
};

export default Layout;

// async function getUser(): Promise<UserResponse> {
//   try {
//     const { data } = await axios.get("/api/auth/me");

//     return {
//       user: data,
//       error: null,
//     };
//   } catch (e) {
//     const error = e as AxiosError;

//     return {
//       user: null,
//       error,
//     };
//   }
// }
