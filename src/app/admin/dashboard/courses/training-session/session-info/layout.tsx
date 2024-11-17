"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { updateSessionId } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";

const SessionLayout = ({ children }: { children: any }) => {
  const dispatch = useDispatch<any>();

  const params = useParams();

  const { sessionID } = useSelector((state: GlobalState) => state.sessions);

  useEffect(() => {
    if (!sessionID) {
      dispatch(updateSessionId(params.id));
    }
  }, []);

  return <>{children}</>;
};

export default SessionLayout;
