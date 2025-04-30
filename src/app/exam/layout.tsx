"use client";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import Image from "next/image";
import { useContext } from "react";

const AssignmentsLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div>
      <header className="px-8 h-16 w-full bg-white  fixed z-10">
        <Image
          src={"/logo dark.png"}
          height={70}
          width={150}
          alt="logo"
          className="absolute -top-4"
        />
      </header>
      {children}
    </div>
  );
};

export default AssignmentsLayout;
