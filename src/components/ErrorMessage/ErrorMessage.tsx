import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { RiErrorWarningLine } from "react-icons/ri";
import { ThemeContext } from "../Pars/ThemeContext";

const ErrorMessage = ({ msg }: { msg: string }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <div className=" mt-7 flex flex-col items-center gap-4">
      <div className="text-[40px] text-red-500">
        <RiErrorWarningLine />
      </div>
      <p className="text-[16px] text-center font-bold">{msg}</p>
      <button
        className={`px-4 py-1 text-[16px] border-[1px] ${
          mode === "dark" ? "border-white" : "border-black"
        } rounded-full`}
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default ErrorMessage;
