"use client";

import React, { useEffect, useState } from "react";
import { getCourseById, SearchCourse } from "@/lib/action/root_action";
import Loader from "@/components/loading/Loader";
import { Course } from "@/types/rootTypes/rootTypes";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaEye,
  FaLanguage,
  FaCode,
  FaTag,
} from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
  params: { id: number };
}

const decodeHtmlEntities = (html: string) => {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Courses");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        const relatedCourses = await SearchCourse({
          title: data.title,
        });

        console.log(relatedCourses);
        setCourses(relatedCourses);
        console.log(courses);
      } catch (err) {
        setError("Failed to fetch course data.");
      }
    };

    fetchCourse();
  }, []);
  console.log(courses);

  if (error) {
    return (
      <main className="h-full flex items-center justify-center">
        <h1 className="text-2xl font-bold">{error}</h1>
      </main>
    );
  }

  if (!course) {
    return <Loader />;
  }

  const values = [
    course.code,
    course.category.title,
    course.language,
    course.count_views,
  ];
  const head = [
    t("courseCard.code"),
    t("courseCard.category"),
    t("courseCard.language"),
    t("courseCard.view"),
  ];

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div
        className="h-[30vh] md:h-[45vh] flex flex-col  justify-center bg-gradient-to-r from-primary-color1 to-primary-color2"
        style={{
          backgroundImage: `url(${
            `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${course.image}` ||
            "/information/courses-default.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-primary-color2 text-center md:ml-12 text-xl  md:text-4xl font-bold">
          {course.title}
        </h1>
        {course.sub_title && (
          <p className="text-white text-center font-bold text-lg mt-4">
            {course.sub_title}
          </p>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row container mx-auto my-6 gap-8">
        {/* Left Section - Course Details */}
        <div className="flex-1">
          {/* Details Table */}
          <div className="my-12 bg-white p-6 rounded-lg shadow-md">
            <h2
              className={cn(
                "text-xl font-semibold text-primary-color2 mb-4",
                locale == "en" ? "text-start" : "text-end"
              )}
            >
              {locale === "en" ? "Details" : "التفاصيل"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {head.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 ",
                    locale === "ar" ? "flex-row-reverse" : ""
                  )}
                >
                  {item === "Code" && (
                    <FaCode className="text-primary-color1" />
                  )}
                  {item === "Category" && (
                    <FaTag className="text-primary-color1" />
                  )}
                  {item === "Language" && (
                    <FaLanguage className="text-primary-color1" />
                  )}
                  {item === "Views" && (
                    <FaEye className="text-primary-color1" />
                  )}
                  <span className="font-semibold">
                    {locale === "ar" ? `:${item}` : `${item}:`}
                  </span>
                  <span className="text-gray-500">{values[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Outlines */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2
              className={cn(
                "text-xl font-semibold text-primary-color2 mb-4",
                locale === "ar" ? "text-end" : "text-start"
              )}
            >
              {locale === "ar"
                ? `لماذا اخترت ${course.title}؟ `
                : `Why choose ${course.title}?`}
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: decodeHtmlEntities(course.outlines || "").replace(
                  /\n/g,
                  "<br/>"
                ),
              }}
              className={cn(
                "text-gray-700 space-y-4 ",
                locale === "ar" && "text-end"
              )}
            />
          </div>

          {/* Course Description */}
          {course.description && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2
                className={cn(
                  "text-xl font-semibold text-primary-color2 mb-4",
                  locale === "ar" ? "text-end" : "text-start"
                )}
              >
                {locale === "ar" ? `:التفاصيل` : `Description : `}
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: course.description || "" }}
                className="text-gray-700 space-y-4"
              />
            </div>
          )}
        </div>

        {/* Right Section - Related Courses */}
        <div className="w-full md:w-[350px] relative">
          <div className="bg-white w-full  p-4 rounded-lg shadow-md md:absolute md:-top-44">
            <h2
              className={cn(
                "text-xl font-semibold text-primary-color2 mb-4",
                locale === "ar" ? "text-end" : "text-start"
              )}
            >
              {locale === "ar" ? `:كورسات مشابهة` : `Related Courses: `}
            </h2>
            <ul className="">
              {courses?.map((course) => (
                <li
                  key={course.id}
                  className="flex flex-col p-2 rounded-lg border bg-gray-50 mb-2 hover shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">{course.venue.title}</h2>
                    <button
                      onClick={() =>
                        router.push(
                          `/${locale}/courses/${course.id}/registeration`
                        )
                      }
                      className="bg-primary-color1 hover:bg-primary-color2 px-3 py-1 rounded-sm text-white text-sm"
                    >
                      {locale === "ar" ? `تسجيل` : `Register `}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary-color1" />
                      <span className="text-sm">
                        {course.start_date} {" - "} {course.end_date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMoneyBillAlt className="text-primary-color1" />
                      <span className="text-sm">{course.fee}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
