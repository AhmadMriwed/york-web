"use client";

import { useEffect, useState } from "react";
import { SearchCourse } from "@/lib/action/root_action";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loading/Loader";
import CourseCard from "@/components/cards/CourseCard";
import Image from "next/image";
import { Course } from "@/types/rootTypes/rootTypes";

const Page = () => {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        const filters: any = {};
        const title = searchParams.get("title");
        const code = searchParams.get("code");
        const languages = searchParams.getAll("languages[]");
        const categories = searchParams.getAll("category_ids[]");
        const venues = searchParams.getAll("venue_ids[]");
        const seasons = searchParams.getAll("season_models[]");
        const years = searchParams.getAll("year_models[]");

        if (title) filters.title = title;
        if (code) filters.code = code;
        if (languages.length > 0) filters.languages = languages;
        if (categories.length > 0)
          filters.category_ids = categories.map(Number);
        if (venues.length > 0) filters.venue_ids = venues.map(Number);
        if (seasons.length > 0) filters.season_models = seasons;
        if (years.length > 0) filters.year_models = years;

        const results = await SearchCourse(filters);

        setCourses(results || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {courses.length === 0 ? (
        <div className="h-[70vh] flex items-center flex-col justify-center w-full">
          <Image
            src={"/information/not_found.svg"}
            height={340}
            width={340}
            className="cover mt-16"
            alt="not found"
          />
          <p className="text-primary-color2 mt-8 font-bold text-lg">
            No Courses found
          </p>
        </div>
      ) : (
        <div>
          <div
            className="h-[60vh] flex flex-col items-center justify-center"
            style={{
              backgroundImage: `url("/information/search.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div className="container mx-auto my-6">
            {courses.map((course) => (
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
      )}
    </div>
  );
};

export default Page;
