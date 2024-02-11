"use client";
import { useState } from "react";
import Image from "next/image";
import { IconButton, Table, Dropdown, Popover, Whisper } from "rsuite";
import MoreIcon from "@rsuite/icons/More";
import Header from "@/components/sessions/Header";

import userImage from "/public/avatar.png"; // --TMP--

const { Column, HeaderCell, Cell } = Table;

// table data
const data = [
  {
    id: 1,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 2,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
  {
    id: 3,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 4,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
  {
    id: 5,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 6,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
  {
    id: 7,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 8,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
  {
    id: 7,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 8,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
  {
    id: 9,
    name: "John Parker",
    joinTime: "3:30:00",
    exitTime: "4:30:00",
    status: "Joined",
  },
  {
    id: 10,
    name: "Timothy Peterson",
    joinTime: "8:00:00",
    exitTime: "10:00:00",
    status: "Expiled",
  },
];

const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
  const handleSelect = (eventKey: any) => {
    onClose();
    // console.log(eventKey);
  };
  return (
    <Popover ref={ref} className={className} style={{ left, top }} full>
      <Dropdown.Menu onSelect={handleSelect}>
        <Dropdown.Item
          eventKey={1}
          // onClick={() => onClose()}
          className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
        >
          View user report
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={2}
          // onClick={() => onClose()}
          className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
        >
          Edit status
        </Dropdown.Item>
        <Dropdown.Item
          eventKey={1}
          // onClick={() => onClose()}
          className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
        >
          Expel / Rejoin
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
  );
};

const ActionCell = ({ rowData, dataKey, ...props }: any) => {
  return (
    <Cell {...props} className="link-group" style={{ padding: "6px" }}>
      <Whisper placement="leftStart" trigger="click" speaker={renderMenu}>
        <IconButton icon={<MoreIcon />} circle />
      </Whisper>
    </Cell>
  );
};

const filteringBtns: string[] = ["Trainers", "Trainees", "Clients"];

const JoinedUsers = () => {
  const [filterBy, setFilterBy] = useState<string>("Trainers");

  return (
    <section className="px-2 pt-2 lg:px-14 lg:pt-4">
      <Header
        title="Joined Users"
        description="Manage all the joined users of the session"
        btnTitle="Add User"
        btnAction={() => console.log("user added")}
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
            {btnName} (2)
          </button>
        ))}
      </div>
      <div className="my-7 max-w-[950px] m-auto">
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
            <HeaderCell>Join Time</HeaderCell>
            <Cell dataKey="joinTime" />
          </Column>

          <Column width={175}>
            <HeaderCell>Exit Time</HeaderCell>
            <Cell dataKey="exitTime" />
          </Column>

          <Column width={175}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={75} fixed="right">
            <HeaderCell>Edit</HeaderCell>
            <ActionCell dataKey="id" />
          </Column>
        </Table>
      </div>
    </section>
  );
};

export default JoinedUsers;
