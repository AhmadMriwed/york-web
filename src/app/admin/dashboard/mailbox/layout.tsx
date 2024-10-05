"use client";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useContext } from "react";

const MailboxLayout = ({ children }: { children: React.ReactNode }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div
      className={`${
        mode === "dark" ? "mailbox-layer-dark" : "mailbox-layer-light"
      }`}
    >
      {children}
    </div>
  );
};

export default MailboxLayout;
