"use client";
import { useRouter } from "next/navigation";

import { CiExport, CiImport } from "react-icons/ci";

import CourseAd from "@/components/courses/courseAds/CourseAd";
import Filter from "@/components/courses/Filter";

const CoursesAds = () => {
  const router = useRouter();

  return (
    <section className="px-2 pt-6 lg:px-6">
      <div className="flex justify-between items-start gap-4 flex-col sm:flex-row">
        <div>
          <h3 className="font-bold text-[24px] sm:text-[32px] text-[var(--primary-color1)]">
            Course ads
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button className="outlined-btn flex justify-center items-center gap-1">
              <CiImport /> Import
            </button>
            <button className="outlined-btn flex justify-center items-center gap-1">
              <CiExport /> Export
            </button>
          </div>
        </div>
        <Filter />
        <button
          className="colored-btn"
          onClick={() => router.push("/admin-dashboard/courses/course-ads/add")}
        >
          Add New Course Ad
        </button>
      </div>

      <div className="my-7 flex flex-col gap-2">
        {[1, 2, 3, 4].map((_, index) => (
          <CourseAd key={index} />
        ))}
      </div>
    </section>
  );
};

export default CoursesAds;
