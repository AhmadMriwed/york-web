"use client";
import React, { useContext, useEffect, useState } from "react";
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
  FaHourglassHalf,
} from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { Progress, Empty, Modal, Space, Button, Typography } from "antd";
import { Dropdown, IconButton } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  changeExamStatus,
  deleteExam,
  fetchAssignmentById,
} from "@/lib/action/assignment_action";
import { useFetchWithId } from "@/hooks/useFetch";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { MdQuestionAnswer } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import copy from "copy-to-clipboard";
import { generateUrl } from "@/lib/action/exam_action";
import { RiAiGenerate } from "react-icons/ri";

type ExamCardProps = {
  examId: number;
  color: "purple" | "orange";
  showActions?: boolean;
  className?: string;
  refetch?: () => void;
};

const ExamCard = ({
  examId,
  color,
  showActions = false,
  className = "",
  refetch,
}: ExamCardProps) => {
  const { mode } = useContext(ThemeContext) as { mode: "dark" | "light" };
  const [progress, setProgress] = useState<number | null>(null);
  const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] =
    useState<boolean>(false);

  const [isModalForGenerateUrlOpen, setIsModalForGenerateUrlOpen] =
    useState(false);

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const {
    data: assignment,
    isLoading,
    error,
    refetch: refetchAssignment,
  } = useFetchWithId<Assignment>(fetchAssignmentById, Number(examId));

  console.log(assignment);

  useEffect(() => {
    if (
      assignment?.grade_percentage !== undefined &&
      assignment?.grade_percentage !== null
    ) {
      setProgress(assignment.grade_percentage);
    } else {
      setProgress(null);
    }
  }, [assignment?.grade_percentage]);

  const { id } = useParams();

  console.log(assignment);

  const onToggleStatus = async () => {
    try {
      await changeExamStatus(examId);
      await refetchAssignment();
      if (refetch) {
        await refetch();
      }
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error toggling exam status:", error);
    }
  };

  const onExportClick = () => {
    console.log("export");
  };
  const onViewClick = () =>
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/assignments/${examId}`
    );

  const onEditClick = () =>
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/assignments/${examId}/updateAssignment`
    );
  const onCopyLink = async () => {
    if (!assignment?.url) {
      // toast.error("No URL available to copy");
      setIsModalForGenerateUrlOpen(true);
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `https://york-web-wheat.vercel.app/exam/${assignment?.url}`
      );
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
      // Fallback to older method if Clipboard API isn't available
      copy(`https://york-web-wheat.vercel.app/exam/${assignment?.url}`);
      toast.success("Link copied to clipboard!");
    }
  };

  const onDeleteClick = async () => {
    setIsDeleting(true);
    try {
      await deleteExam(examId);
      if (refetch) {
        await refetch();
      }
      await refetchAssignment();
    } catch (error) {
      toast.error("Failed to delete evaluation");
    } finally {
      setIsDeleting(false);
    }
  };

  const colorConfig = {
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/30",
      text: "text-purple-700 dark:text-purple-200",
      border: "border-purple-400 dark:border-purple-700",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40",
      progress: "#8b5cf6",
      icon: <FaChalkboardTeacher className="text-purple-500 text-3xl" />,
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/30",
      text: "text-orange-700 dark:text-orange-200",
      border: "border-orange-400 dark:border-orange-700",
      hover: "hover:bg-orange-100 dark:hover:bg-orange-900/40",
      progress: "#f97316",
      icon: <FaUserGraduate className="text-orange-500 text-3xl" />,
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
                {assignment?.title}
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
                      onClick={onViewClick}
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
                      {assignment?.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<FaTrash className="text-red-500" />}
                      onClick={() => setShowDeleteAssignmentModal(true)}
                      className="flex items-center gap-2"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              )}
              <DeleteModal
                title="Are you sure you want to delete this Assignment?"
                note="This action cannot be undone. All data related to this Assignment . "
                open={showDeleteAssignmentModal}
                onCancel={() => setShowDeleteAssignmentModal(false)}
                onConfirm={onDeleteClick}
                isDeleting={isDeleting}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 flex-shrink-0 ${
                  assignment?.status === "Active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                }`}
              >
                {assignment?.status === "Active" ? (
                  <FaCheckCircle className="text-xs" />
                ) : (
                  <FaTimesCircle className="text-xs" />
                )}
                {assignment?.status === "Active" ? "Active" : "InActive"}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaLanguage className="text-xl mr-2" />
                {assignment?.exam_config?.language || "English"}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full flex items-center gap-1 flex-shrink-0">
                <FaHashtag className="text-xs" />
                {assignment?.code}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row-reverse">
        {/* Rating information with circular progress */}
        <div className="mb-4 flex flex-col items-center mt-4 md:mt-0">
          {assignment?.grade_percentage !== null ? (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
              <Progress
                type="circle"
                percent={assignment?.grade_percentage || 0}
                width={80}
                status="active"
                strokeWidth={10}
                strokeColor={currentColor.progress}
                trailColor={mode === "dark" ? "#374151" : "#e5e7eb"}
                format={() => (
                  <span className={`text-sm font-bold ${currentColor.text}`}>
                    {assignment?.grade_percentage}%
                  </span>
                )}
                className="[&_.ant-progress-circle-path]:stroke-[10]"
              />
            </div>
          ) : (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex items-center justify-center">
              <FaHourglassHalf className="text-yellow-500 text-3xl" />
            </div>
          )}
          <span
            className={`text-sm my-3 mx-auto ml-2 font-bold ${currentColor.text}`}
          >
            {assignment?.grade_percentage !== null
              ? "Success Rate"
              : "In Progress"}
          </span>
        </div>

        {/* Additional information */}
        <div className="grid grid-cols-2 flex-1 gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <FaQuestionCircle className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Questions:</p>
            <div>
              <p className="font-medium">
                {assignment?.number_of_questions || 0}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MdQuestionAnswer className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">View Answers:</p>
            <div>
              <p className="font-medium">
                {assignment?.exam_config?.view_answer}
              </p>{" "}
              {/* Update this with actual data */}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-sm" />
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400">Period:</p>
              <div className="flex flex-col mt-2">
                <p className="font-medium truncate">
                  <span className="hidden md:inline-block">Start Date: </span>
                  <span className="xs:hidden">S: </span>
                  {assignment?.exam_config?.start_date}
                </p>
                <p className="font-medium truncate">
                  <span className="hidden md:inline-block">End Date: </span>
                  <span className="md:hidden">E: </span>
                  {assignment?.exam_config?.end_date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-gray-500 dark:text-gray-400 text-sm" />
            <p className="text-gray-500 dark:text-gray-400">Duration:</p>
            <div>
              <p className="font-medium">{assignment?.duration_in_minutes}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalForGenerateUrlOpen && (
        <GenerateUrlModal
          // setIsSuccessGenerateUrl={setIsSuccessGenerateUrl}
          ExamId={examId}
          isModalOpen={isModalForGenerateUrlOpen}
          setIsModalOpen={setIsModalForGenerateUrlOpen}
        />
      )}
    </div>
  );
};

