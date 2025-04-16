"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { FaBirthdayCake, FaPhone, FaInfoCircle, FaUser } from "react-icons/fa";
import {
  MdEmail,
  MdPerson,
  MdEdit,
  MdLock,
  MdLocationOn,
} from "react-icons/md";
import profilePhoto from "../../../../../public/avatar.png";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { GlobalState } from "@/types/storeTypes";
import Loading from "@/components/Pars/Loading";
import UpdatePasswordModal from "@/components/UpdatePassModal/UpdatePasswordModal";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [changePassword, setChangePassword] = useState(false);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { adminProfile, profileLoading, profileError } = useSelector(
    (state: GlobalState) => state.authSlice
  );

  useEffect(() => {
    if (!adminProfile) {
      dispatch(getAdminProfile());
    }
  }, [adminProfile, dispatch]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`min-h-screen ${
        mode === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {profileLoading && (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      )}

      {!profileLoading && adminProfile && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            <div className="relative mx-auto md:mx-0">
              <Image
                src={adminProfile.image || profilePhoto}
                width={120}
                height={120}
                alt="Profile photo"
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold  w-fit mx-auto md:mx-0">
                {adminProfile.first_name} {adminProfile.last_name}
              </h1>

              <div className="flex flex-wrap flex-col mt-8 gap-2 ">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-primary-color1 h-6 text-xl" />
                  <span className="text-[16px] text-neutral-800 dark:text-neutral-400">
                    {adminProfile.email}
                  </span>
                </div>

                {adminProfile.user_name && (
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary-color1 h-6 text-lg" />
                    <span className="text-[16px] text-neutral-800 dark:text-neutral-400">
                      @{adminProfile.user_name}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setChangePassword(true)}
                  className="flex items-center gap-2 bg-primary-color1 text-xs md:text-sm    font-semibold text-white p-1 px-2 md:py-2 md:px-4 rounded hover:bg-primary-color2 transition"
                >
                  <MdLock />
                  Change Password
                </button>

                <button
                  onClick={() => router.push("/admin/dashboard/profile/edit")}
                  className="flex items-center gap-2 border border-primary-color1 text-primary-color1 font-semibold py-2 px-4 rounded hover:bg-primary-color1 hover:text-white transition"
                >
                  <MdEdit />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-400 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-2">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold  mb-4 flex items-center gap-2">
                <MdPerson className="text-primary-color1" />
                Personal Information :
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4 mb-8">
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                      Birthday :
                    </p>
                    <p className="flex items-center gap-2 ml-2">
                      <FaBirthdayCake className="text-primary" />
                      {formatDate(String(adminProfile.birth_date))}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                      Gender :{" "}
                    </p>
                    <p className="capitalize flex  gap-2 ml-2">
                      {adminProfile.gender?.toLowerCase() || "Not specified"}
                    </p>
                  </div>
                </div>

                {adminProfile.job_type && (
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                      Job Title
                    </p>
                    <p className="flex items-center gap-2">
                      <MdPerson className="text-primary" />
                      {adminProfile.job_type}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                    Role :
                  </p>
                  <p className="  font-semibold ml-2 text-primary-color1 capitalize">
                    {adminProfile.role?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaPhone className="text-primary-color1" />
                Contact Information :
              </h2>

              <div className="space-y-4">
                <div className="mb-8">
                  <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                    Phone :
                  </p>
                  <p className="flex items-center gap-2">
                    <FaPhone className="text-primary-color1 ml-2" />
                    {adminProfile.phone_number || "Not specified"}
                  </p>
                </div>

                <div className="flex gap-4 mt-32">
                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                      Account Type :
                    </p>
                    <p className="ml-2">
                      {adminProfile.account_type || "Not specified"}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <p className="text-gray-500 dark:text-gray-400 text-[16px]">
                      Status :
                    </p>
                    <p className="capitalize ml-2">
                      {adminProfile.account_status?.status ||
                        (adminProfile.is_verified
                          ? "verified"
                          : "not verified")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-400 my-6" />

          {/* About Me Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-primary-color1" />
              About me :
            </h2>
            <div className=" dark:bg-gray-800 p-4 rounded-lg">
              <p className="whitespace-pre-line">
                {adminProfile.about_me || "No information provided"}
              </p>
            </div>
          </div>
        </div>
      )}

      {!profileLoading && profileError && (
        <p className="text-red-500 text-center py-8">{profileError}</p>
      )}

      <UpdatePasswordModal
        isOpen={changePassword}
        onClose={() => setChangePassword(false)}
        onOpen={() => setChangePassword(true)}
        type="admin"
      />
    </div>
  );
}
