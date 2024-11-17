"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  images: {
    image: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate the content to create the infinite effect
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      // Set direction and speed
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      const animationDirection = direction === "left" ? "normal" : "reverse";
      containerRef.current.style.setProperty(
        "--animation-direction",
        animationDirection
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "30s" : speed === "normal" ? "40s" : "70s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative -mt-5 z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-2 w-max flex-nowrap bg-gray-100",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative flex-shrink-0 flex items-center justify-center px-8 py-24 md:w-[400px]"
            key={`${item.image}-${idx}`}
          >
            <blockquote>
              <Image
                src={item.image}
                height={240}
                width={240}
                alt={`Image ${idx}`}
              />
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
