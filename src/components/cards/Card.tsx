import React from "react";

interface CourseCardProps {
  code: string;
  venue: string;
  category: string;
  startDate: string;
  endDate: string;
  language: string;
  fee: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  code,
  venue,
  category,
  startDate,
  endDate,
  language,
  fee,
}) => {
  const headers = [
    "CODE",
    "VENUE",
    "CATEGORY",
    "START DATE",
    "END DATE",
    "LANGUAGE",
    "FEE",
  ];
  const values = [code, venue, category, startDate, endDate, language, fee];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 max-w-full mx-auto transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
      {/* Title */}
      <h2 className="text-xl font-semibold text-primary-color2 mb-4">
        Crisis Negotiation
      </h2>
      <div className="flex justify-between md:block">
        {/* Headers */}
        <div className=" flex flex-col md:grid grid-cols-7 gap-4 border-t pt-4">
          {headers.map((header, index) => (
            <div key={index} className="font-bold text-xs">
              {header}
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
  );
};

export default CourseCard;
