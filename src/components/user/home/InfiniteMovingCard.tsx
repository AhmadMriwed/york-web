"use client";

import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import React, { useEffect, useState } from "react";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[20rem] rounded-md flex flex-col items-center antialiased bg-gray-100 dark:bg-black dark:bg-grid-white/[0.05]  justify-center relative overflow-hidden">
      <InfiniteMovingCards images={images} direction="right" speed="slow" />
    </div>
  );
}

const images = [
  {
    image: "/assets/user/home/images/1.png",
  },
  {
    image: "/assets/user/home/images/2.png",
  },
  {
    image: "/assets/user/home/images/3.png",
  },
  {
    image: "/assets/user/home/images/4.png",
  },
  {
    image: "/assets/user/home/images/5.png",
  },
  {
    image: "/assets/user/home/images/6.png",
  },
  {
    image: "/assets/user/home/images/7.png",
  },
  {
    image: "/assets/user/home/images/8.png",
  },
  {
    image: "/assets/user/home/images/9.png",
  },
];
