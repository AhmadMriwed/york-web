"use client";
import AssignmentCard from "@/components/assignments/AssignmentCard";
import AssignmentFilter from "@/components/assignments/AssignmentFilter";
import ExportAssignment from "@/components/assignments/ExportAssignment";
import ExportAssignments from "@/components/assignments/ExportAssignments";
import AssignmentHeader from "@/components/assignments/HeaderAssignment";
import EmptyResult from "@/components/empty-result/EmptyResult";
import Loading from "@/components/Pars/Loading";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useFetch } from "@/hooks/useFetch";
import {
  fetchAssignmentSessions,
  fetchCategories,
  fetchSectionTypes,
  filterAssignmentSessions,
} from "@/lib/action/assignment_action";
import {
  AssignmentSession,
  Category,
  SectionType,
} from "@/types/adminTypes/assignments/assignmentsTypes";

import { GlobalState } from "@/types/storeTypes";
import { Button, Select } from "antd";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { CiExport } from "react-icons/ci";
import { IoArrowBackSharp } from "react-icons/io5";

const AssignmentSessionPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<
    AssignmentSession[]
  >([]);

  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const {
    data: assignmentSessions,
    isLoading: assignmentLoading,
    error,
    refetch,
  } = useFetch<AssignmentSession[]>(fetchAssignmentSessions);

  const { data: types, isLoading: typesLoading } =
    useFetch<SectionType[]>(fetchSectionTypes);

  console.log(types);

  const { data: categories, isLoading: categoriesLoading } =
    useFetch<Category[]>(fetchCategories);

  useEffect(() => {
    if (assignmentSessions) {
      setFilteredAssignments(assignmentSessions);
    }
  }, [assignmentSessions]);

  const [filterValues, setFilterValues] = useState({
    code: "",
    title: "",
    start_date: null as Date | null,
    end_date: null as Date | null,
    category_ids: [] as number[],
    status: null as string | null,
  });

  const resetFilterValues = () => {
    setFilterValues({
      code: "",
      title: "",
      start_date: null,
      end_date: null,
      category_ids: [],
      status: null,
    });
  };

  const handleFilter = async () => {
    try {
      const fromDate = filterValues.start_date
        ? format(filterValues.start_date, "yyyy-MM-dd")
        : undefined;
      const toDate = filterValues.end_date
        ? format(filterValues.end_date, "yyyy-MM-dd")
        : undefined;

      const filtered = await filterAssignmentSessions({
        search: filterValues.code || filterValues.title,
        from_date: fromDate,
        to_date: toDate,
        categories: filterValues.category_ids,
      });

      setFilteredAssignments(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAssignmentSelection = (id: string) => {
    setSelectedAssignments((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAllAssignments = () => {
    if (selectedAssignments.length === filteredAssignments.length) {
      setSelectedAssignments([]);
    } else {
      //@ts-ignore
      setSelectedAssignments(filteredAssignments.map((item) => item.id));
    }
  };

  console.log(categories);

  const filterFields = [
    {
      type: "input",
      name: "code",
      value: filterValues.code,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFilterValues({ ...filterValues, code: e.target.value }),
      placeholder: "Code",
    },
    {
      type: "input",
      name: "title",
      value: filterValues.title,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFilterValues({ ...filterValues, title: e.target.value }),
      placeholder: "Title",
    },
    {
      type: "date",
      name: "start_date",
      value: filterValues.start_date,
      onChange: (value: Date | null) =>
        setFilterValues({ ...filterValues, start_date: value }),
      placeholder: "Start date",
    },
    {
      type: "date",
      name: "end_date",
      value: filterValues.end_date,
      onChange: (value: Date | null) =>
        setFilterValues({ ...filterValues, end_date: value }),
      placeholder: "End date",
    },
    {
      type: "check",
      data: categories,
      value: filterValues.category_ids,
      onChange: (value: number[]) =>
        setFilterValues({ ...filterValues, category_ids: value }),
      placeholder: "Category",
    },
    {
      type: "status",
      name: "status",
      value: filterValues.status,
      onChange: (value: string | null) =>
        setFilterValues({ ...filterValues, status: value }),
      placeholder: "Status",
      options: types,
    },
  ];

  if (error) {
    return <div>Error loading assignments: {error}</div>;
  }

  const isLoading = assignmentLoading || typesLoading;

  return (
    <main className="py-8 px-5 sm:px-8 overflow-x-auto max-w-full">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <div className="flex items-center gap-3 sm:gap-5">
            <IoArrowBackSharp
              className="text-2xl sm:text-[28px] text-[var(--primary-color1)] cursor-pointer mt-1 sm:mt-0"
              onClick={() => router.push("/admin/dashboard")}
            />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-[28px] font-bold text-[var(--primary-color1)]">
                Assignment Sessions
              </h1>
              <p className="m-0 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Schedule all your exams, tests and Certifications
              </p>
            </div>
          </div>

          <Button
            type="primary"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center sm:justify-start px-3 py-2 text-sm sm:text-[16px] text-white font-semibold bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)] w-full sm:w-auto"
            disabled={isLoading}
          >
            <CiExport className="mr-2 text-lg sm:text-xl" />
            Export{" "}
            {selectedAssignments.length > 0
              ? `(${selectedAssignments.length})`
              : ""}
          </Button>
        </div>

        <Link
          href={"/admin/dashboard/assignments/assignment-session/add"}
          className="flex items-center justify-center h-10 px-4 sm:px-5 hover:no-underline rounded-[4px] text-sm sm:text-base text-white hover:!text-white bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)] w-full sm:w-auto"
        >
          + Create New Session
        </Link>
      </header>
      <div className="flex justify-center mt-4">
        <AssignmentFilter
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          resetFilterValues={resetFilterValues}
          filterFields={filterFields}
          disabled={isLoading}
          onApplyFilter={handleFilter}
        />
      </div>
      <ExportAssignments
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedAssignments={selectedAssignments}
        assignments={filteredAssignments}
      />
      <div className="my-7">
        {isLoading ? (
          <Loading />
        ) : filteredAssignments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full flex items-center gap-3 mb-2">
              <input
                type="checkbox"
                checked={
                  selectedAssignments.length === filteredAssignments.length &&
                  filteredAssignments.length > 0
                }
                onChange={selectAllAssignments}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Select all ({selectedAssignments.length} selected)
              </span>
            </div>

            {filteredAssignments.map((item) => (
              <AssignmentCard
                key={item.id}
                assignmentSession={item}
                isSelected={selectedAssignments.includes(String(item.id))}
                onToggleSelect={toggleAssignmentSelection}
                refetch={refetch}
              />
            ))}
          </div>
        ) : (
          <EmptyResult />
        )}
      </div>
    </main>
  );
};

export default AssignmentSessionPage;
