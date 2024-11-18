"use client";
import Image from "next/image";
import DefaultButton from "@/components/buttons/DefaultButton";
import Link from "next/link";
import { category, newsItems, newsItme } from "@/utils/user/home/homePageEnums";

// gsap :
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useEffect, useMemo, useRef, useState } from "react";

import { venues, categories } from "@/constants";
import HomeCourseAds from "@/components/user/home/HomeCourseAds";
import FrequentlyAskedQuestions from "@/components/user/home/FrequentlyAskedQuestions";
import InfiniteMovingCardsDemo from "@/components/user/home/InfiniteMovingCard";

console.log("this is server component");

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set loading to false after 5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0.5 },
        { opacity: 1, duration: 1.5, ease: "power1.inOut" }
      );
      gsap.to("#home", {
        y: 0,
        opacity: 1,
        ease: "power1.inOut",
      });
      gsap.fromTo(
        ".opacity",
        { opacity: 1 },
        { opacity: 0.4, y: 0, delay: 4.9 }
      );
    }
  }, [loading]);

  const SectionTitle = ({
    title,
    desc,
    direction,
  }: {
    title: string;
    desc?: string;
    direction?: "col" | "col-reverse";
  }) => (
    <div
      className={`relative flex ${
        direction === "col"
          ? "flex-col justify-center items-center"
          : "flex-col-reverse justify-center items-center"
      } capitalize`}
    >
      <h3 className="text-black text-[35px] font-bold">{title}</h3>
      {desc && <p className="text-[#7d7d7d] text-[20px] font-normal">{desc}</p>}
      <span className="absolute bottom-[-20px] w-full max-w-[200px] h-[2px] bg-[var(--primary-color2)]" />
    </div>
  );

  const NewsCard = ({ item }: { item: newsItme }) => (
    <div className="w-[366px]  min-h-[405px] px-[30px] bg-[var(--home-color)] rounded-[10px] hover:translate-y-[-6px] duration-300 transition-all cursor-default">
      <div className="relative h-[215px] rounded-b-[10px]">
        <Image src={item.image} alt="news" fill className="rounded-b-[10px]" />
        <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#01989f] to-[var(--home-color)] opacity-80 rounded-b-[10px]" />
        <h3 className="text-white absolute bottom-0 p-3 text-[26px] font-bold leading-[1.1] capitalize">
          {item.title}
        </h3>
      </div>
      <p className="text-[14px] py-5 text-[#777]">{item.description}</p>
    </div>
  );

  const CategoryCard = ({ item }: { item: category }) => (
    <div className="flex justify-center items-center gap-3 flex-col p-[20px] w-[230px] h-[160px] bg-[var(--home-color)] rounded-[10px] hoverEffect cursor-default">
      <div className="footer-bg"></div>
      <div className="w-[80px] h-[80px] aspect-[1/1]">
        <Image
          src={item.image}
          alt={item.title}
          className="aspect-[1/1]"
          width={80}
          height={80}
          loading="lazy"
        />
      </div>
      <p className="text-[15px] font-semibold text-[var(--primary-color2)] text-center capitalize">
        {item.title}
      </p>
    </div>
  );

  const VenueCard = ({
    title,
    img,
    link,
  }: {
    title: string;
    img: string;
    link: number;
  }) => (
    <div className="flex flex-col items-center justify-center">
      <Link
        href={`/venues/${link}`}
        className="relative  hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md "
      >
        <Image src={img} width={200} height={200} alt={title} />
      </Link>
      <p className="mt-3 font-semibold text-sm">{title}</p>
    </div>
  );

  return (
    <section ref={sectionRef} className="relative duration-400">
      {loading ? (
        <div className="flex  fixed top-0 left-0 z-50 justify-center h-full w-full items-center bg-black">
          <video
            src={"/videos/22.mp4"}
            height={900}
            width={900}
            autoPlay
            loop
            muted
            aria-label="Loading animation"
          />
        </div>
      ) : (
        <div>
          <section className="home-landing-bg">
            <main
              id="home"
              className="flex justify-center items-center flex-col h-[calc(100%_-_125px)] px-[20px] md:px-[50px] relative"
            >
              <h1 className="animation text-white md:w-full mt-44 md:mt-0 lg:w-[815px] leading-[1.4] text-[23px] sm:text-[32px] md:text-[40px] font-semibold capitalize mb-[30px]">
                Make your employees grow with York Academy
              </h1>
              <p className="animation text-[#c2c2c2] md:w-full lg:w-[815px]">
                The opportunity for interaction between employees enhances
                information sharing and knowledge transfer, especially in larger
                companies where team interaction is valuable.
              </p>
              <div className="animation my-5 md:w-full lg:w-[815px]">
                <DefaultButton label="view courses" />
              </div>
            </main>
          </section>

          <HomeCourseAds />

          <section className="relative">
            <div className="ms-[50px] sm:ms-[80px] relative">
              <SectionTitle
                title="york british academy"
                desc="welcome to"
                direction="col-reverse"
              />
            </div>

            <main className="relative home-welcome-bg min-h-[270px] mt-[80px] flex justify-between items-center flex-col sm:flex-row py-[30px] px-[50px] lg:px-[100px] gap-[20px] flex-wrap">
              <div className="w-full h-full absolute top-0 left-0 bg-[#13181eec] bg-opacity-95" />
              <div className="min-w-[100px] lg:ms-[100px] relative">
                <Image src="/logo.png" alt="Logo" width={200} height={200} />
              </div>
              <div className="basis-[50%] relative">
                <p className="text-white mb-3">
                  York Academy registered office in England and Wales. Its main
                  objective is to provide training, advisory services, and
                  strategic solutions for postgraduate studies in higher
                  education.
                </p>
                <Link
                  href={"#"}
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color2)]"
                >
                  Read More
                </Link>
              </div>
              <span className="hidden md:inline absolute w-[55%] h-[135%] left-[40%] border-2 border-[var(--primary-color1)]" />
            </main>
          </section>

          <section className="mt-[130px]">
            <div className="ms-[50px] sm:ms-[80px] flex justify-between gap-7 flex-wrap">
              <SectionTitle
                title="York News"
                desc="keep up with our newest feeds"
                direction="col"
              />

              <Link
                href={"#"}
                className="self-end text-[var(--primary-color1)] hover:text-[var(--primary-color2)] me-[80px] font-semibold text-[20px] capitalize mt-[10px]"
              >
                Read more
              </Link>
            </div>

            <div className="relative mt-[90px]">
              <div className="absolute z-[-1] xl:h-[70%] w-full bg-[#023141] shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] top-[50%] translate-y-[-50%]" />
              <div className="px-[30px] flex items-center gap-[30px] justify-center flex-wrap ">
                {newsItems.map((item: newsItme) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>

          <section className="mt-[130px]" id="categories">
            <div className="flex justify-center items-center">
              <SectionTitle title="Categories" />
            </div>

            <main className="px-[30px] flex justify-center flex-wrap mt-[90px] gap-[20px] mb-[30px]">
              {categories.map((item: category) => (
                <CategoryCard key={item.id} item={item} />
              ))}
            </main>
          </section>
          <section className="mt-[100px]">
            <div className="flex justify-center items-center">
              <SectionTitle title="Venues" />
            </div>
            <main className="px-[30px] flex justify-center flex-wrap mt-[90px] gap-[25px] mb-[30px]">
              {venues.map((item, index) => (
                <VenueCard
                  title={item.title}
                  img={item.image}
                  link={index + 1}
                />
              ))}
            </main>
          </section>
          <section className="mt-[100px]">
            <div className="flex justify-center items-center">
              <SectionTitle title="Frequently Asked Question" />
            </div>
            <FrequentlyAskedQuestions />
          </section>

          <section className="mt-[100px]">
            <div className="flex justify-center items-center mb-12">
              <SectionTitle title="Accredited Agencies" />
            </div>
            <InfiniteMovingCardsDemo />
          </section>
        </div>
      )}
    </section>
  );
}
