"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminForgotPassword,
  adminValidateForgotPassword,
} from "@/store/adminstore/slices/authSlice";
import Image from "next/image";
import { Input, Loader } from "rsuite";
import {
  trainerForgotPassword,
  trainerValidateForgotPassword,
} from "@/store/trainerStore/slices/trainerSlice";
import {
  userForgotPassword,
  userValidateForgotPassword,
} from "@/store/userStore/slices/userSlice";

const ResendCode = ({ userType }: { userType: string }) => {
  const [code, setCode] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { error, loading } = useSelector((state: any) => state.authSlice);

  const email = useSearchParams().get("email");

  const resendCode = () => {
    let data = { email: email };
    if (userType === "admin") {
      dispatch(adminForgotPassword(data));
    } else if (userType === "trainer") {
      dispatch(trainerForgotPassword(data));
    } else {
      dispatch(userForgotPassword(data));
    }
  };

  const handleSubmit = () => {
    if (!code) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

      let data = { email: email, code: code };
      if (userType === "admin") {
        dispatch(adminValidateForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/admin/login/recover-password/send-code/reset-password?email=${email}&code=${code}`
            );
          }
        });
      } else if (userType === "trainer") {
        dispatch(trainerValidateForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/trainer/login/recover-password/send-code/reset-password?email=${email}&code=${code}`
            );
          }
        });
      } else {
        dispatch(userValidateForgotPassword(data)).then((res: any) => {
          if (res.error) {
            return;
          } else {
            router.push(
              `/user/login/recover-password/send-code/reset-password?email=${email}&code=${code}`
            );
          }
        });
      }
    }
  };

  return (
    <>
      <h3 className="text-[#FFF] text-xl font-bold ml-10 mt-10">
        Password Recovery: Code Verification
      </h3>
      <div className="flex justify-center items-center">
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
            <label className="text-[#FFF] text-lg" htmlFor="code">
              Verification Code{" "}
              <span className="text-[var(--secondary-color-red)]">*</span>
            </label>
            <Input
              id="code"
              name="code"
              type="code"
              size="lg"
              placeholder="Enter The Verification Code"
              style={{ width: "290px", marginBlock: "6px" }}
              className={
                isEmpty
                  ? "border-[2px] border-[var(--secondary-color-red)]"
                  : ""
              }
              required
              value={code}
              onChange={(value: string) => setCode(value)}
            />
            {isEmpty && (
              <p className="text-[var(--secondary-color-red)]">
                Verification Code is required
              </p>
            )}
          </div>

          {loading ? (
            <Loader size="sm" />
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <button
                type="button"
                className="colored-btn w-full sm:w-fit"
                onClick={handleSubmit}
              >
                Confirm
              </button>
              <button
                className="underline text-md font-bold text-[var(--primary-color1)]"
                onClick={() => resendCode()}
              >
                Resend code
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResendCode;
