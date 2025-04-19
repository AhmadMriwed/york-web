import React, { useContext, useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEdit,
  FaFileExport,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { Progress } from "antd";
import { Dropdown, IconButton } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";

type EvaluationCardProps = {
  title: string;
  rate: number;
  color: "blue" | "green";
  status?: string;
  studentsRated?: number | string;
  period?: { start: string; end: string };
  showActions?: boolean;
  onDetailsClick?: () => void;
  onExportClick?: () => void;
  onToggleStatus?: () => void;
  onEditClick?: () => void;
  className?: string;
};

const EvaluationCard = ({
  title,
  rate,
  color,
  status = "Active",
  studentsRated,
  period,
  showActions = false,
  onDetailsClick,
  onExportClick,
  onToggleStatus,
  onEditClick,
  className = "",
}: EvaluationCardProps) => {
  const [progress, setProgress] = useState<number>(0);
  const { mode } = useContext(ThemeContext) as { mode: "dark" | "light" };

  useEffect(() => {
    const timer = setTimeout(() => setProgress(rate), 1500);
    return () => clearTimeout(timer);
  }, [rate]);

  // Color configuration
  const colorConfig = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/30",
      text: "text-blue-700 dark:text-blue-200",
      border: "border-blue-400 dark:border-blue-700",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900/40",
      progress: "#3b82f6",
      icon: <FaChalkboardTeacher className="text-blue-500 text-2xl" />,
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-200",
      border: "border-green-400 dark:border-green-700",
      hover: "hover:bg-green-100 dark:hover:bg-green-900/40",
      progress: "#10b981",
      icon: <FaUsers className="text-green-500 text-3xl" />,
    },
  };

  const currentColor = colorConfig[color];

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
      className={`p-5 rounded-xl shadow-sm border ${currentColor.border} ${currentColor.bg} ${className}`}
    >
      {/* Header with icon, title and status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white h-14 w-14 flex items-center justify-center dark:bg-gray-800 shadow">
            {currentColor.icon}
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${currentColor.text}`}>
              {title} :
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                  status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                }`}
              >
                {status === "Active" ? (
                  <FaCheckCircle className="text-xs" />
                ) : (
                  <FaTimesCircle className="text-xs" />
                )}
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Dropdown */}
        {showActions && (
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              icon={<FaEye className="text-blue-500" />}
              onClick={onDetailsClick}
              className="flex items-center gap-2"
            >
              View Details
            </Dropdown.Item>
            <Dropdown.Item
              icon={<FaEdit className="text-yellow-500" />}
              onClick={onEditClick}
              className="flex items-center gap-2"
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              icon={<FaFileExport className="text-purple-500" />}
              onClick={onExportClick}
              className="flex items-center gap-2"
            >
              Export
            </Dropdown.Item>
            <Dropdown.Item
              icon={
                status === "Active" ? (
                  <FaToggleOn className="text-green-500" />
                ) : (
                  <FaToggleOff className="text-gray-500" />
                )
              }
              onClick={onToggleStatus}
              className="flex items-center gap-2"
            >
              {status === "Active" ? "Deactivate" : "Activate"}
            </Dropdown.Item>
            <Dropdown.Item
              icon={<FaTrash className="text-red-500" />}
              onClick={onToggleStatus}
              className="flex items-center gap-2"
            >
              Delete
            </Dropdown.Item>
          </Dropdown>
        )}
      </div>

      {/* Progress bar with percentage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Completion Rate :
          </span>
          <span className={`text-sm font-bold ${currentColor.text}`}>
            {progress}%
          </span>
        </div>
        <Progress
          percent={progress}
          status="active"
          strokeColor={currentColor.progress}
          showInfo={false}
          className="[&_.ant-progress-bg]:h-3"
        />
      </div>

      {/* Additional information with icons */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {studentsRated && (
          <div className="flex items-center gap-2">
            <FaUserGraduate className="text-gray-500 dark:text-gray-400" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Students : </p>
              <p className="font-medium">{studentsRated}</p>
            </div>
          </div>
        )}
        {period && (
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-sm" />
            <div>
              <p className="text-gray-500 dark:text-gray-400">Period:</p>
              <p className="font-medium ">
                {period.start} / {period.end}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluationCard;
