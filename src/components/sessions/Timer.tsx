import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { FiClock } from "react-icons/fi";

const Timer = ({ startTime, endTime }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
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
      className={`text-[var(--primary-color1)] font-bold flex items-center gap-2
            rounded-full py-1 px-2 border-[1px] border-[var(--primary-color1)] ${
              mode === "dark"
                ? "bg-[var(--dark-color)]"
                : "bg-[var(--light-color)]"
            }`}
    >
      <FiClock />
      {timeLeft}
    </div>
  );
};

export default Timer;
