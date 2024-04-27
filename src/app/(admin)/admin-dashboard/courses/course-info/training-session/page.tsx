"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
/* icons */
import { CiImport, CiExport } from "react-icons/ci";
/* components */
import Session from "@/components/sessions/Session";
import Header from "@/components/Pars/Header";

const filteringBtns: string[] = ["Current", "Upcoming", "Expired"];

const CourseTrainingSession = () => {
  const [filterBy, setFilterBy] = useState<string>("Current");

  const router = useRouter();

  const sessions: any = [
    {
      id: 1,
      owner_id: 33,
      owner: {
        id: 33,
        user_id: 22599,
        first_name: "Ahmad",
        last_name: "Ebrahim",
        email: "ahmad@email.com",
        user_name: "ahmad_ibraheem",
        phone_number: "+96358799",
        image: "",
        about_me: "aboutme",
        gender: "male",
        account_type: "admin",
      },
      course_id: "1",
      code: "88977",
      date_from: new Date(),
      date_to: new Date(),
      outline: "outline",
      title: "title",
      classification_session: "Current",
      start_time: "7:30",
      status: "Active",
      session_status: null,
      description: "description",
      image: null,
      url: "url",
      count_assignments: 20,
      training_session_type: {
        id: "19",
        name: "type name",
        type: "type type",
      },
      files: [],
    },
    {
      id: 1,
      owner_id: 33,
      owner: {
        id: 33,
        user_id: 22599,
        first_name: "Ahmad",
        last_name: "Ebrahim",
        email: "ahmad@email.com",
        user_name: "ahmad_ibraheem",
        phone_number: "+96358799",
        image: "",
        about_me: "aboutme",
        gender: "male",
        account_type: "admin",
      },
      course_id: "1",
      code: "88977",
      date_from: new Date(),
      date_to: new Date(),
      outline: "outline",
      title: "title",
      classification_session: "Current",
      start_time: "7:30",
      status: "Active",
      session_status: null,
      description: "description",
      image: null,
      url: "url",
      count_assignments: 20,
      training_session_type: {
        id: "19",
        name: "type name",
        type: "type type",
      },
      files: [],
    },
    {
      id: 1,
      owner_id: 33,
      owner: {
        id: 33,
        user_id: 22599,
        first_name: "Ahmad",
        last_name: "Ebrahim",
        email: "ahmad@email.com",
        user_name: "ahmad_ibraheem",
        phone_number: "+96358799",
        image: "",
        about_me: "aboutme",
        gender: "male",
        account_type: "admin",
      },
      course_id: "1",
      code: "88977",
      date_from: new Date(),
      date_to: new Date(),
      outline: "outline",
      title: "title",
      classification_session: "Current",
      start_time: "7:30",
      status: "Active",
      session_status: null,
      description: "description",
      image: null,
      url: "url",
      count_assignments: 20,
      training_session_type: {
        id: "19",
        name: "type name",
        type: "type type",
      },
      files: [],
    },
  ];

  return (
    <section className="px-2 pt-6 lg:px-6">
      <Header
        title="Sessions"
        description="Schedule all your Sessions , edit and track your teaching process."
        btnTitle="Add New Session"
        btnAction={() =>
          router.push(
            "/admin-dashboard/courses/course-info/training-session/add"
          )
        }
      />

      <div className="flex items-center gap-2 mt-7">
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiImport /> Import
        </button>
        <button className="outlined-btn flex justify-center items-center gap-1">
          <CiExport /> Export
        </button>
      </div>
      
      <div>
        <div className="mt-7 border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
          {filteringBtns.map((btnName) => (
            <button
              key={btnName}
              onClick={() => setFilterBy(btnName)}
              className={`py-2 sm:px-4 text-[14px] sm:text-[16px] font-[500] ${
                filterBy === btnName
                  ? "border-b-2 border-[var(--primary-color1)]"
                  : ""
              }`}
            >
              {btnName}
              {btnName === "Current"
                ? `(${10})`
                : btnName === "Expired"
                ? `(${10})`
                : `(${10})`}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {sessions.map((session: any, index: number) => (
            <Session key={index} session={session} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseTrainingSession;
