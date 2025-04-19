// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import {
// //   createExamSection,
// //   examSectionOperationCompleted,
// // } from "@/store/adminstore/slices/examSections/examSectionsSlice";
// import { GlobalState } from "@/types/storeTypes";
// import { getUTCDate } from "@/utils/dateFuncs";

// import Header from "@/components/Pars/Header";
// import OperationAlert from "@/components/Pars/OperationAlert";

// import dynamic from "next/dynamic";
// const AssignmentSessionAddOperation = dynamic(
//   () => import("@/components/assignments/assignmentSessionA/assignmentSessionAdd/AssignmentSessionAddOperation"),
//   {
//     ssr: false,
//   }
// );

// const AddAssignmentSecion = () => {
//   // const dispatch = useDispatch<any>();

//   // const { operationLoading, operationError, status } = useSelector(
//   //   (state: GlobalState) => state.examSections
//   // );

//   let initialValues = {
//     title: {
//       en: "",
//       ar: "",
//     },
//     trainer_name: null,
//     start_date: new Date(),
//     end_date: new Date(),
//     category_id: null,
//     code: "",
//     status: "",
//     description: {
//       en: "",
//       ar: "",
//     },
//     image: null,
//   };


//   const fakeData = {
//     title: { en: "Introduction to React", ar: "مقدمة في React" },
//     sub_title: {
//       en: "Learn the fundamentals of React and build amazing UIs",
//       ar: "تعلم أساسيات React وقم ببناء واجهات مستخدم رائعة",
//     },
//     start_date: new Date("2023-11-01T09:00:00Z"),
//     end_date: new Date("2023-11-15T17:00:00Z"),
//     houres: 20,
//     fee: "100",
//     lang: "en",
//     image: null,
//     venue_id: 1,
//     category_id: 2,
//     code: "REACT101",
//     status: "active",
//     outlines: {
//       en: "1. Introduction to React\n2. Components and Props\n3. State Management\n4. Routing and API Integration",
//       ar: "1. مقدمة في React\n2. المكونات والخصائص\n3. إدارة الحالة\n4. التوجيه والتكامل مع APIs",
//     },
//     description: {
//       en: "This course will teach you the basics of React, including components, state management, and routing.",
//       ar: "ستتعلم في هذه الدورة الأساسيات في React، بما في ذلك المكونات وإدارة الحالة والتوجيه.",
//     },
//   };

//   const submitHandler = (values: any, actions: any) => {
//     const formData = new FormData();

//     const requiredFields = {
//       title: {
//         en: values.title.en || "",
//         ar: values.title.ar || null,
//       },
//       description: {
//         en: values.description.en || "",
//         ar: values.description.ar || null,
//       },
//     };

//     Object.entries(requiredFields).forEach(([key, value]) => {
//       formData.append(`${key}[en]`, value.en);
//       formData.append(`${key}[ar]`, value.ar);
//     });

//     formData.append("start_date", getUTCDate(values.start_date));
//     if (values.end_date) {
//       formData.append("end_date", getUTCDate(values.end_date));
//     }

//     const optionalFields = {
//       trainer_name: values.trainer_name,
//       category_id: values.category_id?.toString(),
//       code: values.code,
//       status: values.status,
//       image: values.image,
//     };

//     Object.entries(optionalFields).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         formData.append(key, value);
//       }
//     });

//     // dispatch(createExamSection(formData));
//   };

//   return (
//     <section className="p-3 sm:p-6">
//       <Header title="Add New Exam Section" />
//       <AssignmentSessionAddOperation
//         initialValues={fakeData}
//         submitHandler={submitHandler}
//         // operationLoading={operationLoading}
//         op="add"
//       />
//       {/* <OperationAlert
//         messageOnSuccess="Exam section added successfully"
//         messageOnError={`Oops! ${operationError}`}
//         status={status}
//         error={operationError}
//         completedAction={examSectionOperationCompleted}
//       /> */}
//     </section>
//   );
// };

// export default AddAssignmentSecion;



"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { getUTCDate } from "@/utils/dateFuncs";

import Header from "@/components/Pars/Header";
import OperationAlert from "@/components/Pars/OperationAlert";

import dynamic from "next/dynamic";
const AssignmentSessionAddOperation = dynamic(
  () => import("@/components/assignments/assignmentSessionA/assignmentSessionAdd/AssignmentSessionAddOperation"),
  {
    ssr: false,
  }
);

const AddAssignmentSecion = () => {
 // const dispatch = useDispatch<any>();

  // const { operationLoading, operationError, status } = useSelector(
  //   (state: GlobalState) => state.examSections
  // );

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

  const fakeData = {
    title: { en: "Introduction to React", ar: "مقدمة في React" },
    trainer_name: "John Doe",
    start_date: new Date("2023-11-01T09:00:00Z"),
    end_date: new Date("2023-11-15T17:00:00Z"),
    category_id: 2,
    code: "REACT101",
    status: "active",
    description: {
      en: "This course will teach you the basics of React.",
      ar: "ستتعلم في هذه الدورة الأساسيات في React.",
    },
    organization_name: "Online Platform", // Example value for "جهة"
    image: null,
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
      <Header title="Add New Exam Section" />
      <AssignmentSessionAddOperation
        initialValues={fakeData}
        submitHandler={submitHandler}
        // operationLoading={operationLoading}
        op="add"
      />
      {/* <OperationAlert
        messageOnSuccess="Exam section added successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={examSectionOperationCompleted}
      /> */}
    </section>
  );
};
export default AddAssignmentSecion;