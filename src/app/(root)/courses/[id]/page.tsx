"use client";

import React, { useEffect, useState } from "react";
import { getCourseById, SearchCourse } from "@/lib/action/root_action";
import Loader from "@/components/loading/Loader";
import { Course } from "@/types/rootTypes/rootTypes";
import { header } from "@/components/cards/CourseCard";
import { useRouter } from "next/navigation";
import {
  FaCalendarAlt,
  FaMoneyBillAlt,
  FaEye,
  FaLanguage,
  FaCode,
  FaTag,
} from "react-icons/fa"; // Import icons

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        if (data && data.venue && data.venue.id) {
          const relatedCourses = await SearchCourse({
            title: data.title,
          });
          setCourses(relatedCourses);
        }
      } catch (err) {
        setError("Failed to fetch course data.");
      }
    };

    fetchCourse();
  }, [id]);

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
  const head = ["CODE", "CATEGORY", "LANGUAGE", "VIEWS"];

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
        <h1 className="text-primary-color2 text-start md:ml-12 text-xl  md:text-4xl font-bold">
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
            <h2 className="text-xl font-semibold text-primary-color2 mb-4">
              Details:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {head.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item === "CODE" && (
                    <FaCode className="text-primary-color1" />
                  )}
                  {item === "CATEGORY" && (
                    <FaTag className="text-primary-color1" />
                  )}
                  {item === "LANGUAGE" && (
                    <FaLanguage className="text-primary-color1" />
                  )}
                  {item === "VIEWS" && (
                    <FaEye className="text-primary-color1" />
                  )}
                  <span className="font-semibold">{item}:</span>
                  <span className="text-gray-500">{values[index]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Outlines */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-primary-color2 mb-4">
              Why Choose {`${course.title}`} ?
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: course.outlines || "" }}
              className="text-gray-700 space-y-4"
            />
          </div>

          {/* Course Description */}
          {course.description && (
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h2 className="text-xl font-semibold text-primary-color2 mb-4">
                Description:
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
            <h2 className="text-xl font-semibold text-primary-color2 mb-4">
              Related Courses:
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
                        router.push(`/courses/${course.id}/registeration`)
                      }
                      className="bg-primary-color1 hover:bg-primary-color2 px-3 py-1 rounded-sm text-white text-sm"
                    >
                      Register
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
