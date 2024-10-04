"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseId } from "@/store/adminstore/slices/courses/coursesSlice";
import { GlobalState } from "@/types/storeTypes";

const CourseInfoLayout = ({ children }: any) => {
  const dispatch = useDispatch<any>();

  const params = useParams();

  const { courseId } = useSelector((state: GlobalState) => state.courses);

  useEffect(() => {
    if (!courseId) {
      dispatch(updateCourseId(params.id));
    }
  }, []);

  return <>{children}</>;
};

export default CourseInfoLayout;
