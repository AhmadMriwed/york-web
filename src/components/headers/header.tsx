"use client";
import React from "react";
import { Button } from "../ui/button";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {};

const Header = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 h-10 w-10"
        >
          <IoArrowBackSharp className="h-6 w-6 text-primary-color1" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-bold text-primary-color1">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
