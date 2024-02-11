"use client";
import { useState } from "react";
import Image from "next/image";
import { Table } from "rsuite";
import { Close, Check } from "@rsuite/icons";
import Header from "@/components/sessions/Header";

import userImage from "/public/avatar.png"; // --TMP--

const { Column, HeaderCell, Cell } = Table;

// table data
const data = [
  {
    id: 1,
    name: "John Parker",
    requestTime: "3:30:00",
    status: "Accepted",
  },
  {
    id: 2,
    name: "Timothy Hill",
    requestTime: "5:30:00",
    status: "Pending",
  },
  {
    id: 3,
    name: "John Parker",
    requestTime: "3:30:00",
    status: "Accepted",
  },
  {
    id: 4,
    name: "Timothy Hill",
    requestTime: "5:30:00",
    status: "Pending",
  },
  {
    id: 5,
    name: "John Parker",
    requestTime: "3:30:00",
    status: "Accepted",
  },
  {
    id: 6,
    name: "Timothy Hill",
    requestTime: "5:30:00",
    status: "Pending",
  },
  {
    id: 7,
    name: "John Parker",
    requestTime: "3:30:00",
    status: "Accepted",
  },
  {
    id: 8,
    name: "Timothy Hill",
    requestTime: "5:30:00",
    status: "Pending",
  },
  {
    id: 9,
    name: "John Parker",
    requestTime: "3:30:00",
    status: "Accepted",
  },
  {
    id: 10,
    name: "Timothy Hill",
    requestTime: "5:30:00",
    status: "Pending",
  },
];

const filteringBtns: string[] = ["Pending", "Accepted", "Rejected"];

const AttendanceRequests = () => {
  const [filterBy, setFilterBy] = useState<string>("Pending");

  return (
    <section className="px-2 pt-2 lg:px-14 lg:pt-4">
      <Header
        title="Attendance Requests"
        description="Manage all the attendance requests of the session"
        btnTitle="Add Attendant"
        btnAction={() => console.log("attendant added")}
      />
      <div className="mt-10 border-b-[1px] border-[#303030]">
        {filteringBtns.map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 px-4 text-[16px] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName} (3)
          </button>
        ))}
      </div>
      <div className="my-7 max-w-[800px] m-auto">
        <Table
          height={400}
          style={{ borderRadius: "8px", color: "#888" }}
          data={data}
          onRowClick={(rowData) => {}}
        >
          <Column width={75} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={100} align="center" verticalAlign="center">
            <HeaderCell>Image</HeaderCell>
            <Cell style={{ padding: "0" }}>
              <Image
                src={userImage}
                alt="user image"
                width={0}
                height={0}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "100%",
                  overflow: "hidden",
                }}
              />
            </Cell>
          </Column>

          <Column width={175}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={175}>
            <HeaderCell>Request Time</HeaderCell>
            <Cell dataKey="requestTime" />
          </Column>

          <Column width={175}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={100} align="left" verticalAlign="center" fixed="right">
            <HeaderCell>Action</HeaderCell>
            <Cell style={{ padding: "0", paddingLeft: "6px" }}>
              <div className="flex items-center gap-1">
                <button
                  className="bg-[#16FACD] text-white rounded-full w-[30px] h-[30px]
                flex justify-center items-center text-[18px]"
                >
                  <Check />
                </button>
                <button
                  className="bg-[#CC4C4C] text-white rounded-full w-[30px] h-[30px]
                flex justify-center items-center text-[18px]"
                >
                  <Close />
                </button>
              </div>
            </Cell>
          </Column>
        </Table>
      </div>
    </section>
  );
};

export default AttendanceRequests;
