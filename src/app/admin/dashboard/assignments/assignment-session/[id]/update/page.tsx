"use client";
import React, { useEffect, useState } from "react";

import { getUTCDate } from "@/utils/dateFuncs";

import OperationAlert from "@/components/Pars/OperationAlert";

import dynamic from "next/dynamic";
import {  fetchCategories, fetchSectionTypes } from "@/lib/action/assignment_action";
import { useParams, useRouter } from "next/navigation";
import { getSectionById } from "@/lib/action/exam_action";
import Loading from "@/components/Pars/Loading";
import { IoArrowBackSharp } from "react-icons/io5";
import { Header } from "rsuite";
const UpdateAssignmentSection = dynamic(
  () =>
    import(
      "@/components/assignments/assignmentSessionA/UpdateAssignmentSection"
    ),
  {
    ssr: false,
  }
);

const Page = () => {
  const { id } = useParams()
  const [assignmentSession, setAssignmentSession] = useState<any>();
  const [assignmentTypesData, setAssignmentTypesData] = useState<any[]>([]);
  const [assignmentCategoryData, setAssignmentCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSucsess, setIsSucsess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    const loadData = async () => {
      try {

        const typeData = await fetchSectionTypes();
        const categoryData = await fetchCategories();
       
        setAssignmentTypesData(typeData);
        setAssignmentCategoryData(categoryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSectionById(Number(id));
      
        setAssignmentSession(data.data);
   
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isSucsess]);


  if (loading) return <div className="flex justify-center items-center"><Loading /></div>;
  if (error) return <div>Error: {error}</div>;


  console.log(assignmentCategoryData);
  console.log(assignmentSession);

  
  return (
    <section className="p-3 sm:p-6">
      <Header className="flex justify-start items-center gap-2 max-sm:pt-1 px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
        <IoArrowBackSharp
          className="text-primary-color1 text-xl sm:text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
        <h1 className="text-[20px] lg:text-[27px] font-semibold">Update Exam Section</h1>
      </Header>
      <UpdateAssignmentSection
        initialValuess={assignmentSession}
        typeData={assignmentTypesData}
        id={Number(id)}
        categoriesData={assignmentCategoryData}
        setIsSucsess= {setIsSucsess}
      />
    </section>
  );
};

export default Page;
