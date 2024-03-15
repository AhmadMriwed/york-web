"use client";
import { Nav, Sidenav } from "rsuite";
import ExitIcon from "@rsuite/icons/Exit"; // logout icons
import Link from "next/link";
import { Ref, forwardRef, useContext } from "react";
import Image from "next/image";
import profile from "../../../public/avatar.png";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import { adminLogOut } from "@/store/adminstore/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

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


export default function Drawer({
   expanded,
   setExpanded,
}: {
   expanded: boolean;
   setExpanded: any;
}) {
   const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
      useContext(ThemeContext);
   const { error, loading, admin } = useSelector((state: any) => state.authSlice)
   console.log(error, loading, admin)
   const dispatch: any = useDispatch()
   const router = useRouter()
   const HandleLogOut = () => {
      let cookie = new Cookies()
      let token = cookie.get("admin_token")
      console.log(token)
      try {
         dispatch(adminLogOut(token)).then((res:any) => {
            console.log(res)
            if(res.error){
               console.log("some thing went wrong")
               return
            }else{
               router.push("/")
            }
            
         })
      } catch (error: any) {
         console.log(error.mesage)
      }
   }
   return (
      <aside
         className={`${expanded ? "block" : "hidden"} ${mode === "dark" ? "!bg-dark" : "!bg-light"
            } ${mode === "dark" ? "!text-light" : "!text-dark"
            } absolute right-0 top-0 w-[350px] max-w-full h-screen z-50 transition-all duration-[1s]`}
      >
         <Sidenav
            className="!bg-inherit !text-inherit !mt-[10px] transition-all duration-500"
            expanded={expanded}
         >
            <Sidenav.Toggle
               expanded={expanded}
               onToggle={(expanded) => setExpanded(expanded)}
               className="[&>.rs-sidenav-toggle-button]:!float-left !bg-inherit [&>*]:!text-inherit !border-none [&>*]:!bg-transparent"
            ></Sidenav.Toggle>
            <Sidenav.Body className="!text-inherit">
               <div>
                  <div className="flex justify-between px-3 gap-2 items-center">
                     <p className="text-[14px] text-[#bbb] m-0">
                        Accounts : Admin
                     </p>
                     <p className="text-[14px] text-[#777] m-0">
                        User ID : 12345678
                     </p>
                  </div>
                  <div className="flex items-center gap-2 text-inherit justify-center mt-[25px]">
                     <Image
                        src={profile}
                        alt="profile image"
                        width={60}
                        height={60}
                        className="rounded-[50%]"
                     />
                     <div className="">
                        <p className="text-[22px] text-[#bbb]">Hussam Ahmad</p>
                        <p className="text-[14px] text-[#777] mt-[2px]">
                           hussamAhmad@gmail.com
                        </p>
                     </div>
                  </div>
               </div>
               <Nav className="mt-[50px] !text-inherit">
                  <Nav.Item
                     eventKey="1"
                     className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]  "
                     as={NavLink}
                     href="/"
                  >
                     Profile
                  </Nav.Item>
                  <Nav.Item
                     eventKey="2"
                     className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px] "
                     as={NavLink}
                     href="/"
                  >
                     Mute Notification
                  </Nav.Item>
                  <Nav.Item
                     eventKey="3"
                     className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px] "
                     as={NavLink}
                     href="/"
                  >
                     About Us
                  </Nav.Item>
                  <Nav.Menu
                     eventKey="4"
                     title="Settings"
                     className=" !text-inherit [&>*]:!text-center [&>*]:!bg-transparent [&>*]:!text-[14px] [&>*]:!text-inherit"
                  >
                     <Nav.Item
                        eventKey="4-1"
                        className="!bg-transparent !text-inherit !py-[10px] !text-[14px]"
                     >
                        العربية
                     </Nav.Item>
                     <Nav.Item
                        eventKey="4-2"
                        className="!bg-transparent !text-inherit !py-[10px] !text-[14px]"
                        onClick={toggle}
                     >
                        {mode === "dark" ? "Light" : "Dark"} Mode
                     </Nav.Item>
                  </Nav.Menu>{" "}
                  <hr className="mt-[70px] mb-[30px] w-[calc(100%_-_40px)] border-[#777] mx-auto" />
                  <Nav.Item
                     onClick={HandleLogOut}
                     eventKey="5"
                     className="!bg-transparent text-center  !text-inherit !py-[10px] !text-[14px] !w-fit !left-[50%] translate-x-[-50%]"
                     icon={<ExitIcon style={{ top: "11px" }} />}
                     style={{ marginInline: "auto !important" }}
                  >
                     {loading ? <Spinner size={"sm"} color="red" /> : " Log out"}
                  </Nav.Item>
               </Nav>
            </Sidenav.Body>
         </Sidenav>
      </aside>
   );
}
