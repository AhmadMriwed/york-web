"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "rsuite";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import profilePhoto from "../../../../public/avatar.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { GlobalState } from "@/types/storeTypes";
import { useDisclosure } from "@chakra-ui/react";
import Loading from "@/components/Pars/Loading";
import UpdatePasswordModal from "@/components/UpdatePassModal/UpdatePasswordModal";
import Cookies from "universal-cookie";
import { ThemeContext } from "@/components/Pars/ThemeContext";

export default function Profile() {
  const [changePassword, setChangePassword] = useState(false);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const { adminProfile, profileLoading, profileError } = useSelector(
    (state: GlobalState) => state.authSlice
  );
  const [newImage, setNewImage] = useState("");

  const inputRef: any = useRef();

  useEffect(() => {
    if (!adminProfile) {
      console.log("request");
      dispatch(getAdminProfile());
    }
  }, [adminProfile, dispatch]);

  useEffect(() => {
    if (newImage) {
      console.log("post the new image request");
    }
  }, [newImage]);

  console.log("admin", adminProfile);

  return (
    <>
      <div
        className={`${
          mode === "dark" ? "!bg-dark !text-light" : "!bg-light !text-dark"
        } min-h-[100vh] `}
      >
        {profileLoading && (
          <div className="h-[100vh] flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!profileLoading && adminProfile && (
          <div className="pt-8 pb-2">
            <header className="px-2 py-1 flex gap-[20px] items-center flex-col">
              {!adminProfile.image && (
                <div className="relative">
                  <Image
                    src={profilePhoto}
                    width={120}
                    height={120}
                    alt="photo"
                    className="rounded-[50%]"
                  />

                  <div
                    className="absolute right-0 top-[75%] w-[30px] bg-[var(--primary-color1)] h-[30px] rounded-[50%] element-center cursor-pointer"
                    onClick={() => inputRef.current.click()}
                  >
                    <FaCamera className="text-white text-[14px]" />
                  </div>

                  <Input
                    type="file"
                    className="hidden"
                    name="image"
                    onChange={(value, e: any) => {
                      console.log(e);
                      setNewImage(e.target.files[0]);
                    }}
                    accept="image/*"
                    ref={inputRef}
                  />
                </div>
              )}

              <div className="text-center">
                <p className="mb-2 text-[20px] font-semibold">
                  {adminProfile.first_name + " " + adminProfile.last_name}
                </p>
                <p className="mb-2 text-[#777] text-[16px]">
                  <MdEmail className="text-[var(--primary-color2)] inline me-2" />
                  {adminProfile.email}
                </p>
                {adminProfile.job_type && (
                  <p className="mb-2 text-[#777] text-[16px]">
                    <MdPerson className="text-[var(--primary-color2)] inline me-2" />{" "}
                    {adminProfile.job_type}
                  </p>
                )}
                <p className="text-[var(--primary-color2)] capitalize text-[16px]">
                  {adminProfile.role?.name}
                </p>
              </div>
            </header>
            <div className="mt-5 p-5 w-fit mx-auto min-w-[60%] min-h-[200px]">
              <div className="flex justify-between items-center flex-wrap gap-7">
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Birthday :</p>{" "}
                  <span>{adminProfile.birth_date}</span>
                  <span>21,21 0124.3</span>
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Phone Number : </p>{" "}
                  <span>{adminProfile.phone_number}</span>
                  <span>194022 214021 -</span>
                  {/* <InlineEdit defaultValue={adminProfile.phone_number} /> */}
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[#777]">About me :</p>
                <p className="text-wrap pe-5 leading-6 ">
                  {adminProfile.about_me}
                </p>
              </div>
            </div>
            <hr className="mt-8 mx-10 p-2 opacity-8 border-[#777]" />
            <div className="flex gap-2 mt-2 mx-2 sm:mx-auto p-2 justify-between sm:w-[80%] md:[60%]">
              <button
                className="element-center bg-[var(--primary-color1)] text-white py-2 px-5 rounded-[30px] w-fit text-[14px] hover:bg-[var(--primary-color2)] transition-all duration-300"
                onClick={() => {
                  setChangePassword(true);
                }}
              >
                Change Password
              </button>

              <button className="element-center border border-[var(--primary-color1)] text-[var(--primary-color1)] px-5 rounded-[30px] text-[14px] w-fit hover:bg-[var(--primary-color2)] hover:text-white transition-all duration-300">
                Change Profile
              </button>
            </div>{" "}
          </div>
        )}

        {!profileLoading && profileError && (
          <p className="text-red-400 text-center">{profileError}</p>
        )}
      </div>
      <UpdatePasswordModal
        isOpen={changePassword}
        onClose={() => setChangePassword(false)}
        onOpen={() => {
          setChangePassword(true);
        }}
        type="admin"
      />
    </>
  );
}
