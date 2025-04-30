"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import OperationAlert from "@/components/Pars/OperationAlert";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import {
  fetchAssignmentSessions,
  fetchCategories,
  fetchSectionTypes,
} from "@/lib/action/assignment_action";
const UpdateAssignmentSection = dynamic(
  () =>
    import(
      "@/components/assignments/assignmentSessionA/UpdateAssignmentSection"
    ),
  {
    ssr: false,
  }
);

const updateAssignmentSection = () => {
  const [assignmentTypesData, setAssignmentTypesData] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const loadData = async () => {
      try {
        const typeData = await fetchSectionTypes();
        const categories = await fetchCategories();

        setAssignmentTypesData(typeData);
        setCategoriesData(categories);
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

  let initialValues = {
    title: {
      en: "",
      ar: "",
    },
    trainer_name: null,
    start_date: new Date(),
    end_date: new Date(),
    category_id: null,
    code: "",
    status: "",
    description: {
      en: "",
      ar: "",
    },
    image: null,
    organization_name: null, // New field for "جهة"
  };

  const submitHandler = (values: any, actions: any) => {
    console.log("Form Submitted Data:", values);

    const formData = new FormData();

    // Append fields manually
    formData.append("title[en]", values.title.en || "");
    formData.append("title[ar]", values.title.ar || "");
    formData.append("description[en]", values.description.en || "");
    formData.append("description[ar]", values.description.ar || "");
    formData.append("start_date", getUTCDate(values.start_date));
    if (values.end_date) {
      formData.append("end_date", getUTCDate(values.end_date));
    }
    if (values.trainer_name) {
      formData.append("trainer_name", values.trainer_name);
    }
    if (values.category_id) {
      formData.append("category_id", values.category_id.toString());
    }
    if (values.code) {
      formData.append("code", values.code);
    }
    if (values.status) {
      formData.append("status", values.status);
    }
    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.venue) {
      formData.append("organization_name", values.organization_name);
    }

    // Log FormData contents
    Array.from(formData.entries()).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // dispatch(createExamSection(formData));
  };
  return (
    <section className="p-3 sm:p-6">
      <Header title="Update Exam Section" />
      <UpdateAssignmentSection
        //@ts-ignore
        initialValues={fakeData}
        submitHandler={submitHandler}
        // operationLoading={operationLoading}
      />
    </section>
  );
};

export default updateAssignmentSection;
