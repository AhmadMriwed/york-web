"use client";
import { Loader, Nav, Sidenav } from "rsuite";
import ExitIcon from "@rsuite/icons/Exit"; // logout icon
import Link from "next/link";
import { Ref, forwardRef, useContext, useEffect } from "react";
import Image from "next/image";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  adminLogOut,
  getAdminProfile,
} from "@/store/adminstore/slices/authSlice";
import { useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";
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
  const { loadingPass, adminProfile, profileLoading } = useSelector(
    (state: GlobalState) => state.authSlice
  );
  const dispatch: any = useDispatch();
  const router = useRouter();

  const HandleLogOut = () => {
    try {
      dispatch(adminLogOut()).then((res: any) => {
        if (res.error) {
          console.error("Something went wrong during logout.");
        } else {
          router.push("/");
        }
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (expanded) {
      dispatch(getAdminProfile());
    }
  }, [expanded, dispatch]);

  return (
    <aside
      className={`${expanded ? "block" : "hidden"} ${
        mode === "dark" ? "!bg-dark !text-light" : "!bg-light !text-dark"
      } absolute right-0 top-0 w-[350px] max-w-full h-screen z-50 transition-all duration-1000`}
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
          {profileLoading ? (
            <div className="h-[100px] element-center">
              <Loader />
            </div>
          ) : (
            adminProfile && (
              <div>
                <div className="flex justify-between px-3 gap-2 items-center">
                  <p className="text-[14px] text-[#bbb] m-0">
                    Accounts: {adminProfile.account_type}
                  </p>
                  <p className="text-[14px] text-[#777] m-0">
                    User ID: {adminProfile.user_id}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-inherit justify-center mt-[25px]">
                  <Image
                    src={
                      adminProfile.image?.startsWith("http")
                        ? adminProfile.image
                        : storageURL + adminProfile.image
                    }
                    alt="profile image"
                    width={60}
                    height={60}
                    className="rounded-[50%]"
                  />
                  <div>
                    <p className="text-[22px] text-[#bbb]">
                      {`${adminProfile.first_name} ${adminProfile.last_name}`}
                    </p>
                    <p className="text-[14px] text-[#777] mt-[2px]">
                      {adminProfile.email}
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
              onClick={() => setOpenProfile(true)}
            >
              Profile
            </Nav.Item>
            <Nav.Item
              eventKey="2"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/user/dashboard/settings"
            >
              Settings
            </Nav.Item>
            <Nav.Item
              eventKey="3"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/support"
            >
              Support
            </Nav.Item>
            <Nav.Item
              eventKey="4"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/rate-us"
            >
              Rate Us
            </Nav.Item>
            <Nav.Item
              eventKey="5"
              className="!bg-transparent text-center !text-inherit !py-[15px] !text-[14px]"
              as={NavLink}
              href="/about-us"
            >
              About Us
            </Nav.Item>
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
    </aside>
  );
}
