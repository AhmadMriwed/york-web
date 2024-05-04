"use client";
import React, { useState } from "react";

import Header from "@/components/Pars/Header";
import UserRequest from "@/components/courses/UserRequest";

const RequestsToJoin = () => {
  const [filterBy, setFilterBy] = useState("Current");

  return (
    <section className="p-3 sm:p-6">
      <Header title="Requests to Join" />
      <div className="border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center sm:px-11 mt-4">
        {["Current", "Rejected", "Accepted"].map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 sm:px-4 text-[16px] font-[500] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName}
          </button>
        ))}
      </div>
      <div className="mt-7 sm:px-11">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <UserRequest key={item} />
        ))}
      </div>
    </section>
  );
};

export default RequestsToJoin;
