
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import dynamic from "next/dynamic";

import { fetchAssignmentSessions, fetchSectionTypes } from "@/lib/action/assignment_action";
import { Header } from "rsuite";

const AssignmentSessionAddOperation = dynamic(
  () => import("@/components/assignments/assignmentSessionA/assignmentSessionAdd/AssignmentSessionAddOperation"),
  { ssr: false }
);



const AddAssignmentSection = () => {
  const dispatch = useDispatch<any>();
  const [assignmentSessions, setAssignmentSessions] = useState<any[]>([]);
  const [assignmentTypesData, setAssignmentTypesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAssignmentSessions();
        const typeData = await fetchSectionTypes();
        setAssignmentSessions(data);
        setAssignmentTypesData(typeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-3 sm:p-6">
      <Header className="max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
        <h1 className="text-[22px] lg:text-3xl font-semibold">Add New Exam Section</h1>
      </Header>
      <AssignmentSessionAddOperation
        assignmentsSections={assignmentSessions}
        typeData={assignmentTypesData}
      />
    </section>
  );
};

export default AddAssignmentSection;