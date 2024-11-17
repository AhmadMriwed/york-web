"use client";
import { adminResetPassword } from "@/store/adminstore/slices/authSlice";
import { trainerResetPassword } from "@/store/trainerStore/slices/trainerSlice";
import { userResetPassword } from "@/store/userStore/slices/userSlice";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Loader } from "rsuite";

const ResetPassword = ({ userType }: { userType: string }) => {
  const email = useSearchParams().get("email");
  const code = useSearchParams().get("code");
  const [form, setForm] = useState({
    email: email,
    code: code,
    password: "",
    password_confirmation: "",
  });
  const [formError, setFormError] = useState("");

  const router = useRouter();
  const dispatch: any = useDispatch();
  const { error, loading } = useSelector(
    (state: GlobalState) => state.authSlice
  );

  const handleSubmit = async () => {
    if (!form.password || !form.password_confirmation) {
      setFormError("Password and Password Confirmation are required");
      return;
    }
    if (form.password !== form.password_confirmation) {
      setFormError("Password does not match");
      return;
    }

    let data = {
      email: email,
      code: code,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };
    if (userType === "admin") {
      dispatch(adminResetPassword(data)).then((res: any) => {
        if (res.error) {
          return;
        } else {
          router.push("/admin/login");
        }
      });
    } else if (userType === "trainer") {
      dispatch(trainerResetPassword(data)).then((res: any) => {
        if (res.error) {
          return;
        } else {
          router.push("/trainer/login");
        }
      });
    } else {
      dispatch(userResetPassword(data)).then((res: any) => {
        if (res.error) {
          return;
        } else {
          router.push("/user/login");
        }
      });
    }
  };

  return (
    <div className="min-h-[100dvh]">
      <h3 className="text-[#FFF] text-xl font-bold ml-10 mt-10">
        Password Recovery: Password Change
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
          {formError && (
            <p className="text-[var(--secondary-color-red)] text-center text-[lg] font-bold p-2 self-start">
              {formError}
            </p>
          )}
          <div>
            <div className="flex flex-col md:flex-row items-center gap-3.5">
              <div>
                <label className="text-[#FFF] text-lg" htmlFor="password">
                  Password
                  <span className="text-[var(--secondary-color-red)]">*</span>
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  size="lg"
                  placeholder="New Password"
                  style={{ width: "290px", marginBlock: "6px" }}
                  required
                  value={form.password}
                  onChange={(value: string) =>
                    setForm({ ...form, password: value })
                  }
                />
              </div>
              <div>
                <label
                  className="text-[#FFF] text-lg"
                  htmlFor="password_confirmation"
                >
                  Password Confirmation
                  <span className="text-[var(--secondary-color-red)]">*</span>
                </label>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  size="lg"
                  placeholder="Password Confirmation"
                  style={{ width: "290px", marginBlock: "6px" }}
                  required
                  value={form.password_confirmation}
                  onChange={(value: string) =>
                    setForm({ ...form, password_confirmation: value })
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="colored-btn w-full sm:w-fit"
            onClick={handleSubmit}
          >
            {loading ? <Loader size="sm" /> : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
