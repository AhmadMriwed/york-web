"use client";
import { Table, Pagination } from "rsuite";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";

const { Column, HeaderCell, Cell } = Table;

const TraineesTable = (data: any) => {
  console.log(data);

  const { id, evaluation_id } = useParams();
  const router = useRouter();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (dataKey: number) => {
    setPage(1);
    setLimit(dataKey);
  };

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

  const handlePreviewEvaluation = (rowData: any) => {
    console.log("Preview evaluation for:", rowData.id);
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/preview-trainee/${rowData.assignment_user_id}/questions`
    );
  };

  // Pagination logic
  const paginatedData = data.data.slice((page - 1) * limit, page * limit);

  return (
    <div className="max-sm:text-sm">
      <Table
        data={paginatedData}
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

        {/* Action Column */}
        <Column width={120} fixed="right">
          <HeaderCell className="text-[15px] lg:text-[16px] dark:bg-[#374151] bg-[#e5e7eb] text-[#1f2937] dark:text-white">
            Actions
          </HeaderCell>
          <Cell className="text-[13px] md:text-[15px] dark:text-gray-200 text-gray-700">
            {(rowData) => {
              const isDisabled =
                rowData.status === "InProgress" ||
                rowData.status === "NotStarted";
              return (
                <button
                  onClick={() => handlePreviewEvaluation(rowData)}
                  disabled={isDisabled}
                  className={`flex items-center gap-1 px-3 py-1 -ml-5 rounded-md transition-all ${
                    isDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : mode === "dark"
                      ? "text-blue-300 hover:text-blue-200 hover:bg-blue-900/50"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                  }`}
                  title={
                    isDisabled
                      ? "Evaluation not available"
                      : "Preview evaluation"
                  }
                >
                  <FaEye className="text-sm" />
                  <span className="max-sm:hidden">Preview</span>
                </button>
              );
            }}
          </Cell>
        </Column>
      </Table>

      {/* Pagination */}
      <div
        className={`mt-4 p-2 flex flex-col sm:flex-row justify-between items-center 
        ${mode === "dark" ? "bg-gray-800" : "bg-gray-50"} rounded-b-lg`}
      >
        <div className="mb-2 sm:mb-0">
          <span
            className={`text-sm ${
              mode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, data.data.length)} of {data.data.length}{" "}
            entries
          </span>
        </div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="md"
          layout={["total", "-", "limit", "|", "pager"]}
          total={data?.data?.length}
          limitOptions={[5, 10, 20, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          className={`${mode === "dark" ? "rs-pagination-dark" : ""}`}
        />
      </div>

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
          .rs-pagination-btn {
            min-width: 32px;
            border-radius: 6px;
            margin: 0 2px;
          }
          .rs-pagination-btn-active {
            background-color: var(--primary-color1) !important;
            color: white !important;
          }
          .rs-pagination-btn:hover:not(.rs-pagination-btn-active) {
            background-color: ${
              mode === "dark" ? "#4b5563" : "#e5e7eb"
            } !important;
          }
          .rs-pagination-select {
            border-radius: 6px;
          }
        `}
      </style>
    </div>
  );
};

export default TraineesTable;
