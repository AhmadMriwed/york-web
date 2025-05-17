"use client";
import { Table } from "rsuite";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useContext, useState } from "react";

const { Column, HeaderCell, Cell } = Table;

const StudentResultsTable = (data: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    setSelectedIds(checkAll ? [] : data.data.map((student: any) => student.id));
  };

  const handleCheck = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "excellent":
      case "Excellent":
      case "Completed":
        return "bg-green-100 text-green-800";
      case "very good":
      case "VeryGood":
      case "InProgress":
        return "bg-blue-100 text-blue-800";
      case "good":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="max-sm:text-sm">
      <Table
        data={data.data}
        rowClassName={`${
          mode === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
        }`}
        headerHeight={70}
        rowHeight={60}
        autoHeight
        className="custom-scrollbar-table"
        renderEmpty={() => (
          <div
            className={`flex flex-col items-center justify-center py-8 ${
              mode === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3
              className={`text-lg font-medium ${
                mode === "dark" ? "text-gray-200" : "text-gray-700"
              }`}
            >
              No Data Found
            </h3>
            <p
              className={`mt-1 ${
                mode === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              There are no student results to display at this time.
            </p>
          </div>
        )}
      >
        {/* Columns mapping */}
        {[
          {
            label: "Student Name",
            dataKey: "full_name",
            width: 160,
            customRender: (rowData: any) =>
              rowData.first_name + " " + rowData.last_name || "N/A",
          },
          { label: "Student ID", dataKey: "id_number", width: 110 },
          { label: "Email", dataKey: "email", width: 230 },
          {
            label: "Submission Time",
            dataKey: "submission_time",
            width: 190,
            customRender: (rowData: any) =>
              rowData.answers?.[0]?.submission_time || "N/A",
          },
          {
            label: "Duration",
            dataKey: "duration",
            width: 110,
            customRender: (rowData: any) =>
              rowData.answers?.[0]?.time_to_stay_until_the_answer || "N/A",
          },
          { label: "Score", dataKey: "grade", width: 110 },
          {
            label: "Correct Answers",
            dataKey: "correct_answers_count",
            width: 160,
          },
          {
            label: "Wrong Answers",
            dataKey: "wrong_answers_count",
            width: 160,
          },
          { label: "Status", dataKey: "status", width: 160 },
        ].map((column, index) => (
          <Column key={index} width={column.width}>
            <HeaderCell className="text-[15px] lg:text-[16px] dark:bg-[#374151] bg-[#e5e7eb] text-[#1f2937] dark:text-white">
              {column.label}
            </HeaderCell>
            <Cell className="text-[13px] md:text-[15px] dark:text-gray-200 text-gray-700">
              {(rowData) => {
                if (column.dataKey === "grade")
                  return `${rowData[column.dataKey]}%`;
                if (column.dataKey === "status")
                  return (
                    <span
                      className={`px-3 py-[6px] rounded-full text-[14px] max-sm:px-2 max-sm:py-1 max-sm:text-[13px] ${statusColor(
                        rowData?.status
                      )}`}
                    >
                      {rowData?.status}
                    </span>
                  );
                if (column.customRender) {
                  return column.customRender(rowData);
                }
                return rowData[column.dataKey] || "N/A";
              }}
            </Cell>
          </Column>
        ))}
      </Table>
      <style>
        {`
          .rs-table-scrollbar-handle {
            background-color: var(--primary-color1)
          }
          .rs-table-scrollbar-pressed .rs-table-scrollbar-handle {
            background-color: var(--primary-color1)
          }
      .rs-table-cell {
            padding-left: 16px;
            padding-right: 16px;
          }
          .rs-table-header-cell {
            padding-left: 16px;
            padding-right: 16px;
          }
        `}
      </style>
    </div>
  );
};

export default StudentResultsTable;
