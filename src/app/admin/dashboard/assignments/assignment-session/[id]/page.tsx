"use client";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Calendar, User, Users } from "lucide-react";

import { Dropdown, IconButton } from "rsuite";
import { More, Edit, Trash, Paragraph } from "@rsuite/icons";
import { PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
import { GrOrganization } from "react-icons/gr";
import { MdCategory, MdDetails } from "react-icons/md";
import EvaluationCard from "@/components/assignments/EvaluationCard";
import ExamCard from "@/components/assignments/ExamCard";
import AddNewItem from "@/components/assignments/AddNewItem";
import DeleteModal from "@/components/assignments/DeleteModal";
import { CiExport } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import {
  Assignment,
  AssignmentSession,
  Evaluation,
} from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  changeEvaluationStatus,
  changeStatus,
  deleteAssignmentSession,
  fetchAssignmentSessionById,
  fetchAssignmentSessions,
  fetchEvaluationById,
} from "@/lib/action/assignment_action";
import Loader from "@/components/loading/Loader";
import Loading from "@/components/Pars/Loading";
import { BsType } from "react-icons/bs";
import { toast } from "sonner";
import { Image } from "antd";
import { Button } from "@/components/ui/button";
import Header from "@/components/headers/header";
import { useFetchWithId } from "@/hooks/useFetch";
import ExportAssignmentSession from "@/components/assignments/ExportAssignmentSession";

const RenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<More />}
      size="lg"
      circle
      className={`${
        mode === "dark"
          ? "!text-[var(--light-bg-color)]"
          : "!text-[var(--dark-color)]"
      } !bg-transparent`}
    />
  );
};

