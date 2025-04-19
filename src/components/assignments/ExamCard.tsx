import React, { useContext } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEdit,
  FaFileExport,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaCalendarAlt,
  FaLink,
  FaQuestionCircle,
  FaUsers,
  FaClock,
  FaHashtag,
  FaLanguage,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { Progress } from "antd";
import { Dropdown, IconButton } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";

type ExamCardProps = {
  type: "pre-exam" | "post-exam";
  language: string;
  rate: number;
  questions_number: number;
  students_number: number;
  hours: number;
  code: string;
  status: string;
  startDate: string;
  endDate: string;
  ratedStudents?: number;
  showActions?: boolean;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
  onExport?: () => void;
  onCopyLink?: () => void;
};

const ExamCard = ({
  type,
  language,
  rate,
  questions_number,
  students_number,
  hours,
  code,
  status,
  startDate,
  endDate,
  ratedStudents,
  showActions = true,
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus,
  onExport,
  onCopyLink,
}: ExamCardProps) => {
  const { mode } = useContext(ThemeContext) as { mode: "dark" | "light" };

  // Color configuration based on type
  const colorConfig = {
    "pre-exam": {
      bg: "bg-purple-50 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-200",
      border: "border-purple-400 dark:border-purple-700",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40",
      progress: "#8b5cf6",
      icon: <FaChalkboardTeacher className="text-purple-500 text-3xl" />,
    },
    "post-exam": {
      bg: "bg-orange-50 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-200",
      border: "border-orange-400 dark:border-orange-700",
      hover: "hover:bg-orange-100 dark:hover:bg-orange-900/40",
      progress: "#f97316",
      icon: <FaUserGraduate className="text-orange-500 text-3xl" />,
    },
  };

  const currentColor = colorConfig[type];

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<HiDotsVertical />}
        size="sm"
        circle
        className={`${
          mode === "dark" ? "!text-gray-300" : "!text-gray-600"
        } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700`}
      />
    );
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl w-full shadow-sm border ${currentColor.border} ${currentColor.bg} transition-all duration-200 hover:shadow-md`}
    >
      {/* Header with icon, title and status */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div className="flex items-start sm:items-center gap-3 w-full">
          <div className="p-2 rounded-lg bg-white h-14 w-14 flex items-center justify-center dark:bg-gray-800 shadow">
            {currentColor.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-1 justify-between items-center">
              <h3
                className={`font-semibold ${currentColor.text} text-lg truncate`}
              >
                {type === "pre-exam" ? "Pre-Exam" : "Post-Exam"}
              </h3>
              {/* Actions Dropdown */}
              {showActions && (
                <div className="self-end sm:self-center">
                  <Dropdown
                    renderToggle={renderIconButton}
                    placement="bottomEnd"
                  >
                    <Dropdown.Item
                      icon={<FaEye className="text-blue-500" />}
                      onClick={onViewDetails}
                      className="flex items-center gap-2"
                    >
                      View Details
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaEdit className="text-yellow-500" />}
                      onClick={onEdit}
                      className="flex items-center gap-2"
                    >
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaFileExport className="text-purple-500" />}
                      onClick={onExport}
                      className="flex items-center gap-2"
                    >
                      Export
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaLink className="text-blue-400" />}
                      onClick={onCopyLink}
                      className="flex items-center gap-2"
                    >
                      Copy Link
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={
                        status === "active" ? (
                          <FaToggleOn className="text-green-500" />
                        ) : (
                          <FaToggleOff className="text-gray-500" />
                        )
                      }
                      onClick={onToggleStatus}
                      className="flex items-center gap-2"
                    >
                      {status === "active" ? "Deactivate" : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaTrash className="text-red-500" />}
                      onClick={onDelete}
                      className="flex items-center gap-2"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 flex-shrink-0 ${
                  status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                }`}
              >
                {status === "active" ? (
                  <FaCheckCircle className="text-xs" />
                ) : (
                  <FaTimesCircle className="text-xs" />
                )}
                {status === "active" ? "Active" : "Inactive"}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaLanguage className="text-xs" />
                {language}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaHashtag className="text-xs" />
                {code}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row-reverse  ">
        {/* Rating information with circular progress */}
        <div className="mb-4 flex flex-col items-center mt-4 md:mt-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
            <Progress
              type="circle"
              percent={rate}
              width={80}
              status="active"
              strokeWidth={10}
              strokeColor={currentColor.progress}
              trailColor={mode === "dark" ? "#374151" : "#e5e7eb"}
              format={() => (
                <span className={`text-sm font-bold ${currentColor.text}`}>
                  {rate}%
                </span>
              )}
              className="[&_.ant-progress-circle-path]:stroke-[10]"
            />
          </div>
          <span
            className={`text-sm my-3 mx-auto  ml-2 font-bold ${currentColor.text}`}
          >
            Success Rate
          </span>
        </div>
        {/* Additional information */}
        <div className="grid grid-cols-2 flex-1 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <FaQuestionCircle className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Questions:</p>
            <div>
              <p className="font-medium">{questions_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Students:</p>
            <div>
              <p className="font-medium">{students_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Period:</p>
            <div>
              <p className="font-medium flex-wrap max-w-24 ">
                {startDate} / {endDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Duration:</p>
            <div>
              <p className="font-medium">{hours} hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
