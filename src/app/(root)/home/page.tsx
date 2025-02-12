import Image from "next/image";
import Link from "next/link";
import { category } from "@/utils/user/home/homePageEnums";

import HomeCourseAds from "@/components/user/home/HomeCourseAds";
import FrequentlyAskedQuestions from "@/components/user/home/FrequentlyAskedQuestions";
import {
  fetchAllCourses,
  fetchCategories,
  fetchClients,
  fetchQuestions,
  fetchSliders,
  fetchUpcomingCourses,
  fetchVenues,
  getSectionById,
} from "@/lib/action/root_action";
import Hero from "@/components/user/home/Hero";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { Category } from "@/types/rootTypes/rootTypes";

import UpcomingCourses from "@/components/user/home/UpcomingCourses";
import WorldMap from "@/components/user/home/WorlMap";
export default async function Home() {
  const questions = await fetchQuestions();
  const venues = await fetchVenues();

  const categories = await fetchCategories();
  const section = await getSectionById(1);
  const sliders = await fetchSliders();
  const clients = await fetchClients();
  const upComingCourses = await fetchUpcomingCourses();

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
      className={`relative flex mx-auto text-center ${
        direction === "col" ? "flex-col" : "flex-col-reverse"
      } justify-center items-center  capitalize`}
    >
      <h3 className="text-black text-2xl md:text-3xl font-bold">{title}</h3>
      {desc && <p className="text-[#7d7d7d] text-sm md:text-lg">{desc}</p>}
      <span className="absolute bottom-[-20px] w-full max-w-[200px] h-[2px] bg-[var(--primary-color2)]" />
    </div>
  );

  const CategoryCard = ({ item }: { item: Category }) => (
    <div className="flex justify-center items-center  flex-col p-2 md:p-[20px] w-40 h-32 md:w-[230px] md:h-[160px] bg-[var(--home-color)] rounded-[10px] hoverEffect">
      <div className="footer-bg"></div>
      <Image
        // src={
        //   item.image_icon
        //     ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${item.image_icon}`
        //     : "/information/Image_defualt.svg"
        // }
        src={"/information/contract management.png"}
        width={160}
        height={160}
        alt={"placeholder"}
        className={`bg-cover ${item.image || "-mt-24 block"}`}
      />
      <p className=" -mt-2 font-semibold text-sm text-white group-hover:text-primary-color2">
        {item.title}
      </p>
    </div>
  );

  const VenueCard = ({ title, img }: { title: string; img: string | null }) => (
    <div className="relative flex flex-col items-center justify-center group">
      <div className="relative hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md">
        <Image
          src={
            img
              ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${img}`
              : "/information/image_default2.svg"
          }
          width={200}
          height={200}
          alt="placeholder"
          className="bg-cover h-full w-full"
        />

        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-white font-semibold text-sm">{title}</p>
        </div>
      </div>

      <p className="mt-3 font-semibold text-sm group-hover:opacity-0 transition-opacity duration-500">
        {title}
      </p>
    </div>
  );

  return (
    <section className="relative duration-400">
      <div>
        <section className="home-landing-bg">
          <Hero sliders={sliders} />
        </section>
        <HomeCourseAds />

        <section className="relative -mt-16">
          <SectionTitle title="Welcome To" direction="col" />
          <div className=" w-fit  mx-auto relative">
            <Image src={"/logo york.gif"} width={300} height={300} alt="logo" />
          </div>

          <main className="relative  min-h-[270px] mt-[80px] flex justify-between items-center flex-col sm:flex-row py-[30px] px-[50px] lg:px-[100px] gap-[20px] flex-wrap">
            <Image
              src="/assets/user/home/welcome-bg.jpg"
              alt="Example image"
              fill
              className="cover"
              loading="eager"
            />
            <div className="w-full h-full absolute top-0 left-0 bg-[#13181eec] bg-opacity-95" />
            <div className="min-w-[100px] lg:ms-[100px] relative">
              <Image src="/logo.png" alt="Logo" width={340} height={340} />
            </div>
            <div className="basis-[50%] relative">
              <h1
                dangerouslySetInnerHTML={{ __html: section.description || "" }}
                className="text-white text-center mb-4 leading-6"
              />
              <Link
                href="#"
                className="text-primary-color1 hover:text-primary-color2 "
              >
                Read More
              </Link>
            </div>
          </main>
        </section>

        <section className="mt-[130px] text-center w-full">
          <div className="mx-auto flex justify-between flex-col gap-7 flex-wrap">
            <SectionTitle
              title="York News"
              desc="Keep up with our newest feeds"
              direction="col"
            />
            <Link
              href="#"
              className="self-end text-[var(--primary-color1)] mx-auto hover:text-[var(--primary-color2)] font-semibold text-[20px] capitalize mt-[10px]"
            >
              Read more
            </Link>
          </div>

          <UpcomingCourses upComingCourses={upComingCourses} />
        </section>

        <section className="mt-[160px]" id="categories">
          <div className="flex justify-center items-center mb-16">
            <SectionTitle title="Categories" />
          </div>
          <div className="w-[100vw] home-welcome-bg  py-4">
            <main className="px-[30px] grid grid-cols-2 relative gap-10 md:grid-cols-5 mt-[90px] md:gap-8 mx-auto mb-[30px] md:w-[85%] justify-items-center text-center">
              {categories?.map((item: category) => (
                <Link
                  key={item.id}
                  href={`/categories/${item.id}`}
                  passHref
                  className="block hover:no-underline hover:cursor-pointer min-h-full hover:text-primary-color2"
                >
                  <div className="min-h-full">
                    <CategoryCard item={item} />
                  </div>
                </Link>
              ))}
            </main>
          </div>
        </section>

        <section className="mt-[100px]">
          <div className="flex justify-center items-center">
            <SectionTitle title="Venues" />
          </div>
          <main className="px-[30px] grid grid-cols-2 md:flex justify-center flex-wrap mt-[90px] gap-[25px] mb-[30px]">
            {venues?.map((item) => (
              <Link
                key={item.id}
                href={`/venues/${item.id}`}
                passHref
                className="block hover:no-underline"
              >
                <div>
                  <VenueCard title={item.title} img={item.image} />
                </div>
              </Link>
            ))}
          </main>
        </section>

        <section className="mt-[100px]">
          <div className="flex justify-center items-center">
            <SectionTitle title="Frequently Asked Questions" />
          </div>
          <FrequentlyAskedQuestions questions={questions} />
        </section>
        <section className="mt-[100px] -my-36 my md:mb-8">
          <div className="flex justify-center items-center mb-12">
            <SectionTitle title="Regional Offices" />
          </div>
          <WorldMap />
        </section>

        <section className="mt-[30px]">
          <div className="flex justify-center items-center mb-12">
            <SectionTitle title="Accredited Agencies" />
          </div>
          <div className="h-[15rem] rounded-md flex flex-col items-center antialiased bg-gray-100 dark:bg-black dark:bg-grid-white/[0.05] justify-center relative overflow-hidden">
            {clients.length > 0 ? (
              <InfiniteMovingCards
                clients={clients}
                direction="right"
                speed="slow"
              />
            ) : (
              <div>Loading clients...</div>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
