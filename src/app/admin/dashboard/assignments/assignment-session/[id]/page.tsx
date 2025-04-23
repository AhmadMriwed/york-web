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
import ExportAssignment from "@/components/assignments/ExportAssignment";
import { CiExport } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { AssignmentSession } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  changeStatus,
  deleteAssignmentSession,
  fetchAssignmentSessionById,
  fetchAssignmentSessions,
} from "@/lib/action/assignment_action";
import Loader from "@/components/loading/Loader";
import Loading from "@/components/Pars/Loading";
import { BsType } from "react-icons/bs";
import { toast } from "sonner";
import { Image } from "antd";

const RenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<More />}
      size="md"
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
  const [assignmentSession, setAssignmentSession] =
    useState<AssignmentSession>();
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

  // export  assignment:
  const [showAssignmentExportModal, setShowAssignmentExportModal] =
    useState<boolean>(false);

  // edit asignment :
  const handleEdit = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/update    `
    );
  };
  //
  const changeSessionStatus = async () => {
    await changeStatus(Number(id));
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchAssignmentSessionById(Number(id));
      setAssignmentSession(data);
    };
    fetch();
  }, [id, changeSessionStatus]);

  const there_is_trainer = false;
  const there_is_trainee = true;
  const there_is_preExam = true;
  const there_is_postExam = false;

  const assignment = {
    id: id as string,
    image: "https://example.com/image1.jpg",
    code: "MATH101",
    title: "Algebra Basics",
    category: {
      id: "cat1",
      title: "Mathematics",
    },
    start_date: "2024-01-10",
    end_date: "2024-02-20",
    students_count: "25",
    percentage: 75,
    status: "Active",
    trainer: "Dr. Ahmad Mohamed",
    organization: "University of Science",
    description:
      "This course covers fundamental algebraic concepts including linear equations, polynomials, and quadratic functions. Students will learn problem-solving techniques and apply them to real-world scenarios.",
    trainer_evaluation: {
      trainer_evaluation_rate: 30,
      trainer_evaluation_status: "Active",
      trainer_evaluation_students: "18",
      trainer_evaluation_start: "2024-01-10",
      trainer_evaluation_end: "2024-02-20",
    },
    trainees_evaluation: {
      trainees_evaluation_rate: 70,
      trainees_evaluation_status: "Active",
      trainees_evaluation_start: "2024-01-10",
      trainees_evaluation_end: "2024-02-20",
    },
  };

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
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]"
          >
            <IoArrowBackSharp className="text-xl" />
            <p className="text-lg font-semibold">Assignments Session</p>
          </button>

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
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-xl sm:text-2xl font-bold">
                        {assignmentSession?.title}
                      </h1>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          assignmentSession?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {assignmentSession?.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      #{assignmentSession?.code}
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
                          ? "Active"
                          : "Deactive"}
                      </Dropdown.Item>
                      <Dropdown.Item
                        icon={<FaPlus />}
                        onClick={() =>
                          router.push(
                            "/admin/dashboard/assignments/assignment-session/addAssignment"
                          )
                        }
                        className="text-xs flex gap-2"
                      >
                        Add Assignment
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                  <ExportAssignment
                    isModalOpen={showAssignmentExportModal}
                    setIsModalOpen={setShowAssignmentExportModal}
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
                        assignment.image
                          ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${assignmentSession?.image}`
                          : "/register.png"
                      }
                      alt={"assignment session "}
                      className="w-32 h-32 object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <InfoItem
                          label="Category"
                          value={assignmentSession?.category.title!}
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
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {assignmentSession?.description}
                  </p>
                </div>

                {/* Evaluation */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Evaluation :</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Trainer Evaluation Card */}
                    {there_is_trainer ? (
                      <EvaluationCard
                        title="Trainer Evaluation"
                        rate={
                          assignment.trainer_evaluation.trainer_evaluation_rate
                        }
                        color="blue"
                        status={
                          assignment.trainer_evaluation
                            .trainer_evaluation_status
                        }
                        studentsRated={
                          assignment.trainer_evaluation
                            .trainer_evaluation_students
                        }
                        period={{
                          start:
                            assignment.trainer_evaluation
                              .trainer_evaluation_start,
                          end: assignment.trainer_evaluation
                            .trainer_evaluation_end,
                        }}
                        showActions={true}
                        onDetailsClick={() =>
                          console.log("Trainer details clicked")
                        }
                        onExportClick={() =>
                          console.log("Trainer export clicked")
                        }
                        onToggleStatus={() =>
                          console.log("Trainer status toggled")
                        }
                        onEditClick={() =>
                          console.log("Trainees status toggled")
                        }
                      />
                    ) : (
                      <>
                        <AddNewItem
                          onClick={() =>
                            router.push(
                              "/admin/dashboard/assignments/assignment-session/addEvaluation"
                            )
                          }
                          color="blue"
                          title="Add trainer Evaluation"
                        />
                      </>
                    )}

                    {/* Trainees Evaluation Card */}
                    {there_is_trainee ? (
                      <EvaluationCard
                        title="Trainees Evaluation"
                        rate={
                          assignment.trainees_evaluation
                            .trainees_evaluation_rate
                        }
                        color="green"
                        status={
                          assignment.trainees_evaluation
                            .trainees_evaluation_status
                        }
                        period={{
                          start:
                            assignment.trainees_evaluation
                              .trainees_evaluation_start,
                          end: assignment.trainees_evaluation
                            .trainees_evaluation_end,
                        }}
                        showActions={true}
                        onDetailsClick={() =>
                          console.log("Trainees details clicked")
                        }
                        onExportClick={() =>
                          console.log("Trainees export clicked")
                        }
                        onToggleStatus={() =>
                          console.log("Trainees status toggled")
                        }
                        onEditClick={() =>
                          router.push(
                            "/admin/dashboard/assignments/assignment-session/addEvaluation"
                          )
                        }
                      />
                    ) : (
                      <>
                        <AddNewItem
                          onClick={() => {}}
                          color="green"
                          title="Add trainee Evaluation"
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Exames */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Exams :</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prost-Exam Card */}
                    {there_is_preExam ? (
                      <ExamCard
                        type="pre-exam"
                        language="English"
                        rate={75}
                        questions_number={20}
                        students_number={25}
                        hours={2}
                        code="PRE-001"
                        status="active"
                        startDate="2024-01-10"
                        endDate="2024-01-15"
                        ratedStudents={18}
                        onViewDetails={() =>
                          console.log("View Pre-Exam Details")
                        }
                        onEdit={() => console.log("Edit Pre-Exam")}
                        onDelete={() => console.log("Delete Pre-Exam")}
                        onToggleStatus={() =>
                          console.log("Toggle Pre-Exam Status")
                        }
                        onExport={() => console.log("Export Pre-Exam")}
                        onCopyLink={() => console.log("Copy Pre-Exam Link")}
                      />
                    ) : (
                      <>
                        <AddNewItem
                          title="Add Pre-Exam"
                          icon="exam"
                          onClick={() =>
                            router.push(
                              "/admin/dashboard/assignments/assignment-session/addAssignment"
                            )
                          }
                          color="purple"
                        />
                      </>
                    )}

                    {/* Post-Exam Card */}
                    {there_is_postExam ? (
                      <ExamCard
                        type="post-exam"
                        language="English"
                        rate={85}
                        questions_number={25}
                        students_number={25}
                        hours={3}
                        code="POST-001"
                        status="active"
                        startDate="2024-02-10"
                        endDate="2024-02-15"
                        ratedStudents={22}
                        onViewDetails={() =>
                          console.log("View Post-Exam Details")
                        }
                        onEdit={() => console.log("Edit Post-Exam")}
                        onDelete={() => console.log("Delete Post-Exam")}
                        onToggleStatus={() =>
                          console.log("Toggle Post-Exam Status")
                        }
                        onExport={() => console.log("Export Post-Exam")}
                        onCopyLink={() => console.log("Copy Post-Exam Link")}
                      />
                    ) : (
                      <>
                        <AddNewItem
                          title="Add Post-Exam"
                          icon="exam"
                          onClick={() =>
                            router.push(
                              "/admin/dashboard/assignments/assignment-session/addAssignment"
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
