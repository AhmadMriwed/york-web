"use client";

import { useEffect, useState } from "react";
import { getCoursesByVenueId } from "@/lib/action/root_action";
import Loader from "@/components/loading/Loader";
import { Course } from "@/types/rootTypes/rootTypes";
import CourseCard from "@/components/cards/CourseCard";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { SafeDescription } from "@/components/review/SafeDescription";

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const locale = useLocale();

  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCoursesByVenueId(id);
        setCourses(courses);
      } catch (err: any) {
        setError("Failed to fetch venue data.");
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <main className="h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">{error}</h1>
      </main>
    );
  }

  if (!courses) {
    return <Loader />;
  }

  return (
    <main className="h-full relative block">
      {/* Hero Section */}
      <div
        className="h-[80vh] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${
            courses[0]?.venue.image
              ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${courses[0]?.venue.image}`
              : "/information/image_default2.svg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="custom-title text-white text-4xl font-bold">
          {courses[0]?.venue.title}
        </h1>
      </div>
      {/* Content Section */}
      <div className="container mx-auto my-6">
        <div className="p-4">
          <h1
            style={{
              borderRight: locale === "ar" ? "5px solid #037f85" : "none",
              borderLeft: locale === "ar" ? "none" : "5px solid #037f85 ",
            }}
            className={cn(
              "p-2 my-8 pl-6 border-l-4 border-primary-color2 text-primary-color1 text-xl md:text-2xl font-semibold"
            )}
          >
            {courses[0]?.venue.title}
          </h1>

          <SafeDescription
            description={courses[0]?.venue.description || ""}
            lang={locale}
            color="gray-700"
          />
        </div>
        <div className="w-full my-8">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              code={course.code}
              courseId={course.id}
              title={course.title}
              venue={course.venue.title}
              category={course.category.title}
              startDate={course.start_date}
              endDate={course.end_date}
              language={course.language}
              fee={course.fee}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
