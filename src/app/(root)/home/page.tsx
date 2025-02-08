import Image from "next/image";
import DefaultButton from "@/components/buttons/LinkButton";
import Link from "next/link";
import { category } from "@/utils/user/home/homePageEnums";

import HomeCourseAds from "@/components/user/home/HomeCourseAds";
import FrequentlyAskedQuestions from "@/components/user/home/FrequentlyAskedQuestions";
import {
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
import { Upcoming_Course } from "@/types/rootTypes/rootTypes";

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

  const CategoryCard = ({ item }: { item: category }) => (
    <div className="flex flex-col items-center justify-center">
    <div className="relative hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md ">
      <Image
        src={item.image ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${item.image}` : "/information/image_default2.svg"}
        width={200}
        height={200}
        alt={"placeholder"}
        className={`bg-cover ${item.image || "-mt-10"}`}
      />
    </div>
      <p className="mt-3 font-semibold text-sm">{item.title}</p>
    </div>
  );

  const VenueCard = ({ title, img }: { title: string; img: string | null }) => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md ">
        <Image
          src={img ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${img}` : "/information/image_default2.svg"}
          width={200}
          height={200}
          alt={"placeholder"}
          className={`bg-cover ${img || "-mt-10"}`}
        />
      </div>
      <p className="mt-3 font-semibold text-sm">{title}</p>
    </div>
  );

  return (
    <section className="relative duration-400">
      <div>
        <section className="home-landing-bg">
          <Hero sliders={sliders} />
        </section>
        <HomeCourseAds />

        <section className="relative">
          <div className=" w-fit  mx-auto relative">
            <SectionTitle
              title="York British Academy"
              desc="Welcome to"
              direction="col-reverse"
            />
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
              <Image src="/logo.png" alt="Logo" width={200} height={200} />
            </div>
            <div className="basis-[50%] relative">
              <div
                dangerouslySetInnerHTML={{ __html: section.description || "" }}
                className="text-white text-center mb-4 "
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
          <div className="flex justify-center items-center">
            <SectionTitle title="Categories" />
          </div>

          <main className="px-[30px] grid grid-cols-2 gap-10 md:flex justify-center flex-wrap mt-[90px] md:gap-5 mx-auto mb-[30px] mr-6">
            {categories.map((item: category) => (
              <Link
                key={item.id}
                href={`/categories/${item.id}`}
                passHref
                className="block hover:no-underline hover:cursor-pointer"
              >
                <div>
                  <CategoryCard item={item} />
                </div>
              </Link>
            ))}
          </main>
        </section>

        <section className="mt-[100px]">
          <div className="flex justify-center items-center">
            <SectionTitle title="Venues" />
          </div>
          <main className="px-[30px] grid grid-cols-2 md:flex justify-center flex-wrap mt-[90px] gap-[25px] mb-[30px]">
            {venues.map((item) => (
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
        <section className="mt-[100px] -mb-36 md:mb-8">
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
