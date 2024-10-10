"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminForgotPassword } from "@/store/adminstore/slices/authSlice";
import Image from "next/image";
import { Input, Loader } from "rsuite";
import { trainerForgotPassword } from "@/store/trainerStore/slices/trainerSlice";
import { userForgotPassword } from "@/store/userStore/slices/userSlice";

const RecoverPassword = ({ userType }: { userType: string }) => {
  const [email, setEmail] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { error, loading } = useSelector((state: any) => state.authSlice);

  const HandleSubmit = () => {
    if (!email) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

      let data = { email: email };
      if (userType === "admin") {
        dispatch(adminForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/admin/login/recover-password/send-code?email=${email}`
            );
          }
        });
      } else if (userType === "trainer") {
        dispatch(trainerForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/trainer/login/recover-password/send-code?email=${email}`
            );
          }
        });
      } else {
        dispatch(userForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/user/login/recover-password/send-code?email=${email}`
            );
          }
        });
      }
    }
  };

  return (
    <div className="min-h-[100dvh]">
      <h3 className="text-[#FFF] text-xl font-bold ml-10 mt-10">
        Password Recovery: Email
      </h3>
      <div className="flex justify-center items-center h-full">
        <Image
          src="/register.png"
          style={{ opacity: 0.1 }}
          alt="logo"
          fill
          objectFit="cover"
          className="z-[-99]"
        />
        <div className="sm:border-l-2 border-[#01989F] p-8 flex flex-col justify-center items-start gap-6 mt-6">
          {error && (
            <p className="text-[var(--secondary-color-red)] text-center text-[lg] font-bold p-2 self-start">
              {error}
            </p>
          )}
          <div>
            <label className="text-[#FFF] text-lg" htmlFor="email">
              Email <span className="text-[var(--secondary-color-red)]">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              size="lg"
              placeholder="Enter Your Email"
              style={{ width: "290px", marginBlock: "6px" }}
              className={
                isEmpty
                  ? "border-[2px] border-[var(--secondary-color-red)]"
                  : ""
              }
              required
              value={email}
              onChange={(value: string) => setEmail(value)}
            />
            {isEmpty && (
              <p className="text-[var(--secondary-color-red)]">
                Email is required
              </p>
            )}
          </div>

          <button
            type="button"
            className="colored-btn w-full sm:w-fit"
            onClick={HandleSubmit}
          >
            {loading ? <Loader size="sm" /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
