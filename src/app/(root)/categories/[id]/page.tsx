"use client";

import { useEffect, useState } from "react";
import { getCoursesByCategoryId } from "@/lib/action/root_action";
import Loader from "@/components/loading/Loader";
import { Course } from "@/types/rootTypes/rootTypes";
import CourseCard from "@/components/cards/CourseCard";

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const [courses, setCourses] = useState<Course[] | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCoursesByCategoryId(id);
        setCourses(courses);
      } catch (err: any) {
        setError("Failed to fetch category");
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
    <main className="h-full relative">
      {/* Hero Section */}
      <div
        className="h-[80vh] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${
            courses[0]?.category.image
              ?  `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${courses[0]?.category.image}`
              : "/information/Image_defualt.svg"
          })`,
          backgroundSize: `${courses[0]?.category.image ? "cover" : "50"}`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-primary-color1 text-3xl  md:text-7xl font-bold">
          {courses[0]?.category.title}
        </h1>
      </div>
      {/* Content Section */}
      <div className="container mx-auto my-6">
        <div className="p-4">
          <h1 className="p-2 my-8 pl-6 border-l-4 border-primary-color2 text-primary-color1 text-xl md:text-2xl font-semibold">
            {courses[0]?.category.title}
          </h1>
          <div
          dangerouslySetInnerHTML={{ __html: courses[0]?.category.description || "" }}
          className="text-gray-600 "
        />
        </div>
        <div className="w-full my-8">
          {courses?.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              courseId={course.id}
              code={course.code}
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
