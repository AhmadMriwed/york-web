// "use client";
// import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "rsuite/dist/rsuite.min.css";
import "./globals.css";
import StoreProvider from "@/store/adminstore/StoreProvider";

const montserrat = Montserrat({
   weight: ["400", "500", "600", "700", "800", "900"],
   subsets: ["latin"],
   variable: "--font-montserrat",
});

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className="font-montserrat">
            <StoreProvider>{children} </StoreProvider>
         </body>
      </html>
   );
}
