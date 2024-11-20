import { SearchForm } from "@/components/forms/SearchForm";
import React from "react";

type Props = {};

const page = () => {
  return (
    <main className="h-full relative">
      {/* Hero Section */}
      <div className="certificates-bg h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-5xl w-full  md:max-w-[60%] mx-auto text-white font-bold text-center">
          SEARCH FOR CERTIFICATES ACCREDITED
        </h1>
        <div className="w-[50%] mx-auto mt-16">
          <SearchForm placeholder={"Enter Certificate ID"} />
        </div>
      </div>
    </main>
  );
};

export default page;
