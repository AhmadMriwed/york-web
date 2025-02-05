import Script from "next/script";
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
      </head>
      <body>
        <TooltipProvider>
          <StoreProvider>
            <Navbar />
            {children}

            <Script
              id="tawk.to-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  var Tawk_API = Tawk_API || {},
                    Tawk_LoadStart = new Date();
                  (function() {
                    var s1 = document.createElement("script"),
                      s0 = document.getElementsByTagName("script")[0];
                    s1.async = true;
                    s1.src = 'https://embed.tawk.to/5e57ba49298c395d1cea1bff/1fojpo2rd';
                    s1.charset = 'UTF-8';
                    s1.setAttribute('crossorigin', '*');
                    s0.parentNode.insertBefore(s1, s0);
                  })();
                `,
              }}
            />
            <Footer />
            <Toaster richColors position="top-right" />
          </StoreProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
