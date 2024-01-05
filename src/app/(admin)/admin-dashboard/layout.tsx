<<<<<<< HEAD
import Sidebar from "@/components/Pars/Sidebar";
import Topbar from "@/components/Pars/Topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
   return (
      <section className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] min-h-screen relative">
         <Sidebar />
         <Topbar />
         {children}
      </section>
   );
=======
import Sidbar from '@/components/pars/Sidbar';
import Topbar from '@/components/pars/Topbar';
import React from 'react';


const Layout = ({ children,}: {children: React.ReactNode}) => {

  return (
    
    <div>
      <div><Topbar/></div>
      <div>{children}</div>
      <div> <Sidbar/></div>
    </div>
    
  );

>>>>>>> b5c4263dce3b346334264401b16680622b6a71a7
};
  


export default Layout;
