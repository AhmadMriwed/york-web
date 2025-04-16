import AssignmentHeader from "@/components/assignments/HeaderAssignment";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="py-8 px-5 sm:px-8 overflow-x-auto max-w-full">
      <header className="flex justify-between items-center flex-wrap gap-2">
        <AssignmentHeader title="Assignment">
          <Link
            href={"/admin/dashboard/assignments/assignment-session/add"}
            className="flex items-center justify-center hover:no-underline h-10 px-5 rounded-[4px]  text-white hover:!text-white bg-[var(--primary-color1)]"
          >
            <span className="text-sm md:text-base ">+ Create New </span>
          </Link>
        </AssignmentHeader>
      </header>
    </main>
  );
};

export default page;
