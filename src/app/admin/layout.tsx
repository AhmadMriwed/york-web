"use client";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const pathName: string = usePathname();
  const { adminProfile } = useSelector((state: GlobalState) => state.authSlice);

  useEffect(() => {
    if (!adminProfile)
      dispatch(getAdminProfile()).then((res: any) => {
        if (!res.error) {
          if (!res.payload.is_verified) {
            router.push("/admin/login/confirm-email");
          } else {
            router.push("/admin/dashboard");
          }
        } else {
          if (!pathName.includes("recover-password")) {
            router.push("/admin/login");
          }
        }
      });
  }, [adminProfile, dispatch, pathName, router]);

  return children;
};

export default AdminLayout;
