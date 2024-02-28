"use client";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionInfo } from "@/store/adminstore/slices/sessions/sessionsActions";
import { getCourseInfo } from "@/store/adminstore/slices/courses/singleCourseSlice";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "../Pars/ThemeContext";
/* icons */
import {
  PiStudentLight,
  PiInfo,
  PiHouseBold,
  PiUsers,
  PiUserPlus,
  PiPen,
  PiFile,
  PiChalkboardTeacher,
} from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
/* components */
import Link from "next/link";
import Image from "next/image";
import { Sidenav, Nav, Loader } from "rsuite";

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

  const { sessionLoading, sessionError, sessionInfo, sessionID } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const {
    isLoading: courseLoading,
    error: courseError,
    courseInfo,
  } = useSelector((state: GlobalState) => state.singleCourse);
  // const dispatch: any = useDispatch();

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
        {sessionError || courseError ? (
          <div className="element-center text-[16px] text-red-500 py-2">
            <MdOutlineErrorOutline />
          </div>
        ) : sessionLoading && courseLoading ? (
          <div className="my-7 element-center">
            <Loader />
          </div>
        ) : (
          <>
            {sessionInfo?.title && (
              <p className="text-[16px] text-center font-bold">
                {sessionInfo.title}
              </p>
            )}
            {courseInfo?.title && courseInfo.code && (
              <p className="text-[12px] text-center">
                {`${courseInfo.title} | code: ${courseInfo.code}`}
              </p>
            )}
            <div className="bg-slate-400 w-full h-[100px] rounded-[8px] mt-2">
              {sessionInfo?.image && (
                <Image
                  src={sessionInfo.image}
                  alt="Session Image"
                  width={400}
                  height={400}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>

            <div className="mt-2 text-[#888] text-end">Admin</div>
            <div className="bg-[#888] w-full h-[1px] my-1"></div>
          </>
        )}
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
                <PiInfo
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
              href={`/admin-dashboard/courses/training-session/session-info/${sessionID}`}
            >
              Session Information
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={
                <PiChalkboardTeacher
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
              href={`/admin-dashboard/courses/training-session/life-session/${sessionID}`}
            >
              Life Session
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              icon={
                <PiUsers
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
              href={`/admin-dashboard/courses/training-session/joined-users/${sessionID}`}
            >
              Joined Users
            </Nav.Item>
            <Nav.Item
              eventKey="4"
              icon={
                <PiUserPlus
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
              href={`/admin-dashboard/courses/training-session/attendance-requests/${sessionID}`}
            >
              Attendance requests
            </Nav.Item>
            <Nav.Item
              eventKey="5"
              icon={
                <PiPen
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
                <PiFile
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
                <PiHouseBold
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
