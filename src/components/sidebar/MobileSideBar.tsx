"use client";
import React from "react";
import { Drawer } from "antd";

import { SidebarBody } from "./Sidebar";
import { IoArrowBack } from "react-icons/io5";

const MobileSideBar = ({ open, onClose }: { open: boolean; onClose: any }) => {
  return (
    <Drawer
      placement="left"
      className="custom-scrollbar"
      styles={{
        wrapper: {
          width: 280,
        },
        body: {
          padding: 0,
          overflow: "hidden",
        },
      }}
      onClose={onClose}
      open={open}
      style={{
        background: "linear-gradient(180deg, #212a34 0%, #13181e 100%)",
        color: "white",
      }}
      closeIcon={
        <IoArrowBack className={`text-primary-color2 font-semibold text-2xl`} />
      }
    >
      <div
        className="custom-scrollbar"
        style={{ height: "100%", overflowY: "auto" }}
      >
        <SidebarBody />
      </div>
    </Drawer>
  );
};

export default MobileSideBar;
