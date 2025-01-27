"use client";

import React, { useEffect, useState } from "react";
import { getCourseById } from "@/lib/action/root_action";
import Loader from "@/components/loading/Loader";
import { Course } from "@/types/rootTypes/rootTypes";
import { header } from "@/components/cards/CourseCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  const { id } = params;
  const [course, setCourse] = useState<Course | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
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
    course.venue.title,
    course.category.title,
    course.start_date,
    course.end_date,
    course.language,
    course.fee,
    course.count_views,
  ];
  const head = [...header, "VIEWS"];

  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div
        className="h-[60vh] md:h-[80vh] flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${
            course.image || "/information/courses-default.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="custom-title text-white text-xl text-center md:text-4xl font-bold">
          {course.title}
        </h1>
        {course.sub_title && (
          <p className="text-primary-color2 text-center font-bold text-lg mt-4">
            {course.sub_title}
          </p>
        )}
      </div>

      {/* Content Section */}
      <div className="container mx-auto my-6">
        {/* Course Details */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="p-2 my-8 pl-6 border-l-4 border-primary-color2 text-primary-color1 text-xl md:text-2xl font-semibold">
              {course.title}
            </h1>

            <button
              onClick={() => router.push(`/courses/${id}/registeration`)}
              className="bg-primary-color1 hover:bg-primary-color2 px-3 py-2 rounded-sm text-white"
            >
              Register
            </button>
          </div>

          <div className="mt-6 text-gray-600">
            {course.outlines || "No outlines provided."}
          </div>
        </div>

        {/* Details Table */}
        <div className="my-12">
          <h2 className="text-xl font-semibold text-primary-color2 mb-4">
            Details:
          </h2>
          <div className="flex justify-between md:block">
            {/* Headers */}
            <div className="flex flex-col md:grid grid-cols-8 gap-4 border-t pt-4">
              {head.map((item, index) => (
                <div key={index} className="font-bold text-xs">
                  {item}
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="flex flex-col md:grid grid-cols-8 gap-4 mt-2">
              {values.map((value, index) => (
                <div key={index} className="text-gray-500">
                  {`${value}`}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-gray-700 space-y-6 mt-16">
          {course.description}
        </div>
      </div>
    </main>
  );
};

export default Page;
