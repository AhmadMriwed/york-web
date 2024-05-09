import { Search } from "@rsuite/icons";
import React from "react";

const EmptyResult = () => {
  return (
    <div className="m-11 flex flex-col justify-center items-center gap-7">
      <Search style={{ fontSize: "2.4rem" }} />
      <p className="text-[18px] font-[500]">No results found!</p>
    </div>
  );
};

export default EmptyResult;
