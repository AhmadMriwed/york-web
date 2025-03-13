"use client";
import Image from "next/image";
import { Upcoming_Course } from "@/types/rootTypes/rootTypes";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from "@/components/ui/carousel";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SafeDescription } from "@/components/review/SafeDescription";

// مكون البطاقة
const NewsCard = ({ item, lang }: { item: Upcoming_Course; lang: string }) => (
  <div className="w-full md:w-[366px] min-h-[405px] p-[20px] bg-[var(--home-color)] text-center rounded-xl hover:shadow-2xl duration-300 transition-all cursor-default">
    <div className="relative h-[215px] rounded-lg w-full text-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${item.img}`}
        alt="news"
        fill
        className="rounded-lg"
      />
      <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b rounded-lg from-[#01989f] to-[var(--home-color)] opacity-80 rounded-b-[10px]" />
      <h3
        className={cn(
          `text-white absolute bottom-0 w-full p-3 text-[18px] mx-auto text-center font-bold leading-[1.1] capitalize`
        )}
      >
        {item.title}
      </h3>
    </div>
    <SafeDescription description={item.description} lang={lang} color="white" />
  </div>
);

// المكون الرئيسي
const UpcomingCourses = ({
  upComingCourses,
}: {
  upComingCourses: Upcoming_Course[];
}) => {
  const lang = useLocale();

  return (
    <div className="relative mt-[150px] mb-48 p-4">
      <div className="absolute z-[-1] xl:h-[72%] max-w-full w-full bg-[#023141] shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] top-[50%] translate-y-[-50%]" />

      <div className="relative w-full px-4">
        <Carousel>
          <CarouselContent className="-ml-4">
            {upComingCourses.map((item: Upcoming_Course) => (
              <CarouselItem className="md:basis-1/3 pl-4" key={item.title}>
                <div className="flex aspect-square relative z-50 justify-center">
                  <NewsCard key={item.id} item={item} lang={lang} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation
            className="absolute -bottom-24 left-auto top-auto w-full justify-center gap-2"
            classNameButton="bg-primary-color1 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
            alwaysShow
          />
        </Carousel>
      </div>
    </div>
  );
};

export default UpcomingCourses;
