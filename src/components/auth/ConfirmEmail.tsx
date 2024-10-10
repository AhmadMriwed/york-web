"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import BackBtn from "@/components/buttons/BackBtn";
import { Axios, TrainerAxios, UserAxios } from "@/utils/axios";
import { GlobalState } from "@/types/storeTypes";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { useRouter } from "next/navigation";
import { getTrainerProfile } from "@/store/trainerStore/slices/trainerSlice";
import { getUserProfile } from "@/store/userStore/slices/userSlice";

const ConfirmEmail = ({ userType }: { userType: string }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch: any = useDispatch();

  const { adminProfile } = useSelector((state: GlobalState) => state.authSlice);
  const { trainer } = useSelector((state: any) => state.trainerSlice);
  const { user } = useSelector((state: any) => state.userSlice);

  const Verify = () => {
    if (userType === "admin") {
      Axios.put("admin/resend-verify-email")
        .then((res: any) => {
          if (res.status === 200) {
            setError("");
          }
        })
        .catch((err: any) => {
          setError(err.message);
        });
    } else if (userType === "trainer") {
      TrainerAxios.put("trainer/resend-verify-email")
        .then((res: any) => {
          if (res.status === 200) {
            setError("");
          }
        })
        .catch((err: any) => {
          setError(err.message);
        });
    } else {
      UserAxios.put("user/resend-verify-email")
        .then((res: any) => {
          if (res.status === 200) {
            setError("");
          }
        })
        .catch((err: any) => {
          setError(err.message);
        });
    }
  };

  useEffect(() => {
    Verify();
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      if (userType === "admin") {
        dispatch(getAdminProfile()).then((res: any) => {
          if (res?.payload?.is_verified) router.push("/admin/dashboard");
        });
      } else if (userType === "trainer") {
        dispatch(getTrainerProfile()).then((res: any) => {
          if (res?.payload?.is_verified) router.push("/");
        });
      } else {
        dispatch(getUserProfile()).then((res: any) => {
          if (res?.payload?.is_verified) router.push("/");
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, router, userType]);

  return (
    <div className="p-6 h-full">
      <BackBtn textColor="text-black" />

      <div className="text-center flex flex-col items-center justify-center gap-2.5 mt-2.5 h-full">
        <Image
          src="/email.png"
          alt="Email photo"
          height={250}
          width={250}
          className="rounded-sm object-cover mb-4 shadow-sm"
        />

        <p className="font-bold text-2xl">Verify Your Email Address</p>
        <q className="text-[var(--secondary-color-red)] font-semibold text-md">
          The account will be deleted within 7 days if it is not confirmed
        </q>
        <p className="text-lg mt-4">
          {"A Verification link has been sent to "}
          <span className="font-semibold">
            {userType === "admin" && adminProfile && adminProfile.email}
            {userType === "trainer" && trainer && trainer.email}
            {userType === "user" && user && user.email}
          </span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-1 text-md">
          <p>Didn&apos;t receive any verification link?</p>
          <button className="underline font-[600]" onClick={() => Verify()}>
            Click here to Resend
          </button>
        </div>
        {error && (
          <p className="text-[12px] text-[var(--secondary-color-red)] font-bold mt-2.5">
            {error}
          </p>
        )}
        <Link
          href={
            userType === "admin"
              ? "/admin/login"
              : userType === "trainer"
              ? "/trainer/login"
              : "/user/login"
          }
        >
          <button className="colored-btn !mt-5 !text-[16px] !px-[4rem]">
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmail;
