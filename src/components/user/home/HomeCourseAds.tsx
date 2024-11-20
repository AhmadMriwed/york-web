"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FaFilter } from "react-icons/fa";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import {
  getAllCoursesAdsByFilteration,
  getCourseFilters,
} from "@/store/userStore/slices/courses/courseAdsSlice";
import { GlobalUserState } from "@/types/storeTypes";
import Image from "next/image";

// Define Zod schema
const courseAdsSchema = z.object({
  lang: z.string().optional(),
  validate: z.boolean().optional(),
  active: z.boolean().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  category_ids: z.array(z.number()).optional(),
  venue_ids: z.array(z.number()).optional(),
});

const HomeCourseAds = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(courseAdsSchema),
    defaultValues: {
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
  });

  const { setValue } = form;

  //   useEffect(() => {
  //     dispatch(getAllCoursesAdsByFilteration());
  //     dispatch(getCourseFilters());
  //   }, [dispatch]);

  const onSubmit = () => {
    setIsLoading(true);
    console.log("Form data submitted:");
    toast.success("Filters applied successfully!");
    setIsLoading(false);
  };

  const dropdowns = [
    {
      id: 1,
      title: "validate",
      items: [
        { key: 1, title: "Valid", value: true },
        { key: 2, title: "Invalid", value: false },
      ],
    },
    {
      id: 2,
      title: "lang",
      items: [
        { key: 1, title: "English", value: "en" },
        { key: 2, title: "Arabic", value: "ar" },
      ],
    },
    {
      id: 3,
      title: "status",
      items: [
        { key: 1, title: "Active", value: true },
        { key: 2, title: "Inactive", value: false },
      ],
    },
    {
      id: 4,
      title: "category",
      items: [
        { key: 1, title: "Category 1", value: 1 },
        { key: 2, title: "Category 2", value: 2 },
      ],
    },
    {
      id: 5,
      title: "venues",
      items: [
        { key: 1, title: "Venue 1", value: 1 },
        { key: 2, title: "Venue 2", value: 2 },
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center justify-between gap-[20px] flex-wrap">
            <div className="md:grow-0 md:basis-[40%] grow flex items-center relative">
              <Input
                placeholder="Search by Course Name, Code, or Details"
                className=" bg-white"
                {...form.register("title")}
              />
              <Image
                src={"/icons/search.svg"}
                height={24}
                width={24}
                alt="search"
                className="absolute right-0"
              />
            </div>
            <div className="grow md:grow-0 md:basis-[50%] flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {dropdowns.map((dropdown) => (
                <DropdownMenu key={dropdown.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="!bg-[var(--primary-color1)] !text-white"
                    >
                      {dropdown.title}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {dropdown.items.map((item) => (
                      <DropdownMenuItem key={item.key} onClick={() => {}}>
                        {item.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!bg-[var(--primary-color1)] !text-white"
                  >
                    Language
                  </Button>
                </DropdownMenuTrigger>
                {/* <DropdownMenuContent>
                  {(filterCourse.language ?? []).map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setValue("lang", lang.code)}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent> */}
              </DropdownMenu>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default HomeCourseAds;
