"use client";
import Loader from "@/components/loading/Loader";
import { fetchAboutUs } from "@/lib/action/root_action";
import { AboutUs } from "@/types/rootTypes/rootTypes";
import React, { FC, useEffect, useState } from "react";

const Paragraph: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="my-4 text-gray-500">{children}</p>
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

const AboutPage = () => {
  const [aboutUs, setAboutUs] = useState<AboutUs | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutData = await fetchAboutUs();
        setAboutUs(aboutData[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!aboutUs) {
    return <Loader />;
  }

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="about-us-bg h-[80vh] flex items-center justify-center">
        <h1 className="custom-title">About Us</h1>
      </div>

      {/* Content Section */}
      <section className="container mx-auto my-14 px-4">
        <div className="border-l-[5px] border-primary-color2 p-6">
          <div className="md:border-l-[5px] border-primary-color2 md:p-6 h-[400px] m-2">
            <h1 className="font-bold text-2xl text-primary-color1 mb-6">
              Who we are
            </h1>
            <div className="h-[300px] w-[300px] md:w-[600px]">
              <YouTubeEmbed src={aboutUs.url} />
            </div>
          </div>

          <div className="uppercase md:text-lg mt-4">{aboutUs.title}</div>
        </div>

        <div className="mt-8">
          <div
            dangerouslySetInnerHTML={{ __html: aboutUs.description || "" }}
            className=" mb-4 "
          />
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
