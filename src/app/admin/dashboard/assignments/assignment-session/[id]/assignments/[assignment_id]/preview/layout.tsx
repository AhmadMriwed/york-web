"use client";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { images } from "@/constants/images";
import Image from "next/image";
import { useContext } from "react";

const AssignmentsLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div>
      {/* <header className="px-8 h-20   w-full bg-white  ">
        <Image
          src={images.logo}
          height={70}
          width={150}
          alt="logo"
          className="absolute -top-4"
        />
      </header> */}
      {children}
    </div>
  );
};

export default AssignmentsLayout;
