import Loader from "@/components/loading/Loader";
import { SafeDescription } from "@/components/review/SafeDescription";
import { fetchAboutUs } from "@/lib/action/root_action";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import React, { Suspense } from "react";

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
    <main className="h-full relative">
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
            <div className="h-[300px] w-[300px] md:w-[600px] ">
              <YouTubeEmbed src={aboutUs.url} />
            </div>
          </div>

          <div className={`uppercase md:text-lg mb-4 `}>{aboutUs.title}</div>
        </div>

        <div className="mt-32">
          <SafeDescription
            description={aboutUs.description}
            lang={lang}
            color="black"
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
