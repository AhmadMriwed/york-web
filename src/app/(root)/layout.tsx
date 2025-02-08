import StoreProvider from "@/store/adminstore/StoreProvider";
import "../globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/footer/Footer";
import { Conversation } from "@/components/conversation";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>York British Academy</title>
        {/* Importing Chaparral Pro font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chaparral+Pro:wght@600&display=swap"
        />
      </head>
      <body>
        <TooltipProvider>
          <StoreProvider>
            <Navbar />
            {children}
            <Conversation />
            <Footer />
            <Toaster richColors position="top-right" />
          </StoreProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
