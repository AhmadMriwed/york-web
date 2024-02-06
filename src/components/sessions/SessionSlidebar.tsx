"use client";
import Image from "next/image";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { Sidenav, Nav } from "rsuite";
import Link from "next/link";
import { ThemeContext } from "../Pars/ThemeContext";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaUserPlus,
  FaPen,
  FaFile,
  FaStarOfLife,
} from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { toggleSlidebar } from "@/store/adminstore/slices/sessions/sessionSlidebarSlice";

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

const SessionSlidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  return (
    <aside
      className={`${
        expanded ? "w-[220px]" : "w-fit"
      } transition-transform duration-[1s] min-h-screen h-fit sticky top-0 left-0 col-start-1 row-span-2 `}
    >
      <Image
        src={"/logo.png"}
        alt=""
        width={90}
        height={90}
        className={`max-w-[130px] mx-auto mt-2 hidden md:block ${
          expanded ? "!block" : "!hidden"
        } transition-all duration-500 `}
      />
      <div className={`px-3 mt-3 ${expanded ? "!block" : "!hidden"}`}>
        <h3 className="text-[18px] text-center font-bold mt-1">
          02. Data Mining
        </h3>
        <p className="text-[14px] text-center">Data Science Course, ID: #342</p>
        <Image
          src={"/register.png"}
          alt=""
          width={130}
          height={130}
          style={{ objectFit: "cover", width: "100%", height: "100px" }}
          className="mt-3 hidden md:block rounded-[6px]"
        />

        <div className="mt-3 text-[#888] text-end">Admin</div>
        <div className="bg-[#888] w-full h-[1px] my-1"></div>
      </div>

      <Sidenav
        className={`${
          mode === "dark" ? "!bg-dark" : "!bg-light"
        } !mt-[10px] transition-all duration-500 !text-inherit`}
        expanded={expanded}
      >
        <Sidenav.Body
          className={`${mode === "dark" ? "!bg-dark" : "!bg-light"} `}
        >
          <Nav
            activeKey="1"
            className={`${mode === "dark" ? "!bg-dark" : "!bg-light"} `}
          >
            <Nav.Item
              eventKey="1"
              icon={
                <FaInfoCircle
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-transparent !py-[10px] !text-[14px] btn"
              as={NavLink}
              href="/admin-dashboard/courses/training-session/session-information"
            >
              Session Information
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={
                <FaStarOfLife
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href="/admin-dashboard/courses/training-session/session-information/life-session"
            >
              Life Session
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              icon={
                <FaUsers
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href="/admin-dashboard/courses/training-session/session-information/joined-users"
            >
              Joined Users
            </Nav.Item>
            <Nav.Item
              eventKey="4"
              icon={
                <FaUserPlus
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href="/admin-dashboard/courses/training-session/session-information/attendance-requests"
            >
              Attendance requests
            </Nav.Item>
            <Nav.Item
              eventKey="5"
              icon={
                <FaPen
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href=""
            >
              Assignments: Exams + Quizzes
            </Nav.Item>
            <Nav.Item
              eventKey="6"
              icon={
                <FaFile
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href=""
            >
              Training Session Report
            </Nav.Item>
            <Nav.Item
              eventKey="7"
              icon={
                <FaHome
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href="/admin-dashboard/courses/training-session"
              onClick={() => dispatch(toggleSlidebar())}
            >
              Home
            </Nav.Item>
            <Nav.Item
              eventKey="8"
              icon={
                <PiStudentLight
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!bg-inherit !py-[10px] !text-[14px]"
              as={NavLink}
              href=""
            >
              Back to course
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

export default SessionSlidebar;
