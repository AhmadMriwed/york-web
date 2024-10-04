"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Badge, Toggle } from "rsuite";
import Drawer from "./Drawer";
import { ThemeContext } from "./ThemeContext";
import NoticeIcon from "@rsuite/icons/Notice";
import profile from "../../../public/avatar.png";
import ModalNote from "../notification/ModalNote";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import Cookies from "universal-cookie";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";

const Topbar = ({ setOpenProfile }: { setOpenProfile: any }) => {
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);

  const [expanded, setExpanded] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const {
    error,
    loadingPass,
    loading,
    adminProfile,
    profileLoading,
    profileError,
  } = useSelector((state: GlobalState) => state.authSlice);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (!adminProfile) {
      // console.log("request");
      let cookie = new Cookies();
      let token = cookie.get("admin_token");
      console.log("token", cookie.get("admin-token"));
      dispatch(getAdminProfile());
    }
  }, [adminProfile, dispatch]);

  let cookie = new Cookies();
  let token = cookie.get("admin_token");
  console.log("token", token);

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

      <div className="flex items-center gap-4 mr-2 flex-wrap">
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

        {adminProfile?.id && (
          <p className="leading-[1.2] text-[12px] m-0 hidden md:block">
            ID : {adminProfile.id}
          </p>
        )}

        {adminProfile?.account_type && (
          <p className="text-[var(--primary-color2)] leading-[1.2] text-[14px] m-0 hidden md:block">
            {adminProfile.account_type}
          </p>
        )}

        {adminProfile?.first_name && adminProfile.email && (
          <div className="hidden md:block">
            <p className="leading-[1.2] text-[14px] m-0">
              {adminProfile.first_name + " " + adminProfile.last_name}
            </p>
            <p className="leading-[1.2] text-[10px] m-0">
              {adminProfile.email}
            </p>
          </div>
        )}

        <Image
          src={profile}
          alt="profile image"
          width={30}
          height={30}
          className="rounded-[50%] min-w-[30px]"
          onClick={() => setExpanded(!expanded)}
        />
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
