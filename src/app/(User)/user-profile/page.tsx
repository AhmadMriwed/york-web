"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, Input } from "rsuite";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import profilePhoto from "../../../../public/avatar.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { GlobalUserState } from "@/types/storeTypes";
import Loading from "@/components/Pars/Loading";
import UpdatePasswordModal from "@/components/UpdatePassModal/UpdatePasswordModal";
import Cookies from "universal-cookie";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getUserProfile } from "@/store/userStore/slices/userSlice";
import LocationModal from "@/components/accounts/trainers/LocationModal";
import photo from "../../../../public/avatar.png";

export default function Profile() {
  const [changePassword, setChangePassword] = useState(false);

  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const dispatch: any = useDispatch();
  const { user, loading, error } = useSelector(
    (state: GlobalUserState) => state.userSlice
  );
  const [openLocation, setOpenLocation] = useState(false);
  const [newImage, setNewImage] = useState("");

  const inputRef: any = useRef();

  const categories = [
    {
      id: 1,
      title: "ksaf",
    },
    {
      id: 2,
      title: "ksaf",
    },
  ];

  useEffect(() => {
    if (!user?.id) {
      console.log("request");
      // let cookie = new Cookies();
      // let token = cookie.get("user_token");
      dispatch(
        getUserProfile("78|3PzjMYbKuGOdZ8HNQGHprPwp1lPyQEP6xlLkdAGK4f63e1cc")
      );
    }
  }, [user?.id, dispatch]);

  useEffect(() => {
    if (newImage) {
      console.log("post the new image request");
    }
  }, [newImage]);

  return (
    <>
      <div
        className={`${
          mode === "dark" ? "!bg-dark !text-light" : "!bg-light !text-dark"
        } min-h-[100vh] `}
      >
        {loading && (
          <div className="h-[100vh] flex justify-center items-center">
            <Loading />
          </div>
        )}
        {!loading && user && (
          <div className="pt-8 pb-2">
            <header className="px-2 py-1 flex gap-[20px] items-center flex-col">
              {!user.image && (
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
                  {user.first_name + " " + user.last_name}
                </p>
                <p className="mb-2 text-[#777] text-[16px]">
                  <MdEmail className="text-[var(--primary-color2)] inline me-2" />
                  {user.email}
                </p>
                {user.user_type && (
                  <p className="mb-2 text-[#777] text-[16px]">
                    <MdPerson className="text-[var(--primary-color2)] inline me-2" />{" "}
                    {user.user_type}
                  </p>
                )}
              </div>
            </header>
            <div className="mt-5 p-5 w-fit mx-auto min-w-[60%] min-h-[200px]">
              <div className="flex justify-between items-center flex-wrap gap-7">
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Birthday :</p>{" "}
                  {/* <span>{user.birth_date}</span> */}
                  <span>21,21 0124.3</span>
                </div>
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Phone Number : </p>{" "}
                  {/* <span>{user.phone_number}</span> */}
                  <span>194022 214021 -</span>
                  {/* <InlineEdit defaultValue={user.phone_number} /> */}
                </div>
              </div>
              <div className="flex justify-between items-center flex-wrap gap-7 mt-7">
                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Categories :</p>{" "}
                  {user.categories?.length !== 0 ? (
                    <p>No Categories</p>
                  ) : (
                    <Dropdown
                      title="Categories"
                      className="min-w-[130px]  !bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color1)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
                    >
                      {categories.map((item: any) => {
                        return (
                          <Dropdown.Item
                            key={item.id}
                            className="flex gap-5 justify-between items-center text-white w-[300px]"
                            active={false}
                          >
                            <Image
                              src={photo}
                              width={35}
                              height={35}
                              className="rounded-[50%]"
                              alt="category-image"
                            />
                            <p className="">{item.title}</p>
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  {" "}
                  <p className="text-[#777]">Location :</p>{" "}
                  <div
                    className="bg-[var(--primary-color1)] text-white px-1 py-[6px] w-[130px] rounded-[6px] flex element-center cursor-pointer"
                    onClick={() => setOpenLocation(true)}
                  >
                    Location
                  </div>
                </div>
                <LocationModal
                  open={openLocation}
                  setOpen={setOpenLocation}
                  position={null}
                />
              </div>
              <div className="mt-7">
                <p className="text-[#777]">About me :</p>
                <p className="text-wrap pe-5 leading-6 ">
                  {/* {user.about_me} */}
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

        {!loading && error && (
          <p className="text-red-400 text-center">{error}</p>
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
