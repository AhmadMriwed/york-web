"use client";

import React, { useEffect } from "react";
import { Dropdown, Input, InputGroup, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import {
   getAllCoursesAdsByFilteration,
   getCourseFilters,
} from "@/store/userStore/slices/courses/courseAdsSlice";
import { GlobalUserState } from "@/types/storeTypes";
import * as yup from "yup";
import { useFormik } from "formik";
import { FaFilter } from "react-icons/fa";

const courseAdsSchema = yup.object().shape({
   lang: yup.string(),
   validate: yup.boolean(),
   active: yup.boolean(),
   status: yup.string(),
   title: yup.string(),
   start_date: yup.string(),
   end_date: yup.string(),
   category_ids: yup.array(),
   venue_ids: yup.array(),

   //"code":"cv100",

   // "category_ids":[1,2],
   // "venue_ids":[1,2]
});

export default function HomeCourseAds() {
   const formik = useFormik({
      initialValues: {
         lang: "",
         validate: false,
         active: false,
         status: "",
         title: "",
         start_date: "",
         end_date: "",
         category_ids: [],
         venue_ids: [],
      },
      onSubmit: (values) => {
         console.log("values", values);
      },
      validationSchema: courseAdsSchema,
   });

   const dispatch: any = useDispatch();

   const { isLoading, error, coursesAds, filterCourse } = useSelector(
      (state: GlobalUserState) => state.coursesAds
   );

   console.log(filterCourse, "filterCourse");

   useEffect(() => {
      dispatch(getAllCoursesAdsByFilteration());
      dispatch(getCourseFilters());
   }, [dispatch]);

   console.log("loading", isLoading);
   console.log("error", error);
   console.log("coursesAds", coursesAds);

   const dropdowns = [
      {
         id: 1,
         title: "validate",
         items: [
            {
               key: 1,
               title: "valid",
               value: true,
            },
            {
               key: 2,
               title: "invalid",
               value: false,
            },
         ],
      },
      {
         id: 2,
         title: "lang",
         items: [
            {
               key: 1,
               title: "english",
               value: "en",
            },
            {
               key: 2,
               title: "arabic",
               value: "ar",
            },
         ],
      },
      {
         id: 3,
         title: "status",
         items: [
            {
               key: 1,
               title: "active",
               value: true,
            },
            {
               key: 2,
               title: "inactive",
               value: false,
            },
         ],
      },
      {
         id: 4,
         title: "category",
         items: [
            {
               key: 1,
               title: "ctegory 1",
               value: 1,
            },
            {
               key: 2,
               title: "ctegory 2",
               value: 2,
            },
         ],
      },
      {
         id: 5,
         title: "venues",
         items: [
            {
               key: 1,
               title: "venue 1",
               value: 1,
            },
            {
               key: 2,
               title: "venue 2",
               value: 2,
            },
         ],
      },
   ];

   return (
      <div className="bg-gradient-to-b from-[#01475F] to-[#02B5A0] min-w-fit w-[75%] mx-[10%] translate-y-[-40px] lg:translate-y-[-50%] pt-[10px] pb-[20px] md:pb-[50px] px-[20px] lg:px-[35px] rounded-[10px]">
         <div className="text-center text-white">
            <h2 className="text-[28px] font-semibold leading-[1.2] mb-[20px]">
               Learn new skills on your time
            </h2>
            <p className="mb-4">Search Over 57,000 Online Courses</p>
         </div>
         <div className="flex items-center justify-between gap-[20px] flex-wrap">
            <div className="md:grow-0 md:basis-[40%] grow">
               <InputGroup inside>
                  <Input
                     placeholder="Search by Course Name , Code or Details"
                     className="!border-[var(--primary-color1)] "
                     onChange={(value) => formik.setFieldValue("title", value)}
                  />
                  <InputGroup.Button>
                     <SearchIcon className="!text-[20px] text-[var(--primary-color1)]" />
                  </InputGroup.Button>
               </InputGroup>
            </div>
            <div className="grow md:grow-0 md:basis-[50%] flex items-center gap-3 flex-wrap sm:flex-nowrap">
               {dropdowns.map((dropdown) => {
                  if (
                     dropdown.title === "category" ||
                     dropdown.title === "venues"
                  ) {
                     // return (
                     //    <InputPicker
                     //       key={dropdown.id}
                     //       data={dropdown.items}
                     //       placeholder={dropdown.title}
                     //       className="!bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color1)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
                     //       // onChange={(value: string) =>
                     //       //    (props.values.request_type_id = value)
                     //       // }
                     //    />
                     // );
                  }

                  return (
                     <Dropdown
                        title={dropdown.title}
                        key={dropdown.id}
                        className="!bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color1)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
                     >
                        {dropdown.items.map((item) => {
                           return (
                              <Dropdown.Item
                                 className="!text-white"
                                 key={item.key}
                                 onClick={() => {
                                    formik.setFieldValue(
                                       dropdown.title,
                                       item.value
                                    );
                                 }}
                              >
                                 {item.title}
                              </Dropdown.Item>
                           );
                        })}
                     </Dropdown>
                  );
               })}

               <Dropdown
                  title={"Language"}
                  className="!bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color1)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               >
                  {filterCourse.language?.map((lang) => {
                     return (
                        <Dropdown.Item
                           className="!text-white"
                           key={lang.code}
                           onClick={() => {
                              formik.setFieldValue("lang", lang.code);
                           }}
                        >
                           {lang.name}
                        </Dropdown.Item>
                     );
                  })}
               </Dropdown>

               {/* <InputPicker
                  title={"Category"}
                  
                  className="!bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color1)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               >
                  {filterCourse.categories.map((lang) => {
                     return (
                        <InputPicker
                           className="!text-white"
                           key={lang.id}
                           onClick={() => {
                              formik.setFieldValue("category_ids", [formik.values.category_ids,]);
                           }}
                        >
                           {lang.name}
                        </InputPicker>
                     );
                  })}
               </InputPicker> */}

               <div onClick={() => formik.handleSubmit()}>
                  <FaFilter /> Apply filter
               </div>
            </div>
         </div>
      </div>
   );
}
