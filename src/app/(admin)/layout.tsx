"use client";
import React, { PropsWithChildren, useEffect } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";

const coockie = new Cookies();

const AdminLayout = ({ children }: PropsWithChildren) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const pathName: string = usePathname();

  useEffect(() => {
    const token = coockie.get("admin_token");
    console.log(token);

    dispatch(getAdminProfile(token)).then((res: any) => {
      console.log(res);
      if (res?.error?.message.toLowerCase() === "rejected") {
        router.push("/admin/login");
      } else if (!res.payload.is_verified) {
        router.push("/admin/login/confirmemail");
      } else if (pathName.endsWith("/admin/login")) {
        router.push("/admin-dashboard");
      }
    });
  }, [dispatch, pathName, router]);

  return children;
};

export default AdminLayout;
