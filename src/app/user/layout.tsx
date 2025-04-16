"use client";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";
import { getUserProfile } from "@/store/userStore/slices/userSlice";
import Cookie from "universal-cookie";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
const cookie = new Cookie();

const TrainerLayout = ({ children }: PropsWithChildren) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const pathName: string = usePathname();
  const { user } = useSelector((state: GlobalState) => state.userSlice);

  useEffect(() => {
    const token = cookie.get("admin_token");
    if (token) {
      dispatch(getAdminProfile());
    }
  }, []);

  useEffect(() => {
    if (!user)
      dispatch(getUserProfile()).then((res: any) => {
        if (!res.error) {
          if (!res.payload.is_verified) {
            router.push("/user/login/confirm-email");
          }
        } else {
          if (!pathName.includes("recover-password")) {
            router.push("/user/login");
          }
        }
      });
  }, [user, dispatch, pathName, router]);

  return children;
};

export default TrainerLayout;
