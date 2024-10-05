import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "../pars/ThemeContext";
import { RiErrorWarningLine } from "react-icons/ri";

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
        className={`px-6 py-1 text-[16px] font-[500] border-[1px] hover:border-[2px] ${
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
