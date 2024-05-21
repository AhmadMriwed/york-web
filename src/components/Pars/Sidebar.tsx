"use client";
import Image from "next/image";
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { Sidenav, Nav } from "rsuite";
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
import { IoIosArrowDroprightCircle } from "react-icons/io";

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

  const coursesMenue = [
    {
      id: 1,
      title: "My Courses",
      url: "my-courses",
    },
    {
      id: 2,
      title: "Submit Courses",
      url: "submit-courses",
    },
    {
      id: 3,
      title: "Course Requests",
      url: "course-requests",
    },
    {
      id: 4,
      title: "Course Ads",
      url: "course-ads",
    },
    {
      id: 5,
      title: "Training Plan",
      url: "training-plan",
    },
    {
      id: 6,
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
      url: "categories",
    },
    {
      id: 2,
      title: "Venues",
      url: "venues",
    },
    {
      id: 3,
      title: "Trainer Types",
      url: "trainer-types",
    },
    {
      id: 4,
      title: "Request Types",
      url: "request-types",
    },
    {
      id: 5,
      title: "Exam Types",
      url: "exam-types",
    },
    {
      id: 6,
      title: "Question Types",
      url: "question-types",
    },
    {
      id: 7,
      title: "Course Types",
      url: "course-types",
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
          Welcome To {accountType} Dashboard
        </p>
      )}

      <Sidenav
        className={`!bg-inherit !mt-[10px] transition-all duration-500 !text-inherit`}
        expanded={expanded}
        // appearance="subtle"
      >
<<<<<<< HEAD
         <div className="flex items-center justify-center">
            <div className="grow flex element-center">
               <Image
                  src={"/logo.png"}
                  alt=""
                  width={expanded ? 90 : 50}
                  height={expanded ? 90 : 50}
                  className={`max-w-[130px] mt-2 ${
                     expanded ? "ms-[28px]" : "ms-0"
                  }  `}
                  onClick={() => setExpanded(!expanded)}
               />
            </div>

            <div
               className={`${
                  expanded ? "hidden md:block" : "hidden"
               } w-fit me-3 cursor-pointer`}
               onClick={() => setExpanded(!expanded)}
            >
               <IoIosArrowDroprightCircle className="text-[18px]" />
            </div>
         </div>

         {expanded && (
            <p className="px-2 mx-3 my-4 text-center">
               Welcome To {accountType} Dashboard
            </p>
         )}

         <Sidenav
            className={`!bg-inherit !mt-[10px] transition-all duration-500 !text-inherit`}
            expanded={expanded}
            // appearance="subtle"
         >
            <Sidenav.Body className="bg-inherit">
               <Nav activeKey="1" className="bg-inherit">
=======
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
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
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
              className="!bg-transparent !py-[10px] !text-[14px] !text-inherit"
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
              className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
            >
              {coursesMenue.map((item) => {
                return (
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a
                  <Nav.Item
                    key={item.id}
                    eventKey={`3-${item.id}`}
                    className="!py-[5px] transition-all duration-500 !bg-inherit hover:translate-x-2 text-[13px]"
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
              {certificationsMenue.map((item) => {
                return (
                  <Nav.Item
                    key={item.id}
                    eventKey={`7-${item.id}`}
                    className="!py-[5px] !bg-inherit transition-all duration-500 hover:translate-x-2  text-[13px] "
                  >
                    {item.title}
                  </Nav.Item>
<<<<<<< HEAD
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
                     {coursesMenue.map((item) => {
                        return (
                           <Nav.Item
                              key={item.id}
                              eventKey={`3-${item.id}`}
                              className="!py-[5px] transition-all duration-500 !bg-inherit hover:translate-x-2 text-[13px]"
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
                     {certificationsMenue.map((item) => {
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
                        {accountsMenue.map((item) => {
                           return (
                              <Nav.Item
                                 key={item.id}
                                 eventKey={`8-${item.id}`}
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
                        className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
                     >
                        {enumsMenue.map((item) => {
                           return (
                              <Nav.Item
                                 key={item.id}
                                 eventKey={`9-${item.id}`}
                                 className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
                                 as={NavLink}
                                 href={`/admin-dashboard/enums/${item.url}`}
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
                                 display: expanded ? "block" : "none",
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
                                    display: expanded ? "block" : "none",
                                 }}
                              />
                           ) : (
                              <MdOutlineDarkMode
                                 style={{
                                    position: "absolute",
                                    top: "8px",
                                    left: "33px",
                                    fontSize: "16px",
                                    display: expanded ? "block" : "none",
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
                                 display: expanded ? "block" : "none",
                              }}
                           />
                        }
                     >
                        Log out
                     </Nav.Item>
                  </Nav.Menu>
               </Nav>
            </Sidenav.Body>
            {/* <Sidenav.Toggle
               expanded={expanded}
               onToggle={(expanded) => setExpanded(expanded)}
               className="!bg-inherit [&>*]:!text-inherit !border-none [&>*]:!bg-inherit"
            /> */}
         </Sidenav>
      </aside>
   );
=======
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
                {accountsMenue.map((item) => {
                  return (
                    <Nav.Item
                      key={item.id}
                      eventKey={`8-${item.id}`}
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
                className=" !text-inherit [&>.rs-dropdown-menu]:!sticky !bg-inherit [&>a]:!bg-transparent [&>ul]:!bg-[#13181e] [&>*]:!text-[14px] [&>*]:!text-inherit"
              >
                {enumsMenue.map((item) => {
                  return (
                    <Nav.Item
                      key={item.id}
                      eventKey={`9-${item.id}`}
                      className="!py-[5px] transition-all duration-500 hover:translate-x-2 text-[13px] "
                      as={NavLink}
                      href={`/admin-dashboard/enums/${item.url}`}
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
                      display: expanded ? "block" : "none",
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
                        display: expanded ? "block" : "none",
                      }}
                    />
                  ) : (
                    <MdOutlineDarkMode
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "33px",
                        fontSize: "16px",
                        display: expanded ? "block" : "none",
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
                      display: expanded ? "block" : "none",
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
>>>>>>> cad077e3213bc200ee05936ade79cee21098023a
};

export default Sidebar;
