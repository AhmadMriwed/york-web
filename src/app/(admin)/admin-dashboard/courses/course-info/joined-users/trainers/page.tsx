"use client";
import React from "react";

import Header from "@/components/Pars/Header";
import CourseUser from "@/components/courses/CourseUser";

const JoinedTrainers = () => {
  return (
    <section className="p-3 sm:p-6">
      <Header
        title="Course Trainers"
        btnTitle="Add Trainer"
        btnAction={() => {}}
      />

      <div className="mt-7 sm:px-11">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <CourseUser key={item} />
        ))}
      </div>
    </section>
  );
};

export default JoinedTrainers;