const Page = () => {
  const { id } = useParams();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // delete assignment :
  const [showDeleteAssignmentModal, setShowDeleteAssignmentModal] =
    useState<boolean>(false);

  const deleteAssignment = async () => {
    setIsDeleting(true);
    try {
      await deleteAssignmentSession(Number(id));
    } catch (error) {
      toast.error("Failed to delete assignment");
    } finally {
      setIsDeleting(false);
    }
    router.replace("/admin/dashboard/assignments/assignment-session");
  };

  // export  assignment sessions:
  const [showAssignmentExportModal, setShowAssignmentExportModal] =
    useState<boolean>(false);

  // edit asignment :
  const handleEdit = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/update    `
    );
  };
  //

  const {
    data: assignmentSession,
    isLoading,
    error,
    refetch: refetchData,
  } = useFetchWithId<AssignmentSession>(fetchAssignmentSessionById, Number(id));

  const changeSessionStatus = async () => {
    try {
      await changeStatus(Number(id));
      toast.success("Status changed successfully");
      await refetchData();
    } catch (error) {
      toast.error("Failed to change status");
    }
  };

  const trainerEvaluationId = assignmentSession?.evaluations?.find(
    (e) => e.evaluation_type_id === 1
  )?.id;

  const traineeEvaluationId = assignmentSession?.evaluations?.find(
    (e) => e.evaluation_type_id === 2
  )?.id;

  return (
    <>
      {!assignmentSession ? (
        <div className="h-[100vh] w-full flex justify-center">
          <Loading />
        </div>
      ) : (
        <div
          className={`p-4 sm:p-8 ${
            mode === "dark" ? " text-white" : " text-dark"
          }`}
        >
          <Header title={"Assignment Session"} />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              <div
                className={`p-4 rounded-lg ${
                  mode === "dark" ? "bg-[#212A34]" : "bg-white"
                } shadow-sm`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="w-full">
                    <div className="flex items-start  w-full gap-1 justify-between">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                          {assignmentSession?.title}
                        </h1>
                        <p
                          className={`px-3 py-1 w-fit mt-4 rounded-full text-sm font-medium ${
                            assignmentSession?.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {assignmentSession?.status}
                        </p>
                      </div>
                      {/* Actions Section */}
                      <div className="">
                        <Dropdown
                          renderToggle={RenderIconButton}
                          placement="bottomEnd"
                        >
                          <Dropdown.Item
                            icon={<CiExport />}
                            onClick={() => setShowAssignmentExportModal(true)}
                            className="flex items-center gap-2"
                          >
                            Export
                          </Dropdown.Item>
                          <Dropdown.Item icon={<Edit />} onClick={handleEdit}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            icon={<Trash />}
                            onClick={() => setShowDeleteAssignmentModal(true)}
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="flex items-center gap-2"
                            icon={
                              assignmentSession?.status === "Active" ? (
                                <PiToggleRightFill />
                              ) : (
                                <PiToggleLeft />
                              )
                            }
                            onClick={changeSessionStatus}
                          >
                            {assignmentSession?.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      #{assignmentSession?.code}
                    </p>
                  </div>

                  <ExportAssignmentSession
                    isModalOpen={showAssignmentExportModal}
                    setIsModalOpen={setShowAssignmentExportModal}
                    assignmentSessionId={Number(assignmentSession.id)}
                    defaultTitle={assignmentSession?.title}
                    refetch={refetchData}
                  />
                  <DeleteModal
                    title="Are you sure you want to delete this assignmentSession??"
                    note="This action cannot be undone. All data related to this assignment Session? will
            be permanently removed."
                    open={showDeleteAssignmentModal}
                    onCancel={() => setShowDeleteAssignmentModal(false)}
                    onConfirm={deleteAssignment}
                    isDeleting={isDeleting}
                  />
                </div>

                {/* Image and Basic Info */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="w-full md:w-1/3 lg:w-1/4 h-48 relative rounded-lg overflow-hidden">
                    <Image
                      src={
                        assignmentSession.image
                          ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${assignmentSession?.image}`
                          : "/register.png"
                      }
                      alt={"assignment session "}
                      className="w-32 h-32 object-fill"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <InfoItem
                          label="Category"
                          value={assignmentSession?.category?.title!}
                          icon={<MdCategory className="w-4 h-4" />}
                        />
                        <InfoItem
                          label="Duration"
                          value={`${assignmentSession?.start_date} to ${assignmentSession?.end_date}`}
                          icon={<Calendar className="w-4 h-4" />}
                        />
                        <InfoItem
                          label="Trainer"
                          value={assignmentSession?.trainer!}
                          icon={<User className="w-4 h-4" />}
                        />
                      </div>
                      <div className="space-y-2">
                        <InfoItem
                          label="Type"
                          value={assignmentSession?.type.type!}
                          icon={<BsType className="w-4 h-4 " />}
                        />
                        <InfoItem
                          label="Organization"
                          value={assignmentSession?.organization!}
                          icon={<GrOrganization className="w-4 h-4 " />}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <div
                    className="text-sm text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{
                      __html: assignmentSession.description,
                    }}
                  />
                </div>

                {/* Evaluation */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Evaluation :</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Trainer Evaluation Card */}
                    {trainerEvaluationId ? (
                      <EvaluationCard
                        evaluationId={trainerEvaluationId!}
                        key={trainerEvaluationId!}
                        color="blue"
                        showActions={true}
                        refetch={refetchData}
                      />
                    ) : (
                      <AddNewItem
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/assignments/assignment-session/${id}/addEvaluation?evaluation_type_id=1`
                          )
                        }
                        color="blue"
                        title="Add trainer Evaluation"
                      />
                    )}

                    {/* Trainees Evaluation Card */}
                    {traineeEvaluationId ? (
                      <EvaluationCard
                        evaluationId={traineeEvaluationId!}
                        key={traineeEvaluationId!}
                        color="green"
                        showActions={true}
                        refetch={refetchData}
                      />
                    ) : (
                      <AddNewItem
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/assignments/assignment-session/${id}/addEvaluation?evaluation_type_id=2`
                          )
                        }
                        color="green"
                        title="Add trainee Evaluation"
                      />
                    )}
                  </div>
                </div>

                {/* Exames */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Exams :</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* pre-Exam Card */}
                    {assignmentSession.pre_exams.length > 0 ? (
                      <ExamCard
                        examId={assignmentSession?.pre_exams[0].id!}
                        key={assignmentSession?.pre_exams[0].id!}
                        color="purple"
                        showActions={true}
                        refetch={refetchData}
                      />
                    ) : (
                      <>
                        <AddNewItem
                          title="Add Pre-Exam"
                          icon="exam"
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/assignments/assignment-session/${id}/addAssignment?exam_type_id=1`
                            )
                          }
                          color="purple"
                        />
                      </>
                    )}

                    {/* Post-Exam Card */}
                    {assignmentSession.post_exams.length > 0 ? (
                      <ExamCard
                        examId={assignmentSession?.post_exams[0].id!}
                        key={assignmentSession?.post_exams[0].id!}
                        color="orange"
                        showActions={true}
                        refetch={refetchData}
                      />
                    ) : (
                      <>
                        <AddNewItem
                          title="Add Post-Exam"
                          icon="exam"
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/assignments/assignment-session/${id}/addAssignment?exam_type_id=2`
                            )
                          }
                          color="orange"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-2">
    {icon && <span className="text-gray-500">{icon}</span>}
    <div>
      <span className="text-sm font-medium">{label}: </span>
      <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
    </div>
  </div>
);

export default Page;
