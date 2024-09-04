"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Badge, Toggle } from "rsuite";
import Drawer from "./Drawer";
import CheckIcon from "@rsuite/icons/Check";
import CloseIcon from "@rsuite/icons/Close";
import { ThemeContext } from "./ThemeContext";
import NoticeIcon from "@rsuite/icons/Notice";
import profile from "../../../public/avatar.png";
import ModalNote from "../notification/ModalNote";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const Topbar = ({ setOpenProfile }: { setOpenProfile: any }) => {
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);

  const [expanded, setExpanded] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <header
      className={`bg-[#86858526] col-span-1 row-span-1 gap-2  py-[6px] px-[20px] flex items-center justify-between flex-wrap relative`}
    >
      <div>
        <input
          placeholder="Search"
          className={`rounded-[20px] border border-white pe-2 ps-3 py-[6px] w-[200px] sm:w-[300px] ${
            mode === "dark"
              ? " bg-[#1d2127] text-white"
              : "bg-white text-[#656565]"
          }  outline-none`}
        />
      </div>
      <div className="flex items-center gap-4 mr-2">
        <Toggle
          checkedChildren={
            <MdOutlineDarkMode
              style={{
                color: "#fff",
                fontSize: "18px",
                marginTop: "3px",
              }}
            />
          }
          unCheckedChildren={
            <MdOutlineLightMode
              style={{
                color: "#32befd",
                fontSize: "18px",
                marginTop: "3px",
              }}
            />
          }
          onChange={toggle}
        />
        <Badge
          content={3}
          className="mr-2 cursor-pointer"
          onClick={() => setOpenNotification(!openNotification)}
        >
          <NoticeIcon className="text-[20px]" />
          <ModalNote
            open={openNotification}
            setOpen={setOpenNotification}
            mode={mode}
          />
        </Badge>
        <button onClick={() => setExpanded(!expanded)}>
          <Image
            src={profile}
            alt="profile image"
            width={30}
            height={30}
            className="rounded-[50%]"
          />
        </button>
      </div>
      <Drawer
        expanded={expanded}
        setExpanded={setExpanded}
        setOpenProfile={setOpenProfile}
      />
    </header>
  );
};

export default Topbar;
