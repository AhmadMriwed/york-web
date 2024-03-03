import React, { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

const Timer = ({ startTime, endTime }: any) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime.getTime() - startTime.getTime();

      if (elapsedTime >= endTime.getTime() - startTime.getTime()) {
        clearInterval(timerInterval);
        setTimeLeft("Time is up!");
      } else {
        const remainingTime = endTime.getTime() - currentTime.getTime();
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        setTimeLeft(`${hours}h : ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [startTime, endTime]);

  return (
    <div
      className="text-[var(--primary-color1)] text-[12px] font-bold flex items-center gap-2
            rounded-full p-1 sm:py-1 sm:px-2 bg-[var(--dark-color)] border border-[var(--primary-color1)]"
    >
      <FiClock />
      {timeLeft}
    </div>
  );
};

export default Timer;
