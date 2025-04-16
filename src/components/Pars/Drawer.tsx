import { Loader, Nav, Sidenav } from "rsuite";
import ExitIcon from "@rsuite/icons/Exit"; // logout icons
import Link from "next/link";
import { Ref, forwardRef, useContext } from "react";
import Image from "next/image";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { adminLogOut } from "@/store/adminstore/slices/authSlice";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux"; // استيراد AnyAction لتحديد نوع الأكشن العام
import { Button, Drawer } from "antd";
import { Close, CloseOutline } from "@rsuite/icons";
import profile from "../../../public/avatar.png";

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

export default function DrawerComponent({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) {
  const { mode, toggle }: { mode: "dark" | "light"; toggle: any } =
    useContext(ThemeContext);
  const { loadingPass, adminProfile, profileLoading } = useSelector(
    (state: GlobalState) => state.authSlice
  );
  const dispatch =
    useDispatch<ThunkDispatch<GlobalState, unknown, AnyAction>>();
  const router = useRouter();

  const HandleLogOut = () => {
    const cookie = new Cookies();

    try {
      dispatch(adminLogOut()).then((res: any) => {
        if (res.error) {
          console.log("Something went wrong");
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <Drawer
      title={
        <Image
          src={mode === "dark" ? "/logo.png" : "/logo dark.png"}
          alt=""
          width={160}
          height={8}
          className={` mx-auto mt-8  `}
        />
      }
      onClose={onClose}
      open={open}
      style={{
        background: `${mode === "dark" ? "black" : ""}`,
        color: `${mode === "dark" ? "white" : ""}`,
      }}
      closeIcon={
        <Close className={`${mode === "dark" ? "text-white" : "text-black"}`} />
      }
      headerStyle={{
        height: 110,
      }}
    >
      <Sidenav className="!bg-inherit !text-inherit   transition-all duration-500">
        <Sidenav.Body className="!text-inherit">
          {profileLoading ? (
            <div className="h-[100px] element-center">
              <Loader />
            </div>
          ) : (
            adminProfile && (
              <div>
                <div className="flex justify-between px-3 gap-2 items-center">
                  <p className="text-[14px] text-gray-600 m-0">
                    Accounts :
                    <span className="font-semibold mx-2 text-primary-color1">
                      {adminProfile?.account_type}
                    </span>
                  </p>
                  <p className="text-[14px] text-[#777] m-0">
                    User ID :
                    <span className="font-semibold mx-2 text-primary-color1">
                      {adminProfile?.user_id}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-inherit justify-center mt-[25px]">
                  {adminProfile?.image &&
                  adminProfile?.image.startsWith("http") ? (
                    <Image
                      src={adminProfile?.image}
                      alt="profile image"
                      width={60}
                      height={60}
                      className="rounded-[50%]"
                    />
                  ) : (
                    <Image
                      src={storageURL + adminProfile?.image ? profile : ""}
                      alt="profile image"
                      width={60}
                      height={60}
                      className="rounded-[50%]"
                    />
                  )}
                  <div>
                    <p className="text-[22px] text-neutral-500 ">
                      {adminProfile?.first_name + " " + adminProfile?.last_name}
                    </p>
                    <p className="text-[14px] text-[#777] mt-[2px]">
                      {adminProfile?.email}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
          <Nav className="mt-[50px] !text-inherit">
            <Nav.Item
              eventKey="1"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/admin/dashboard/profile"
              onClick={onClose}
            >
              Profile
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/"
            >
              Mute Notification
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/"
            >
              About Us
            </Nav.Item>
            <Nav.Menu
              eventKey="4"
              title="Settings"
              className="!text-inherit [&>*]:!text-center [&>*]:!bg-transparent [&>*]:!text-[14px]"
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
            </Nav.Menu>
            <hr className="mt-[70px] mb-[30px] w-[calc(100%_-_40px)] border-[#777] mx-auto" />
            <button
              onClick={HandleLogOut}
              className="text-center w-full hover:text-[var(--primary-color2)] transition-all duration-500"
            >
              {loadingPass ? (
                <Loader size="sm" />
              ) : (
                <>
                  <ExitIcon /> <span className="ms-[2px]">Log out</span>
                </>
              )}
            </button>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </Drawer>
  );
}
