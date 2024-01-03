import Sidbar from '@/app/components/Pars/Sidbar';
import Topbar from '@/app/components/Pars/Topbar';
import React from 'react';

const Layout = ({ children,}: {children: React.ReactNode}) => {
  return (
    <div>
      <Topbar/>
      <main className='md:ml-[270px] xl:ml-[300px] mt-[70px] p-4'>{children}</main>
      <Sidbar/>
    </div>
  );
};

export default Layout;