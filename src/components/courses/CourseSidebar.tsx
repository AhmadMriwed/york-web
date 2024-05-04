"use client";
import { Ref, forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";

import {
  PiCertificate,
  PiFile,
  PiHouseBold,
  PiInfo,
  PiPen,
  PiUsers,
} from "react-icons/pi";
import { MdOutlineErrorOutline, MdOutlineModelTraining } from "react-icons/md";

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

const CourseSidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const {
    isLoading: courseLoading,
    error: courseError,
    courseInfo,
  } = useSelector((state: GlobalState) => state.courses);

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
      url: `trainers/${courseInfo?.id}`,
    },
    {
      id: 2,
      title: "Trainees",
      url: `trainees/${courseInfo?.id}`,
    },
    {
      id: 3,
      title: "Clients",
      url: `clients/${courseInfo?.id}`,
    },
    {
      id: 4,
      title: "Requests to Join",
      url: `requests-to-join/${courseInfo?.id}`,
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

      <div className={`px-3 mt-3 ${expanded ? "!block" : "!hidden"}`}>
        {courseError ? (
          <div className="element-center text-[16px] text-red-500 py-2">
            <MdOutlineErrorOutline />
          </div>
        ) : courseLoading ? (
          <div className="my-7 element-center">
            <Loader />
          </div>
        ) : (
          <>
            {courseInfo?.title && courseInfo.code && (
              <p className="text-[12px] text-center">
                {`${courseInfo.title} | #${courseInfo.code}`}
              </p>
            )}

            <div className="bg-slate-400 w-full h-[100px] rounded-[8px] mt-2">
              {courseInfo?.image && (
                <Image
                  src={storageURL + courseInfo.image}
                  alt="course image"
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

            <div className="mt-2 text-[#888] text-end">User type: Admin</div>
            <div className="bg-[#888] w-full h-[1px] my-1"></div>
          </>
        )}
      </div>

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
              href={`/admin-dashboard/courses/course-info/${courseInfo?.id}`}
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
              href={`/admin-dashboard/courses/course-info/training-session/${courseInfo?.id}`}
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
              href="/admin-dashboard/courses/my-courses"
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
