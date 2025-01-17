import "rsuite/dist/rsuite.min.css";
import StoreProvider from "@/store/adminstore/StoreProvider";

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "York British Academy",
  description: "Enhance your career with York Academy's educational programs.",
  icons: {
    icon: "/dark_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
