"use client";
import Image from "next/image";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { Sidenav, Nav } from "rsuite";
import Link from "next/link";
import { ThemeContext } from "../Pars/ThemeContext";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import {
  PiCertificate,
  PiFile,
  PiHouseBold,
  PiInfo,
  PiPen,
  PiStudentLight,
  PiUsers,
} from "react-icons/pi";
import { MdOutlineModelTraining } from "react-icons/md";
import { MdOutlineAssignment } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { GrCertificate } from "react-icons/gr";
import { MdManageAccounts } from "react-icons/md";
import { VscSymbolEnum } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";
import { MdLanguage } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

interface NavLinkProps {
  as: string;
  href: string;
}

const NavLink = forwardRef(
  (props: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { as, href, ...rest } = props;
    return <Link href={href} as={as} ref={ref} {...rest} />;
  }
);

NavLink.displayName = "NavLink";

const CourseSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);

  const accountType = "Admin";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 786) {
          setExpanded(false);
        } else {
          setExpanded(true);
        }
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const joinedUsers = [
    {
      id: 1,
      title: "Trainers",
      url: "trainers",
    },
    {
      id: 2,
      title: "Trainees",
      url: "trainees",
    },
    {
      id: 3,
      title: "Clients",
      url: "clients",
    },
    {
      id: 4,
      title: "Requests to Join",
      url: "requests-to-join",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Exams",
    },
    {
      id: 2,
      title: "Quizes",
    },
  ];

  return (
    <aside
      className={`${
        expanded ? "w-[200px]" : "w-fit"
      } dark_gradient_background sidebar-text-color min-h-screen h-fit ${"sticky"} top-0 left-0 col-start-1 row-span-2 `}
    >
      <Image
        src={"/logo.png"}
        alt=""
        width={expanded ? 90 : 50}
        height={expanded ? 90 : 50}
        className={`max-w-[130px] mx-auto mt-2 `}
      />

      {expanded && (
        <p className="px-2 mx-3 my-4 text-center">
          Welcome To Course #122555 Dashboard
        </p>
      )}

      <Sidenav
        className={`!bg-inherit !mt-[10px] transition-all duration-500 !text-inherit`}
        expanded={expanded}
        // appearance="subtle"
      >
        <Sidenav.Body className="bg-inherit">
          <Nav activeKey="1" className="bg-inherit">
            <Nav.Item
              eventKey="1"
              icon={
                <PiInfo
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href="/admin-dashboard/courses/course-info/2"
            >
              Information Course
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={
                <MdOutlineModelTraining
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href="/admin-dashboard/courses/course-info/training-session"
            >
              Training Sessions
            </Nav.Item>
            <Nav.Menu
              eventKey="3"
              title="Joined Users"
              icon={
                <PiUsers
                  style={{
                    position: "absolute",
                    top: "18px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
            >
              {joinedUsers.map((item) => {
                return (
                  <Nav.Item
                    key={item.id}
                    eventKey={`3-${item.id}`}
                    className="!py-[5px] transition-all duration-500 !bg-inherit hover:translate-x-2 text-[13px]"
                    as={NavLink}
                    href={`/admin-dashboard/courses/course-info/joined-users/${item.url}`}
                  >
                    {item.title}
                  </Nav.Item>
                );
              })}
            </Nav.Menu>
            <Nav.Menu
              eventKey="4"
              title="Assignments"
              icon={
                <PiPen
                  style={{
                    display: "inline",
                    position: "absolute",
                    top: "18px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
            >
              {assignments.map((item) => {
                return (
                  <Nav.Item
                    key={item.id}
                    eventKey={`7-${item.id}`}
                    className="!py-[5px] !bg-inherit transition-all duration-500 hover:translate-x-2  text-[13px] "
                  >
                    {item.title}
                  </Nav.Item>
                );
              })}
            </Nav.Menu>
            <Nav.Item
              eventKey="5"
              icon={
                <PiCertificate
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href=""
            >
              Certificates
            </Nav.Item>
            <Nav.Item
              eventKey="6"
              icon={
                <PiFile
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href=""
            >
              Course Report
            </Nav.Item>
            <Nav.Item
              eventKey="7"
              icon={
                <PiHouseBold
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href=""
            >
              Home
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle
          expanded={expanded}
          onToggle={(expanded) => setExpanded(expanded)}
          className="!bg-inherit [&>*]:!text-inherit !border-none [&>*]:!bg-inherit"
        />
      </Sidenav>
    </aside>
  );
};

export default CourseSidebar;
