"use client";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Sidenav, Nav } from "rsuite";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeContext } from "../Pars/ThemeContext";

// Icons
import { RiDashboardLine } from "react-icons/ri";
import { PiStudentLight } from "react-icons/pi";
import {
  MdManageAccounts,
  MdOutlineModelTraining,
  MdOutlineAssignment,
  MdOutlineMarkunreadMailbox,
  MdLanguage,
  MdOutlineLightMode,
  MdOutlineDarkMode,
} from "react-icons/md";
import { GrAnnounce, GrCertificate } from "react-icons/gr";
import { VscSymbolEnum } from "react-icons/vsc";
import { CiSettings, CiLogout } from "react-icons/ci";

interface NavLinkProps {
  as: string;
  href: string;
  children?: React.ReactNode;
}

const NavLink = forwardRef(
  (props: NavLinkProps, ref: Ref<HTMLAnchorElement>) => {
    const { as, href, ...rest } = props;
    return <Link href={href} as={as} ref={ref} {...rest} />;
  }
);

NavLink.displayName = "NavLink";

export const menuItems = {
  courses: [
    { id: 1, title: "My Courses", url: "my-courses" },
    { id: 2, title: "Submit Courses", url: "submit-courses" },
    { id: 3, title: "Course Requests", url: "course-requests" },
    { id: 4, title: "Course Ads", url: "course-ads" },
    { id: 5, title: "Training Plan", url: "training-plan" },
    { id: 6, title: "Training Session", url: "training-session" },
  ],
  assignments: [
    { id: 1, title: "Assignments Session ", url: "assignment-session" },
    { id: 2, title: "Assignments Course", url: "assignment-course" },
    {
      id: 3,
      title: "Training session ",
      url: "assignments-training-session",
    },
  ],
  certifications: [
    { id: 1, title: "Certificate Templates" },
    { id: 2, title: "Trainer Certificates" },
    { id: 3, title: "Trainee Certificates" },
  ],
  accounts: [
    { id: 1, title: "Users", url: "users" },
    { id: 2, title: "Trainers", url: "trainers" },
    { id: 3, title: "Trainees", url: "trainees" },
    { id: 4, title: "Supervisors", url: "supervisors" },
    { id: 5, title: "Roles", url: "roles" },
  ],
  enums: [
    { id: 1, title: "Categories", url: "categories" },
    { id: 2, title: "Venues", url: "venues" },
    { id: 3, title: "Trainer Types", url: "trainer-types" },
    { id: 4, title: "Request Types", url: "request-types" },
    { id: 5, title: "Exam Types", url: "exam-types" },
    { id: 6, title: "Question Types", url: "question-types" },
    { id: 7, title: "Course Types", url: "course-types" },
  ],
};

const Sidebar = () => {
  return (
    <aside
      className={`  md:w-[230px] dark_gradient_background hidden md:block sidebar-text-color min-h-screen h-fit pb-32 ${"sticky"} top-0 left-0 col-start-1 row-span-2 `}
    >
      <SidebarBody />
    </aside>
  );
};
export default Sidebar;

