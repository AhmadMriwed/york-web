"use client";
import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";
import { ThemeProvider } from "@/components/Pars/ThemeContext";

import React from "react";
// import ReduxProvider from '@/store/provider'

// interface UserResponse {
//   user: string | null;
//   error: AxiosError | null;
// }

const Layout = ({ children }: { children: React.ReactNode }) => {
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
               <Sidebar />
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
