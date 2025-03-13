import "../../globals.css";
import { Conversation } from "@/components/review/conversation";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import Footer from "@/components/footer/Footer";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  console.log(locale);
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>York British Academy</title>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Chaparral+Pro:wght@600&display=swap"
        />
      </head>
      <body>
        <TooltipProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            {children}
            <Conversation />
            <Footer />
            <Toaster richColors position="top-right" />
          </NextIntlClientProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
