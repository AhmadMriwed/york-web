"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import dynamic from "next/dynamic";

import {
  fetchAssignmentSessions,
  fetchCategories,
  fetchSectionTypes,
} from "@/lib/action/assignment_action";
import { Header, Loader } from "rsuite";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Loading from "@/components/Pars/Loading";

const AssignmentSessionAddOperation = dynamic(
  () =>
    import(
      "@/components/assignments/assignmentSessionA/assignmentSessionAdd/AssignmentSessionAddOperation"
    ),
  { ssr: false }
);

const AddAssignmentSection = () => {
  const dispatch = useDispatch<any>();
  const [assignmentSessions, setAssignmentSessions] = useState<any[]>([]);
  const [assignmentTypesData, setAssignmentTypesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignmentCategoryData, setAssignmentCategoryData] = useState<any[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAssignmentSessions();
        const typeData = await fetchSectionTypes();
        setAssignmentSessions(data);
        setAssignmentTypesData(typeData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch sessions"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-3 sm:p-4 px-1">
      <Header className="flex justify-start items-center gap-2 max-sm:pt-1 px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
        <IoArrowBackSharp
          className="text-primary-color1 text-xl sm:text-xl cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-[20px] lg:text-[27px] font-semibold">
          Add New Exam Section
        </h1>
      </Header>
      <AssignmentSessionAddOperation
        assignmentsSections={assignmentSessions}
        typeData={assignmentTypesData}
        CategoryLoading={loading}
      />
    </section>
  );
};

export default AddAssignmentSection;