export const SidebarBody = () => {
  const currentPath = usePathname();
  const accountType = "Admin";

  const activeGradientStyle = {
    backgroundImage:
      "linear-gradient(131deg, rgba(1, 151, 159) 40%, rgba(255, 94, 54) 80%, rgba(204, 76, 76))",
    color: "white",
  };
  const isActivePath = (path: string) => {
    return currentPath?.startsWith(path);
  };
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);

  return (
    <div className="-mt-8 md:mt-0">
      <Image
        src={"/logo.png"}
        alt=""
        width={120}
        height={50}
        className={`max-w-[150px] -my-14 mx-auto mt-2 `}
      />
      <p className="px-2 mx-3 text-gray-500 tracking-wide my-4 text-center ">
        Welcome To
        <span className="block font-semibold mt-1 text-white pb-2 border-b-1 border-primary-color1 w-fit mx-auto mb-4">
          {accountType} Dashboard
        </span>
      </p>

      <Sidenav
        className={`!bg-inherit !mt-[10px] transition-all min-h-full h-fit duration-500 !text-inherit custom-scrollbar `}
      >
        <Sidenav.Body className="bg-inherit">
          <Nav activeKey="1" className="bg-inherit">
            <Nav.Item
              eventKey="1"
              icon={
                <RiDashboardLine
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className="!py-[10px] !text-[14px] !text-inherit"
              as={NavLink}
              href="/admin/dashboard"
              style={
                currentPath === "/admin/dashboard"
                  ? activeGradientStyle
                  : { backgroundColor: "#000000" }
              }
            >
              Dashboard
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              icon={
                <MdOutlineMarkunreadMailbox
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
              href="/admin/dashboard/mailbox"
              style={
                isActivePath("/admin/dashboard/mailbox")
                  ? activeGradientStyle
                  : { backgroundColor: "#000000" }
              }
            >
              Mailbox
            </Nav.Item>

            <Nav.Menu
              eventKey="3"
              title="Courses"
              icon={
                <PiStudentLight
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
              {menuItems.courses.map((item) => {
                return (
                  <Nav.Item
                    key={item.id}
                    eventKey={`3-${item.id}`}
                    className="!py-[5px] transition-all duration-500 !bg-inherit hover:translate-x-2 text-[13px]"
                    as={NavLink}
                    href={`/admin/dashboard/courses/${item.url}`}
                    style={
                      isActivePath(`/admin/dashboard/courses/${item.url}`)
                        ? activeGradientStyle
                        : { backgroundColor: "#000000" }
                    }
                  >
                    {item.title}
                  </Nav.Item>
                );
              })}
            </Nav.Menu>

            <Nav.Item
              eventKey="4"
              className=" !py-[10px] !text-[14px] !bg-transparent !text-inherit"
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
            >
              Training Session
            </Nav.Item>

            <Nav.Menu
              eventKey="7"
              title="Assignments"
              icon={
                <MdOutlineAssignment
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
              className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
            >
              {menuItems.assignments.map((item) => {
                return (
                  <Nav.Item
                    key={item.id}
                    eventKey={`3-${item.id}`}
                    className="!py-[5px] transition-all duration-500 !bg-inherit hover:translate-x-2 text-[13px]"
                    as={NavLink}
                    href={`/admin/dashboard/assignments/${item.url}`}
                    style={
                      isActivePath(`/admin/dashboard/assignments/${item.url}`)
                        ? activeGradientStyle
                        : { backgroundColor: "#000000" }
                    }
                  >
                    {item.title}
                  </Nav.Item>
                );
              })}
            </Nav.Menu>

            <Nav.Item
              eventKey="6"
              className=" !py-[10px] !text-[14px] !bg-transparent !text-inherit"
              icon={
                <GrAnnounce
                  style={{
                    position: "absolute",
                    top: "11px",
                    left: "20px",
                    fontSize: "16px",
                  }}
                />
              }
            >
              Announcements
            </Nav.Item>
            <Nav.Menu
              eventKey="7"
              title="Certifications"
              icon={
                <GrCertificate
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
              {menuItems.certifications.map((item) => {
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
            {
              <Nav.Menu
                eventKey="8"
                title="Accounts"
                icon={
                  <MdManageAccounts
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
                {menuItems.accounts.map((item) => {
                  return (
                    <Nav.Item
                      key={item.id}
                      eventKey={`8-${item.id}`}
                      className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
                      as={NavLink}
                      href={`/admin/dashboard/accounts/${item.url}`}
                      style={
                        isActivePath(`/admin/dashboard/accounts/${item.url}`)
                          ? activeGradientStyle
                          : { backgroundColor: "#000000" }
                      }
                    >
                      {item.title}
                    </Nav.Item>
                  );
                })}
              </Nav.Menu>
            }
            {
              <Nav.Menu
                eventKey="9"
                title="Enums"
                icon={
                  <VscSymbolEnum
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
                {menuItems.enums.map((item) => {
                  return (
                    <Nav.Item
                      key={item.id}
                      eventKey={`9-${item.id}`}
                      className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
                      as={NavLink}
                      href={`/admin/dashboard/enums/${item.url}`}
                      style={
                        isActivePath(`/admin/dashboard/enums/${item.url}`)
                          ? activeGradientStyle
                          : { backgroundColor: "#000000" }
                      }
                    >
                      {item.title}
                    </Nav.Item>
                  );
                })}
              </Nav.Menu>
            }
            <Nav.Menu
              eventKey="10"
              title="Settings"
              icon={
                <CiSettings
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
              <Nav.Item
                eventKey="10-1"
                className=" !py-[5px] !text-[14px] hover:translate-x-2 duration-300 trainsition-all pb-1"
                icon={
                  <MdLanguage
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "33px",
                      fontSize: "16px",
                    }}
                  />
                }
              >
                العربية
              </Nav.Item>
              <Nav.Item
                eventKey="10-2"
                className=" !py-[5px] !text-[14px] hover:translate-x-2 duration-300 trainsition-all pb-1"
                icon={
                  mode === "dark" ? (
                    <MdOutlineLightMode
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "33px",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <MdOutlineDarkMode
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "33px",
                        fontSize: "16px",
                      }}
                    />
                  )
                }
                onClick={toggle}
              >
                {mode === "dark" ? "Light" : "Dark"} Mode
              </Nav.Item>
              <Nav.Item
                eventKey="10-3"
                className=" !py-[5px] !text-[14px] hover:translate-x-2 duration-300 trainsition-all pb-1"
                icon={
                  <CiLogout
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "33px",
                      fontSize: "16px",
                    }}
                  />
                }
              >
                Log out
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};
