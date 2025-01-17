import Image from "next/image";
import DefaultButton from "@/components/buttons/LinkButton";
import Link from "next/link";
import { category, newsItems, newsItme } from "@/utils/user/home/homePageEnums";

import HomeCourseAds from "@/components/user/home/HomeCourseAds";
import FrequentlyAskedQuestions from "@/components/user/home/FrequentlyAskedQuestions";
import {
  fetchCategories,
  fetchClients,
  fetchQuestions,
  fetchSliders,
  fetchVenues,
  getSectionById,
} from "@/lib/action/root_action";
import Hero from "@/components/user/home/Hero";
import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";

export default async function Home() {
  const questions = await fetchQuestions();
  const venues = await fetchVenues();

  const categories = await fetchCategories();
  const section = await getSectionById(1);
  const sliders = await fetchSliders();
  const clients = await fetchClients();

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
        direction === "col" ? "flex-col" : "flex-col-reverse"
      } justify-center items-center text-center capitalize`}
    >
      <h3 className="text-black text-2xl md:text-3xl font-bold">{title}</h3>
      {desc && <p className="text-[#7d7d7d] text-sm md:text-lg">{desc}</p>}
      <span className="absolute bottom-[-20px] w-full max-w-[200px] h-[2px] bg-[var(--primary-color2)]" />
    </div>
  );

  const NewsCard = ({ item }: { item: newsItme }) => (
    <div className="w-full md:w-[366px] min-h-[405px] p-[20px] bg-[var(--home-color)] rounded-[10px] hover:translate-y-[-6px] duration-300 transition-all cursor-default">
      <div className="relative h-[215px] rounded-b-[10px]">
        <Image src={item.image} alt="news" fill className="rounded-b-[10px]" />
        <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#01989f] to-[var(--home-color)] opacity-80 rounded-b-[10px]" />
        <h3 className="text-white absolute bottom-0 p-3 text-[18px] font-bold leading-[1.1] capitalize">
          {item.title}
        </h3>
      </div>
      <p className="text-sm py-5 text-[#777]">{item.description}</p>
    </div>
  );

  const CategoryCard = ({ item }: { item: category }) => (
    <div className="flex justify-center items-center gap-3 flex-col p-5 md:p-[20px] w-40 h-32 md:w-[230px] md:h-[160px] bg-[var(--home-color)] rounded-[10px] hoverEffect">
      <div className="footer-bg"></div>
      <div className="w-[80px] h-[80px] aspect-[1/1]">
        <Image
          src={item.image ? item.image : "/information/Image_defualt.svg"}
          alt={item.title}
          className="aspect-[3/2] md:aspect-[1/1]"
          width={80}
          height={80}
          loading="lazy"
        />
      </div>
      <p className="text-xs md:text-[15px] font-semibold text-[var(--primary-color2)] text-center capitalize -mt-8 md:mt-0">
        {item.title}
      </p>
    </div>
  );

  const VenueCard = ({ title, img }: { title: string; img: string | null }) => (
    <div className="flex flex-col items-center justify-center">
      <div className="relative hover:scale-105 hover:shadow-[#0000007f] shadow-2xl duration-700 transition-all h-28 overflow-hidden rounded-md ">
        <Image
          src={img ? img : "/information/image_default2.svg"}
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
          <div className="ms-[50px] sm:ms-[80px] relative">
            <SectionTitle
              title="York British Academy"
              desc="Welcome to"
              direction="col-reverse"
            />
          </div>

          <main className="relative home-welcome-bg min-h-[270px] mt-[80px] flex justify-between items-center flex-col sm:flex-row py-[30px] px-[50px] lg:px-[100px] gap-[20px] flex-wrap">
            <div className="w-full h-full absolute top-0 left-0 bg-[#13181eec] bg-opacity-95" />
            <div className="min-w-[100px] lg:ms-[100px] relative">
              <Image src="/logo.png" alt="Logo" width={200} height={200} />
            </div>
            <div className="basis-[50%] relative">
              <p className="text-white mb-3">{section.description}</p>
              <Link
                href="#"
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
              desc="Keep up with our newest feeds"
              direction="col"
            />
            <Link
              href="#"
              className="self-end text-[var(--primary-color1)] hover:text-[var(--primary-color2)] me-[80px] font-semibold text-[20px] capitalize mt-[10px]"
            >
              Read more
            </Link>
          </div>

          <div className="relative mt-[90px]">
            <div className="absolute z-[-1] xl:h-[70%] w-full bg-[#023141] shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] top-[50%] translate-y-[-50%]" />
            <div className="px-[30px] flex items-center gap-[30px] justify-center flex-wrap">
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

        <section className="mt-[100px]">
          <div className="flex justify-center items-center mb-12">
            <SectionTitle title="Accredited Agencies" />
          </div>
          <div className="h-[20rem] rounded-md flex flex-col items-center antialiased bg-gray-100 dark:bg-black dark:bg-grid-white/[0.05] justify-center relative overflow-hidden">
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
