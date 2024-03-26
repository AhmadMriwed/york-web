import { Inter, Montserrat } from "next/font/google";
import "rsuite/dist/rsuite.min.css";
import StoreProvider from "@/store/adminstore/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react";

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
         <head>
            <meta charSet="UTF-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0"
            />{" "}
            <title>York Brititsh Academy</title>
         </head>
         <body className="">
            <ChakraProvider>
               <StoreProvider> {children}</StoreProvider>
            </ChakraProvider>
         </body>
      </html>
   );
}
