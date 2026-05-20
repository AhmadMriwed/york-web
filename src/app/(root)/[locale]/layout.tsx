import "../../globals.css";
import { Conversation } from "@/components/review/conversation";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Navbar from "@/components/navbar/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/footer/Footer";
import { getServerLanguage } from "./api/getServerLanguage";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = getServerLanguage();

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="overflow-x-clip">
        <TooltipProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <div className="block">{children}</div>
            <Conversation />
            <div className="block">
              <Footer />
            </div>

            <Toaster richColors position="top-right" />
          </NextIntlClientProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
