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

};
  


export default Layout;