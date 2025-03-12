import React from "react";
import Image from "next/image";

export const NotFoundSection = ({ title }: { title: string }) => {
  return (
    <div className="h-[70vh] flex items-center flex-col justify-center w-full">
      <Image
        src={"/information/not_found.svg"}
        height={300}
        width={300}
        className="cover mt-16"
        alt="not found"
      />
      <p className="text-primary-color2 mt-8 font-bold text-lg">{title}</p>
    </div>
  );
};
