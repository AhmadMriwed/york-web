'use client'
import Sidbar from '@/components/pars/Sidbar';
import Topbar from '@/components/pars/Topbar';
import React from 'react';
// import ReduxProvider from '@/store/provider'

// interface UserResponse {
//   user: string | null;
//   error: AxiosError | null;
// }

const Layout = ({ children,}: {children: React.ReactNode}) => {

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
      {/* <ReduxProvider> */}
        <div><Topbar/></div>
        <div>{children}</div>
        <div> <Sidbar/></div>
      {/* </ReduxProvider> */}
    </div>
    
  );

};
  


// export default Layout;

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