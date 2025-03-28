import "rsuite/dist/rsuite.min.css";
import StoreProvider from "@/store/adminstore/StoreProvider";

import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "York  Academy",
  description: "Enhance your career with York Academy's educational programs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <StoreProvider>
          {children}

          <Toaster richColors position="top-right" />
        </StoreProvider>
      </body>
    </html>
  );
}
