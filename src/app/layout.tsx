"use client";
// import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "rsuite/dist/rsuite.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google"
import StoreProvider from "@/store/adminstore/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react"

import "./globals.css";

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
         <body className="h-[100vh]">
            <ChakraProvider >
               <GoogleOAuthProvider clientId="482040382753-v54a1itsndnsfbdptlruls69aoggeg77.apps.googleusercontent.com">
                  <StoreProvider> {children}</StoreProvider>
               </GoogleOAuthProvider>
            </ChakraProvider>
         </body>

      </html>
   );
}
