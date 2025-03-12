import Loader from "@/components/loading/Loader";
import { fetchAboutUs } from "@/lib/action/root_action";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import React, { FC, Suspense } from "react";

const Paragraph: FC<{ children: React.ReactNode; lang: string }> = ({
  children,
  lang,
}) => (
  <p
    className={`my-4 text-gray-500 ${
      lang === "ar" ? "text-right" : "text-left"
    }`}
    dir={lang === "ar" ? "rtl" : "ltr"}
  >
    {children}
  </p>
);

const YouTubeEmbed = ({ src }: { src: string }) => {
  return (
    <div style={{ position: "relative", paddingBottom: "100%", height: 0 }}>
      <iframe
        src={src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="w-full h-72"
      />
    </div>
  );
};

const AboutPage = async () => {
  const t = await getTranslations("AboutUs");
  const aboutUsData = await fetchAboutUs();
  const aboutUs = aboutUsData[0];

  const cookieStore = cookies();
  const lang = cookieStore.get("language")?.value || "en";

  return (
    <main className="h-full relative" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="about-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title">{t("title")}</h1>
      </div>

      <section className="container mx-auto my-14 px-4">
        <div
          className={`
            border-none md:border-solid
            ${lang === "ar" ? "md:border-r-[5px]" : "md:border-l-[5px]"}
            border-[#037f85]
            md:p-6 h-[400px] m-2
          `}
        >
          <div
            className={`
    border-none md:border-solid
    ${lang === "ar" ? "md:border-r-[5px]" : "md:border-l-[5px]"}
    border-[#037f85]
    md:p-6 h-[400px] m-2
  `}
          >
            <h1 className="font-bold text-2xl text-primary-color1 mb-6">
              {t("subTitle")}
            </h1>
            <div className="h-[300px] w-[300px] md:w-[600px] mx-auto">
              <YouTubeEmbed src={aboutUs.url} />
            </div>
          </div>

          <div
            className={`uppercase md:text-lg mb-4 ${
              lang === "ar" ? "text-right" : "text-left"
            }`}
          >
            {aboutUs.title}
          </div>
        </div>

        <div className="mt-16">
          <div
            dangerouslySetInnerHTML={{ __html: aboutUs.description || "" }}
            className={`mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
        </div>
      </section>
    </main>
  );
};

export default async function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <AboutPage />
    </Suspense>
  );
}
