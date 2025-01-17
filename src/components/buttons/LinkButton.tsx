"use client";

import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
  className?: string;
}

export default function LinkButton({ text, link, className }: ButtonProps) {
  return (
    <Link href={`${link}`}>
      <button
        className={`bg-[var(--primary-color1)] w-fit text-white px-10 py-2 rounded-[6px] capitalize hover:bg-[var(--primary-color2)] transition-all duration-300 ${className}`}
      >
        {text}
      </button>
    </Link>
  );
}
