"use client"; // Mark this as a Client Component

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  code: string;
  courseId: number | string;
  venue: string;
  category: string;
  startDate: string;
  title: string;
  endDate: string;
  language: string;
  fee: string;
  image: string | null;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  code,
  venue,
  category,
  startDate,
  endDate,
  language,
  courseId,
  fee,
  image,
}) => {
  const t = useTranslations("Courses");
  const locale = useLocale();
  const header = [
    t("courseCard.code"),
    t("courseCard.venue"),
    t("courseCard.category"),
    t("courseCard.startDate"),
    t("courseCard.endDate"),
    t("courseCard.language"),
    t("courseCard.fee"),
  ];

  const values = [code, venue, category, startDate, endDate, language, fee];

  return (
    <Link
      href={`/${locale}/courses/${courseId}`}
      className="hover:no-underline hover:text-primary-color2"
    >
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-5 p-6 max-w-full mx-auto transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md text-center flex flex-col md:flex-row gap-6 items-center">
        <Image
          src={
            image
              ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${image}`
              : "/information/courses-default.png"
          }
          width={140}
          height={140}
          className="bg-cover"
          alt="course-image"
        />

        <div className="flex-1 w-full">
          {/* Title */}
          <h2 className="text-xl font-semibold text-primary-color2 mb-4">
            {title}
          </h2>
          <div className="flex justify-between w-full md:block">
            {/* Headers */}
            <div className="flex flex-col md:grid grid-cols-7 gap-4 border-t pt-4">
              {header.map((item, index) => (
                <div
                  key={index}
                  className="font-bold text-sm text-primary-color2"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="flex flex-col md:grid grid-cols-7 gap-4 mt-2">
              {values.map((value, index) => (
                <div key={index} className="text-gray-500">
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