export default ExamCard;

const GenerateUrlModal = ({
  // setIsSuccessGenerateUrl,
  ExamId,
  isModalOpen,
  setIsModalOpen,
}: {
  // setIsSuccessGenerateUrl: any;
  ExamId: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = await generateUrl(Number(ExamId));
      await navigator.clipboard.writeText(
        `https://york-web-wheat.vercel.app/exam/${
          data?.data?.data?.url || undefined
        }`
      );

      console.log(data);
      toast.success(
        "Url generated successfully, and Link copied to clipboard!"
      );
      setIsModalOpen(false);
      // setIsSuccessGenerateUrl((prev: any) => !prev);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate url"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const { Text, Title } = Typography;
  return (
    <Modal
      title={
        <Space>
          <RiAiGenerate style={{ color: "#037f85", fontSize: 20 }} />
          <span>Generate Url</span>
        </Space>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={
        <Space>
          <Button onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="primary"
            //  icon={isSubmitting ? null : <DeleteOutlined />}
            onClick={onSubmit}
            loading={isSubmitting}
            className="pb-1"
          >
            {isSubmitting ? "Generating..." : "Generate"}
          </Button>
        </Space>
      }
      centered
      width={450}
    >
      <div style={{ padding: "16px 0" }}>
        <Title level={5} style={{ marginBottom: 8 }}>
          {"Generate Url for exam"}
        </Title>
        <Text type="secondary">
          {
            "The exam does not have url yet , do you want to generate url for it "
          }
        </Text>
      </div>
    </Modal>
  );
};
