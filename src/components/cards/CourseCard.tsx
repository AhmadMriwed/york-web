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

export const header = [
  "CODE",
  "VENUE",
  "CATEGORY",
  "START DATE",
  "END DATE",
  "LANGUAGE",
  "FEE",
];

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
  const values = [code, venue, category, startDate, endDate, language, fee];
  console.log(title);
  return (
    <Link
      href={`/courses/${courseId}`}
      className="hover:no-underline hover:text-primary-color2"
    >
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-5 p-6 max-w-full mx-auto transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md  text-center flex flex-col md:flex-row gap-6 items-center">
        <Image
          // src={image ? image : "/information/courses-default.png"}
          src={"/information/courses-default.png"}
          width={80}
          height={80}
          className=""
          alt="course-image"
        />

        <div className=" flex-1">
          {/* Title */}
          <h2 className="text-xl font-semibold text-primary-color2 mb-4">
            {title}
          </h2>
          <div className="flex justify-between md:block">
            {/* Headers */}
            <div className=" flex flex-col md:grid grid-cols-7 gap-4 border-t pt-4">
              {header.map((item, index) => (
                <div key={index} className="font-bold text-xs">
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
