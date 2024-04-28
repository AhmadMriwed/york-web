
export default function AuthLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <div className="h-[100vh]">{children}</div>;
}

// "use client";
// import React from "react";




// const Layout = ({ children }: { children: React.ReactNode }) => {
//     return (
//         <div className="h-[100vh]">
//             {children}
//         </div>
//     );
// };

// export default Layout;


