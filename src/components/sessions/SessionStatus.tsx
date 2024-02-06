import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import Image from "next/image";
import avatar from "@/../public/avatar.png"; // -- TEMP --

const SessionStatus = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col gap-3 p-3 rounded-[16px] ${
        mode === "dark" ? "bg-[var(--dark-color)]" : "bg-[var(--light-color)]"
      }`}
    >
      <div className="w-fit text-[16px] text-white bg-[var(--primary-color1)] px-3 py-1 rounded-full">
        Status: Paused
      </div>
      <div className="flex items-center justify-between gap-7">
        <div>Start time: 4:30:00</div>
        <div>End time: 7:00:00</div>
      </div>
      <div className="flex items-center justify-between">
        <Image
          src={avatar}
          alt="user image"
          width={0}
          height={0}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "100%",
          }}
        />
        <p>Ahmad Ebrahim</p>
      </div>
    </div>
  );
};

export default SessionStatus;
