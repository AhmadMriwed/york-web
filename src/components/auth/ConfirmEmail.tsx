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
import { RemindOutline } from "@rsuite/icons";
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

      <div className="text-center flex flex-col items-center justify-center gap-2.5">
        {error && (
          <div
            className="flex gap-2.5 justify-between items-center py-[10px] px-[15px] mb-4 border-[var(--secondary-color-red)] border-[1px]
                      rounded-[8px]"
          >
            <RemindOutline
              style={{
                color: "var(--secondary-color-red)",
                fontSize: "20px",
              }}
            />
            <p className="text-[16px] text-[var(--secondary-color-red)] font-bold">
              {error}
            </p>
          </div>
        )}

        <Image
          src="/email.png"
          alt="Email photo"
          height={400}
          width={400}
          className="rounded-full !w-[200px] !h-[200px] object-cover"
        />

        <p className="font-bold text-2xl">Verify Your Email Address</p>
        <q className="text-[var(--secondary-color-red)] font-semibold text-lg">
          The account will be deleted within 7 days if it is not confirmed
        </q>
        <p className="text-md mt-2.5">
          {"A Verification link has been sent to "}
          <span className="font-semibold">
            {userType === "admin" && adminProfile && adminProfile.email}
            {userType === "trainer" && trainer && trainer.email}
            {userType === "user" && user && user.email}
          </span>
        </p>
        <div className="flex flex-col md:flex-row items-center gap-1 text-md">
          <p>Didn&apos;t receive any verification link?</p>
          <button className="underline font-bold" onClick={() => Verify()}>
            Click here to resend
          </button>
        </div>
        <Link
          href={
            userType === "admin"
              ? "/admin/login"
              : userType === "trainer"
              ? "/trainer/login"
              : "/user/login"
          }
        >
          <button className="colored-btn !text-[16px] !px-[2rem] mt-2.5">
            Back to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmEmail;
