import React, { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";

import { More } from "@rsuite/icons";

import { Dropdown, IconButton } from "rsuite";
import Image from "next/image";

import avatar from "@/../public/avatar.png"; //TMP

const CourseUser = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="sm"
        circle
        className={`!text-[var(--dark-bg-color)] hover:!bg-transparent`}
      />
    );
  };

  return (
    <>
      <div
        className={`flex justify-between items-center mt-4 p-3 rounded-md text-black ${
          mode === "dark" ? "bg-light" : "bg-white"
        }`}
      >
        <div>
          <div className="flex items-start gap-2">
            <Image
              src={avatar}
              width={40}
              height={40}
              alt=""
              className="rounded-full"
            />

            <div>
              <p className="font-bold">77. Ahmad Ebrahim</p>

              <div className="mt-1 flex items-center flex-wrap gap-2">
                <p className="m-0 text-[12px]">0935 476 102</p>
                <span>|</span>
                <p className="m-0 text-[12px]">ahmad@email.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-2">
          <div>
            <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
              <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                View Report
              </Dropdown.Item>
              <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                Edit Status
              </Dropdown.Item>
              <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                Edit Validity
              </Dropdown.Item>
              <Dropdown.Item className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100">
                Delete
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="mt-1 flex items-center flex-wrap gap-2">
            <p className="m-0 text-[12px]">Status</p>
            <span>|</span>
            <p className="m-0 text-[12px]">Validity</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseUser;
