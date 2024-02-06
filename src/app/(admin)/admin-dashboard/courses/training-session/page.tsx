"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Session from "@/components/sessions/Session";
import Header from "@/components/sessions/Header";
import { FaFileImport, FaFileExport } from "react-icons/fa";

// Filtering Buttons Data
const filteringBtns: string[] = ["Current", "Upcoming", "Expired"];
// -- TEMP --
const cards = [1, 2, 3];

const TrainingSession = () => {
  const router = useRouter();
  // depend on the api endpoint I will change the state case to lower or captalize, Also the type<string>.
  const [filterBy, setFilterBy] = useState<string>("Current");

  return (
    <section className="px-2 pt-2 lg:px-14 lg:pt-4">
      <Header
        title="Sessions"
        description="Schedule all your Sessions , edit and track your teaching process"
        btnTitle="Add Session"
        btnAction={() =>
          router.push("/admin-dashboard/courses/training-session/new-session")
        }
      />
      <div className="flex gap-3 items-center flex-wrap">
        <div>
          <button className="colored-btn flex justify-center items-center gap-2">
            <FaFileImport /> Import
          </button>
        </div>
        <div>
          <button className="colored-btn flex justify-center items-center gap-2">
            <FaFileExport /> Export
          </button>
        </div>
      </div>
      <div className="mt-10 border-b-[1px] border-[#303030]">
        {filteringBtns.map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 px-4 text-[16px] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName} (6)
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {cards.map((card) => (
          <Session key={card} />
        ))}
      </div>
    </section>
  );
};

export default TrainingSession;
