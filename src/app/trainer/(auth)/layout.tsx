"use client";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { GlobalState } from "@/types/storeTypes";
import { getTrainerProfile } from "@/store/trainerStore/slices/trainerSlice";

const TrainerLayout = ({ children }: PropsWithChildren) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const pathName: string = usePathname();
  const { trainer } = useSelector((state: GlobalState) => state.trainerSlice);

  useEffect(() => {
    if (!trainer)
      dispatch(getTrainerProfile()).then((res: any) => {
        if (!res.error) {
          if (!res.payload.is_verified) {
            router.push("/trainer/login/confirm-email");
          }
        } else {
          if (!pathName.includes("recover-password")) {
            router.push("/trainer/login");
          }
        }
      });
  }, [trainer, dispatch, pathName, router]);

  return children;
};

export default TrainerLayout;
