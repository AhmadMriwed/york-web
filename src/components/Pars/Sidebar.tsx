"use client";
import Image from "next/image";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { Sidenav, Nav } from "rsuite";
import ExitIcon from "@rsuite/icons/Exit"; // logout icons
import Link from "next/link";
import { ThemeContext } from "./ThemeContext";
import { MdOutlineMarkunreadMailbox } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { PiStudentLight } from "react-icons/pi";
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

const Sidebar = () => {
   const [expanded, setExpanded] = useState(true);
   const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
      useContext(ThemeContext);

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

   const coursesMenue = [
      {
         id: 1,
         title: "My Courses",
         url: "my-courses",
      },
      {
         id: 2,
         title: "Course Requests",
         url: "course-requests",
      },
      {
         id: 3,
         title: "Course Ads",
         url: "course-ads",
      },
      {
         id: 4,
         title: "Training Plan",
         url: "training-plan",
      },
      {
         id: 5,
         title: "Training Session",
         url: "training-session",
      },
   ];

   const certificationsMenue = [
      {
         id: 1,
         title: "Certificate Templates",
      },
      {
         id: 2,
         title: "Trainer Certificates",
      },
      {
         id: 3,
         title: "Trainee Certificates",
      },
   ];

   const accountsMenue = [
      {
         id: 1,
         title: "Users",
         url: "users",
      },
      {
         id: 2,
         title: "Trainers",
         url: "trainers",
      },
      {
         id: 3,
         title: "Trainees",
         url: "trainees",
      },
      {
         id: 4,
         title: "Supervisors",
         url: "supervisors",
      },
      {
         id: 5,
         title: "Roles",
         url: "roles",
      },
   ];
   const enumsMenue = [
      {
         id: 1,
         title: "Categories",
      },
      {
         id: 2,
         title: "Venues",
      },
      {
         id: 3,
         title: "Trainer Types",
      },
      {
         id: 4,
         title: "Request Types",
      },
      {
         id: 5,
         title: "Exam Types",
      },
      {
         id: 6,
         title: "Question Types",
      },
      {
         id: 7,
         title: "Course Types",
      },
   ];

   return (
      <aside
         className={`${
            expanded ? "w-[220px]" : "w-fit"
         } transition-transform duration-[1s] h-full md:static col-start-1 row-span-2 `}
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
                        <RiDashboardLine
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
                     href="/admin-dashboard"
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
                     className="!bg-inherit !py-[10px] !text-[14px]"
                     as={NavLink}
                     href="/admin-dashboard/mailbox"
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
                     className=" !text-inherit !bg-inherit [&>*]:!bg-inherit [&>*]:!text-[14px] [&>*]:!text-inherit"
                  >
                     {coursesMenue.map((item) => {
                        return (
                           <Nav.Item
                              key={item.id}
                              eventKey={`3-${item.id}`}
                              icon={
                                 <PiStudentLight
                                    style={{
                                       position: "absolute",
                                       top: "8px",
                                       left: "33px",
                                       fontSize: "16px",
                                    }}
                                 />
                              }
                              className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px]"
                              as={NavLink}
                              href={`/admin-dashboard/courses/${item.url}`}
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
                  <Nav.Item
                     eventKey="5"
                     className=" !py-[10px] !text-[14px] !bg-transparent !text-inherit"
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
                  >
                     Assignments
                  </Nav.Item>
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
                              position: "absolute",
                              top: "18px",
                              left: "20px",
                              fontSize: "16px",
                           }}
                        />
                     }
                     className="!text-inherit !bg-inherit [&>.rs-dropdown-menu]:!sticky  [&>*]:!bg-inherit [&>*]:!text-[14px] [&>*]:!text-inherit"
                  >
                     {certificationsMenue.map((item) => {
                        return (
                           <Nav.Item
                              key={item.id}
                              eventKey={`7-${item.id}`}
                              icon={
                                 <GrCertificate
                                    style={{
                                       position: "absolute",
                                       top: "8px",
                                       left: "33px",
                                       fontSize: "16px",
                                    }}
                                 />
                              }
                              className="!py-[5px] !bg-inherit transition-all duration-500 hover:translate-x-2 text-[13px] "
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
                        className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>*]:!bg-inherit [&>*]:!text-[14px] [&>*]:!text-inherit"
                     >
                        {accountsMenue.map((item) => {
                           return (
                              <Nav.Item
                                 key={item.id}
                                 eventKey={`8-${item.id}`}
                                 icon={
                                    <MdManageAccounts
                                       style={{
                                          position: "absolute",
                                          top: "8px",
                                          left: "33px",
                                          fontSize: "16px",
                                       }}
                                    />
                                 }
                                 className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
                                 as={NavLink}
                                 href={`/admin-dashboard/accounts/${item.url}`}
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
                        className=" !text-inherit [&>.rs-dropdown-menu]:!sticky  !bg-inherit [&>*]:!bg-inherit [&>*]:!text-[14px] [&>*]:!text-inherit"
                     >
                        {enumsMenue.map((item) => {
                           return (
                              <Nav.Item
                                 key={item.id}
                                 eventKey={`9-${item.id}`}
                                 icon={
                                    <VscSymbolEnum
                                       style={{
                                          position: "absolute",
                                          top: "8px",
                                          left: "33px",
                                          fontSize: "16px",
                                       }}
                                    />
                                 }
                                 className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
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
                     className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>*]:!bg-inherit [&>*]:!text-[14px] [&>*]:!text-inherit"
                  >
                     <Nav.Item
                        eventKey="10-1"
                        className=" !py-[5px] !text-[14px]"
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
                        className=" !py-[5px] !text-[14px]"
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
                        className=" !py-[5px] !text-[14px]"
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
            <Sidenav.Toggle
               expanded={expanded}
               onToggle={(expanded) => setExpanded(expanded)}
               className="!bg-inherit [&>*]:!text-inherit !border-none [&>*]:!bg-inherit"
            />
         </Sidenav>
      </aside>
   );
};

export default Sidebar;
