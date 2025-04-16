"use client";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Badge, Toggle } from "rsuite";
import Drawer from "./Drawer";
import { Button, Modal, Tooltip } from "antd";
import { ThemeContext } from "./ThemeContext";
import NoticeIcon from "@rsuite/icons/Notice";
import profile from "../../../public/avatar.png";
import ModalNote from "../notification/ModalNote";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import Cookies from "universal-cookie";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { Clock10, Globe, MapPin } from "lucide-react";
import Clock from "react-live-clock";
import MobileSideBar from "../sidebar/MobileSideBar";

const Topbar = ({ setOpenProfile }: { setOpenProfile: any }) => {
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);

  const [openNotification, setOpenNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
      dispatch(getAdminProfile());
    }
  }, [adminProfile, dispatch]);

  let cookie = new Cookies();
  let token = cookie.get("admin_token");
  console.log("token", token);

  const showDrawer = () => {
    setOpen(true);
  };

  const openMobileSideBar = () => {
    setShowSideBar(true);
  };
  const onCloseMobileSideBar = () => {
    setShowSideBar(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header
      className={`bg-[#86858526] col-span-1 max-w-[100vw] row-span-1 md:px-5 gap-2  py-[6px]  flex items-center justify-between relative`}
    >
      <Button
        ghost
        type="primary"
        className="border-none md:hidden "
        onClick={openMobileSideBar}
      >
        <Image
          src={"/icons/menu.svg"}
          alt="profile image"
          width={20}
          height={20}
          className=" min-w-[20px]"
        />
      </Button>
      <div className="relative flex items-center">
        <Image
          src={"/icons/search.svg"}
          height={20}
          width={20}
          className="h-16 absolute left-2 "
          alt="search"
        />
        <input
          placeholder="Search"
          className={`rounded-[20px] border border-white  placeholder:ml-3 px-8  py-[6px] bg-white w-36 md:w-[300px]  `}
        />
      </div>

      <div className="flex items-center gap-4 mr-4">
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
          className="hidden md:block"
        />

        <Button
          ghost
          type="primary"
          onClick={showModal}
          className="border-none hover:bg-primary-color1 hidden md:block"
        >
          <Tooltip placement="bottom" title="Time">
            <Clock10 color={mode === "dark" ? "white" : "black"} />
          </Tooltip>
        </Button>

        <TimeZoneModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
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

        <div className="hidden md:flex items-center gap-2 justify-between">
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
        </div>

        <Button
          ghost
          type="primary"
          className="border-none"
          onClick={showDrawer}
        >
          <Image
            src={profile}
            alt="profile image"
            width={30}
            height={30}
            className="rounded-[50%] min-w-[30px]"
          />
        </Button>
      </div>
      <Drawer open={open} onClose={onClose} />
      <MobileSideBar open={showSideBar} onClose={onCloseMobileSideBar} />
    </header>
  );
};

export default Topbar;

interface TimeZoneModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const TimeZoneModal = ({ isModalOpen, setIsModalOpen }: TimeZoneModalProps) => {
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setCountry(data.country_name || data.country))
      .catch(() => setCountry("Unknown"));
  }, []);

  const handleCancel = () => setIsModalOpen(false);

  return (
    <Modal
      title="Time Zone"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Image
        src="/gif/Time management.gif"
        alt="time"
        width={50}
        height={50}
        className="h-72 w-72 mx-auto"
      />

      {country && (
        <div className=" flex items-center gap-2 w-fit mx-auto">
          <MapPin className={"text-primary-color1"} /> :
          <p className={`font-semibold text-lg `}>
            {country ? country : "Syria"}
          </p>
        </div>
      )}
      <div className="w-fit mt-2 flex items-center gap-2 mx-auto">
        <Clock10 className={"text-primary-color1"} /> :
        <Clock
          format={"h:mm:ss"}
          style={{ fontSize: "1.5em" }}
          ticking={true}
          className={`mx-auto font-semibold `}
        />
      </div>
    </Modal>
  );
};
