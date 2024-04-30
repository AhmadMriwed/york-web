"use client";
import { Loader, Nav, Sidenav } from "rsuite";
import ExitIcon from "@rsuite/icons/Exit"; // logout icons
import Link from "next/link";
import { Ref, forwardRef, useContext, useEffect } from "react";
import Image from "next/image";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
import {
   adminLogOut,
   getAdminProfile,
} from "@/store/adminstore/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";
import Loading from "./Loading";
import { storageURL } from "@/utils/api";

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
   setOpenProfile,
}: {
   expanded: boolean;
   setExpanded: any;
   setOpenProfile: any;
}) {
   const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
      useContext(ThemeContext);
   const {
      error,
      loadingPass,
      loading,
      admin,
      adminProfile,
      profileLoading,
      profileError,
   } = useSelector((state: GlobalState) => state.authSlice);
   const dispatch: any = useDispatch();
   const router = useRouter();
console.log(adminProfile,admin)
   const HandleLogOut = () => {
      let cookie = new Cookies();

      let token = cookie.get("admin_token");
      console.log(token);

      try {
         dispatch(adminLogOut(token)).then((res: any) => {
            console.log(res);
            if (res.error) {
               console.log("some thing went wrong");
               return;
            } else {
               router.push("/");
            }
         });
      } catch (error: any) {
         console.log(error.mesage);
      }
   };

   useEffect(() => {
      if (expanded) {
         let cookie = new Cookies();
         let token = cookie.get("admin_token");
         dispatch(getAdminProfile(token));
      }
   }, [expanded, dispatch]);
   return (
      <aside
         className={`${expanded ? "block" : "hidden"} ${
            mode === "dark" ? "!bg-dark" : "!bg-light"
         } ${
            mode === "dark" ? "!text-light" : "!text-dark"
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
               {profileLoading && (
                  <div className="h-[100px] element-center">
                     <Loader />
                  </div>
               )}
               {!profileLoading && adminProfile && (
                  <div>
                     <div className="flex justify-between px-3 gap-2 items-center">
                        <p className="text-[14px] text-[#bbb] m-0">
                           Accounts : {adminProfile.account_type}
                        </p>
                        <p className="text-[14px] text-[#777] m-0">
                           User ID : {adminProfile.user_id}
                        </p>
                     </div>
                     <div className="flex items-center gap-2 text-inherit justify-center mt-[25px]">
                        {adminProfile.image !== null &&
                        adminProfile.image.startsWith("http") ? (
                           <Image
                              src={adminProfile.image}
                              alt="profile image"
                              width={60}
                              height={60}
                              className="rounded-[50%]"
                           />
                        ) : (
                           <Image
                              src={storageURL + adminProfile.image}
                              alt="profile image"
                              width={60}
                              height={60}
                              className="rounded-[50%]"
                           />
                        )}

                        <div className="">
                           <p className="text-[22px] text-[#bbb]">
                              {adminProfile.first_name +
                                 " " +
                                 adminProfile.last_name}
                           </p>
                           <p className="text-[14px] text-[#777] mt-[2px]">
                              {adminProfile.email}
                           </p>
                        </div>
                     </div>
                  </div>
               )}

               <Nav className="mt-[50px] !text-inherit">
                  <Nav.Item
                     eventKey="1"
                     className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]  "
                     onClick={() => setOpenProfile(true)}
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
                  <button
                     onClick={HandleLogOut}
                     className="text-center w-full hover:text-[var(--primary-color2)] transition-all duration-500"
                  >
                     {loadingPass ? (
                        <Spinner size={"sm"} color="red" />
                     ) : (
                        <>
                           <ExitIcon />{" "}
                           <span className="ms-[2px]">Log out</span>
                        </>
                     )}
                  </button>
               </Nav>
            </Sidenav.Body>
         </Sidenav>
      </aside>
   );
}
