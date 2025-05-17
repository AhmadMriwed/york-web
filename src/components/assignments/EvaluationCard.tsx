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
  FaCalendarAlt,
  FaHourglassHalf,
  FaLink,
} from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HiDotsVertical } from "react-icons/hi";
import { Progress, Empty, Modal, Space, Button, Typography } from "antd";
import { Dropdown, IconButton, Loader } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { useParams, useRouter } from "next/navigation";
import { MdTitle } from "react-icons/md";
import { useFetchWithId } from "@/hooks/useFetch";
import { Evaluation } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  changeEvaluationStatus,
  deleteEvaluation,
  fetchEvaluationById,
} from "@/lib/action/assignment_action";
import { toast } from "sonner";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import { More, Edit, Trash, Paragraph } from "@rsuite/icons";
import copy from "copy-to-clipboard";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateUrl,
  generateUrlForTrainer,
} from "@/lib/action/evaluation_action";

import { Loader2 } from "lucide-react";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { useForm } from "react-hook-form";
import { RiAiGenerate } from "react-icons/ri";

type EvaluationCardProps = {
  evaluationId: number;
  color: "blue" | "green";
  showActions?: boolean;
  className?: string;
  refetch?: () => void;
};

const EvaluationCard = ({
  evaluationId,
  color,
  showActions = false,
  className = "",
  refetch,
}: EvaluationCardProps) => {
  const [progress, setProgress] = useState<number | null>(null);
  const [showDeleteEvaluationModal, setShowDeleteEvaluationModal] =
    useState<boolean>(false);

  const router = useRouter();
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalForGenerateUrlOpen, setIsModalForGenerateUrlOpen] =
    useState(false);

  const { mode } = useContext(ThemeContext) as { mode: "dark" | "light" };

  const {
    data: evaluation,
    isLoading,
    error,
    refetch: refetchEvaluation,
  } = useFetchWithId<Evaluation>(fetchEvaluationById, evaluationId!);

  useEffect(() => {
    if (
      evaluation?.grade_percentage !== undefined &&
      evaluation?.grade_percentage !== null
    ) {
      setProgress(evaluation.grade_percentage);
    } else {
      setProgress(null);
    }
  }, [evaluation?.grade_percentage]);

  const deleteEvaluationFunction = async () => {
    setIsDeleting(true);
    try {
      await refetchEvaluation();
      await deleteEvaluation(evaluationId);
      if (refetch) {
        await refetch();
      }
    } catch (error) {
      toast.error("Failed to delete evaluation");
    } finally {
      setIsDeleting(false);
    }
  };

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

  const onToggleStatus = async () => {
    try {
      await changeEvaluationStatus(evaluationId);
      await refetchEvaluation();
      if (refetch) {
        await refetch();
      }
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Error toggling evaluation status:", error);
    }
  };

  const onExportClick = () => {
    console.log("export");
  };
  const onViewClick = () =>
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluationId}`
    );

  const onEditClick = () =>
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluationId}/updateEvaluation`
    );

  const onCopyLink = async () => {
    if (!evaluation?.url) {
      if (evaluation?.evaluation_type.id === 2) {
        setIsModalOpen(true);
      } else {
        //  toast.error("url not found");
        setIsModalForGenerateUrlOpen(true);
      }
      return;
    }

    try {
      if (evaluation?.evaluation_type.id === 1) {
        await navigator.clipboard.writeText(
          `https://york-web-wheat.vercel.app/evaluations/trainer/${evaluation?.url}`
        );
      } else {
        await navigator.clipboard.writeText(
          `https://york-web-wheat.vercel.app/evaluations/trainee/${evaluation?.url}`
        );
      }
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link");
      // Fallback to older method if Clipboard API isn't available
      copy(`https://york-web-wheat.vercel.app/evaluations/${evaluation?.url}`);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl shadow-sm border ${currentColor.border} ${currentColor.bg} ${className}`}
    >
      {/* Header with icon, title and status */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
        <div className="flex items-center gap-3 w-full ">
          <div className="p-2 rounded-lg bg-white h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center dark:bg-gray-800 shadow">
            {currentColor.icon}
          </div>
          <div className="flex items-center mb-3 w-full justify-between  flex-1">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-base sm:text-lg truncate ${currentColor.text}`}
              >
                {evaluation?.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                    evaluation?.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                  }`}
                >
                  {evaluation?.status === "Active" ? (
                    <FaCheckCircle className="text-xs" />
                  ) : (
                    <FaTimesCircle className="text-xs" />
                  )}
                  {evaluation?.status}
                </span>
              </div>
            </div>
            {/* Actions Dropdown */}
            {showActions && (
              <div className="self-end sm:self-auto">
                <Dropdown
                  renderToggle={renderIconButton}
                  placement="bottomEnd"
                  className="mb-5"
                >
                  <Dropdown.Item
                    icon={
                      <FaEye className="text-blue-500 text-primary-color1" />
                    }
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
                    icon={<FaLink className="text-blue-400" />}
                    onClick={onCopyLink}
                    className="flex items-center gap-2"
                  >
                    Copy Link
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={
                      evaluation?.status === "Active" ? (
                        <FaToggleOn className="text-green-500" />
                      ) : (
                        <FaToggleOff className="text-gray-500" />
                      )
                    }
                    onClick={onToggleStatus}
                    className="flex items-center gap-2"
                  >
                    {evaluation?.status === "Active"
                      ? "Deactivate"
                      : "Activate"}
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<Trash className="size-3 " />}
                    onClick={() => setShowDeleteEvaluationModal(true)}
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown>
                <DeleteModal
                  title="Are you sure you want to delete this Evaluation?"
                  note="This action cannot be undone. All data related to this Evaluation . "
                  open={showDeleteEvaluationModal}
                  onCancel={() => setShowDeleteEvaluationModal(false)}
                  onConfirm={deleteEvaluationFunction}
                  isDeleting={isDeleting}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar with percentage */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Completion Rate:
          </span>
          <span className={`text-sm font-bold ${currentColor.text}`}>
            {progress !== null ? `${progress}%` : "Not completed"}
          </span>
        </div>
        {progress !== null ? (
          <Progress
            percent={progress}
            status="active"
            strokeColor={currentColor.progress}
            showInfo={false}
            className="[&_.ant-progress-bg]:h-2 sm:[&_.ant-progress-bg]:h-3"
          />
        ) : (
          <div className="flex items-center gap-2 p-2 rounded bg-gray-200 dark:bg-gray-800">
            <FaHourglassHalf className="text-yellow-500 size-5" />
            <span className="text-sm text-gray-600 dark:text-gray-100 ">
              Evaluation is not finish yet
            </span>
          </div>
        )}
      </div>

      {/* Additional information with icons */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-sm">
        {evaluation?.sub_title && (
          <div className="flex items-start gap-2">
            <MdTitle className="text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400 truncate">
                SubTitle:
              </p>
              <p className="font-medium truncate">{evaluation?.sub_title}</p>
            </div>
          </div>
        )}
        {evaluation?.evaluation_config?.start_date && (
          <div className="flex items-start gap-2">
            <FaCalendarAlt className="text-gray-500 dark:text-gray-400 text-sm mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-gray-500 dark:text-gray-400">Period:</p>
              <div className="flex flex-col mt-2">
                <p className="font-medium truncate">
                  <span className="hidden md:inline-block">Start Date: </span>
                  <span className="xs:hidden">S: </span>
                  {evaluation?.evaluation_config?.start_date}
                </p>
                <p className="font-medium truncate">
                  <span className="hidden md:inline-block">End Date: </span>
                  <span className="md:hidden">E: </span>
                  {evaluation?.evaluation_config?.end_date}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <GenerateTraineeEvaluationUrlModal
        // setIsSuccessGenerateUrl={setIsSuccessGenerateUrl}
        idEvaluation={evaluation?.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      {isModalForGenerateUrlOpen && (
        <GenerateUrlModal
          // setIsSuccessGenerateUrl={setIsSuccessGenerateUrl}
          idEvaluation={evaluation?.id}
          isModalOpen={isModalForGenerateUrlOpen}
          setIsModalOpen={setIsModalForGenerateUrlOpen}
        />
      )}
    </div>
  );
};

export default EvaluationCard;

const GenerateTraineeEvaluationUrlModal = ({
  // setIsSuccessGenerateUrl,
  idEvaluation,
  isModalOpen,
  setIsModalOpen,
}: {
  // setIsSuccessGenerateUrl: any;
  idEvaluation: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const generateTraineeEvaluationUrlSchema = z.object({
    id_number: z.string().min(1, "ID number is required"),
    password: z.string().min(1, "Password is required"),
    exam_section_id: z.number(),
  });

  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  type GenerateFormValues = z.infer<typeof generateTraineeEvaluationUrlSchema>;

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateTraineeEvaluationUrlSchema),
    defaultValues: {
      id_number: "",
      password: "",
      exam_section_id: Number(id),
    },
  });

  const onSubmit = async (values: GenerateFormValues) => {
    setIsSubmitting(true);
    try {
      const data = await generateUrlForTrainer(Number(idEvaluation), values);
      await navigator.clipboard.writeText(
        `https://york-web-wheat.vercel.app/evaluations/trainee/${data.data?.url}`
      );

      console.log(data);
      toast.success(
        "Url generated successfully, and Link copied to clipboard!"
      );
      setIsModalOpen(false);
      // setIsSuccessGenerateUrl((prev: any) => !prev);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate url"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Generate URL"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="md:col-span-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                label="ID Number:"
                name="id_number"
                placeholder="Enter ID number"
              />
            </div>
            <div className="md:col-span-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                label="Password:"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-[8px] hover:text-white px-3 py-[6px] bg-transparent border-1 border-primary-color1 hover:bg-primary-color1"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white rounded-[8px] px-3 py-[6px] bg-primary-color1 hover:bg-primary-color2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin mr-2" />
                  Generating...
                </div>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
const GenerateUrlModal = ({
  // setIsSuccessGenerateUrl,
  idEvaluation,
  isModalOpen,
  setIsModalOpen,
}: {
  // setIsSuccessGenerateUrl: any;
  idEvaluation: number | undefined;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data = await generateUrl(Number(idEvaluation));
      await navigator.clipboard.writeText(
        `https://york-web-wheat.vercel.app/evaluations/trainer/${
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
          {"Generate Url for evaluation"}
        </Title>
        <Text type="secondary">
          {
            "The evaluation does not have url yet , do you want to generate url for it "
          }
        </Text>
      </div>
    </Modal>
  );
};
