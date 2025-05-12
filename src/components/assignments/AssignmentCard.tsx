import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Calendar, More, Edit, Trash, Paragraph, Copy } from "@rsuite/icons";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
import Image from "next/image";
import { Dropdown, IconButton, Progress } from "rsuite";
import { Users } from "lucide-react";
import DeleteModal from "./DeleteModal";
import { AssignmentSession } from "@/types/adminTypes/assignments/assignmentsTypes";
import { icons } from "@/constants/icons";
import {
  changeStatus,
  deleteAssignmentSession,
  duplicateAssignmentSession,
} from "@/lib/action/assignment_action";
import { toast } from "sonner";
import DuplicateModal from "./assignmentSessionA/DuplicateModal";

interface AssignmentCardProps {
  assignmentSession: AssignmentSession;
  isSelected: boolean;
  onToggleSelect: (id: any) => void;
  refetch: () => void;
}

const AssignmentCard = ({
  assignmentSession,
  isSelected,
  onToggleSelect,
  refetch,
}: AssignmentCardProps) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const [showDeleteAssignmentSession, setShowDeleteAssignmentSession] =
    useState<boolean>(false);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDuplicating, setIsDuplicating] = useState<boolean>(false);

  const deleteAssignment = async () => {
    setIsDeleting(true);
    try {
      await deleteAssignmentSession(Number(assignmentSession.id));
      refetch();
    } catch (error) {
      toast.error("Failed to delete assignment");
    } finally {
      setIsDeleting(false);
    }
    setShowDeleteAssignmentSession(false);
    router.replace("/admin/dashboard/assignments/assignment-session");
  };

  const handleDuplicate = async () => {
    setIsDuplicating(true);
    try {
      await duplicateAssignmentSession(Number(assignmentSession.id));
      refetch();
    } catch (error) {
      toast.error("Failed to duplicateAssignmentSession assignment");
    } finally {
      setIsDeleting(false);
    }
    setIsDuplicateModalOpen(false);
    router.replace("/admin/dashboard/assignments/assignment-session");
  };

  const changeSessionStatus = async () => {
    try {
      await changeStatus(assignmentSession.id);
      refetch();
      toast.success("Status changed successfully");
    } catch (error) {
      toast.error("Failed to change status");
    }
  };
  const renderIconButton = (props: any, ref: any) => {
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

  const handleShowDetails = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${assignmentSession.id}`
    );
  };

  const handleEdit = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${assignmentSession.id}/update`
    );
  };

  return (
    <article
      className={`p-6 pl-7 flex flex-col rounded-lg ${
        mode === "dark" ? "bg-[#212A34] text-[#FFF]" : "bg-white text-[#000]"
      } shadow-sm hover:shadow-md transition-all duration-200 relative`}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(assignmentSession?.id)}
        className="absolute left-2 top-2 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />

      <div className="flex flex-col sm:hidden gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold">
              {assignmentSession?.title || "Untitled"}
            </h3>
            <p className="text text-gray-500 flex items-center gap-2 mt-2 ">
              <Image src={icons.code} height={18} width={18} alt="code" />

              {assignmentSession?.code}
            </p>
            <p className="text text-gray-500  flex items-center gap-2 ">
              <Image src={icons.trainer} height={18} width={18} alt="trainer" />
              {assignmentSession?.trainer}
            </p>
          </div>
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item icon={<Paragraph />} onClick={handleShowDetails}>
              Show Details
            </Dropdown.Item>
            <Dropdown.Item icon={<Edit />} onClick={handleEdit}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              icon={<Copy />}
              onClick={() => setIsDuplicateModalOpen(true)}
            >
              Duplicate
            </Dropdown.Item>
            <Dropdown.Item
              icon={<Trash />}
              onClick={() => setShowDeleteAssignmentSession(true)}
            >
              Delete
            </Dropdown.Item>
            <Dropdown.Item
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
        <DeleteModal
          title="Are you sure you want to delete this assignment Session?"
          note="This action cannot be undone. All data related to this assignment session will
                      be  removed."
          open={showDeleteAssignmentSession}
          onCancel={() => setShowDeleteAssignmentSession(false)}
          onConfirm={deleteAssignment}
          isDeleting={isDeleting}
        />
        <DuplicateModal
          open={isDuplicateModalOpen}
          onCancel={() => setIsDuplicateModalOpen(false)}
          onConfirm={handleDuplicate}
          isDuplicating={isDuplicating}
          title="Duplicate this item?"
          note="All settings and configurations will be copied."
        />

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary-color1" />
              <span className="text-xs text-gray-600">
                {assignmentSession?.start_date} - {assignmentSession?.end_date}
              </span>
            </div>
            <p className="text text-gray-500 flex items-center gap-2 ">
              <Image
                src={icons.category}
                height={14}
                width={14}
                alt="trainer"
              />

              {assignmentSession?.trainer}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex flex-col sm:flex-row justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="w-full sm:w-[120px] lg:w-[150px] h-[100px] sm:h-auto flex-shrink-0">
            <Image
              src={
                assignmentSession?.image
                  ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${assignmentSession?.image}`
                  : "/register.png"
              }
              alt="assignment image"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex flex-row flex-1 sm:items-center gap-2">
              <div className="flex-1 flex gap-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold max-w-52 truncate ">
                  {assignmentSession?.title || "Untitled"}
                </h3>
                {assignmentSession?.status && (
                  <span
                    style={{
                      backgroundColor:
                        assignmentSession?.status === "Active"
                          ? "var(--primary-color1)"
                          : "red",
                    }}
                    className=" text-white text-xs h-6 px-2 py-1 rounded-full w-fit"
                  >
                    {assignmentSession?.status}
                  </span>
                )}
              </div>
              <div className="">
                <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
                  <Dropdown.Item
                    icon={<Paragraph />}
                    onClick={handleShowDetails}
                  >
                    Show Details
                  </Dropdown.Item>
                  <Dropdown.Item icon={<Edit />} onClick={handleEdit}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<Copy />}
                    onClick={() => setIsDuplicateModalOpen(true)}
                  >
                    Duplicate
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<Trash />}
                    onClick={() => setShowDeleteAssignmentSession(true)}
                  >
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item
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
            <div className="flex md:flex-row flex-col gap-10">
              <div className="space-y-3">
                {assignmentSession?.code && (
                  <p className="text text-gray-500 flex items-center gap-2 ">
                    <Image src={icons.code} height={18} width={18} alt="code" />

                    {assignmentSession?.code}
                  </p>
                )}
                {assignmentSession?.trainer && (
                  <p className="text text-gray-500 flex items-center gap-2 my-2 ">
                    <Image
                      src={icons.trainer}
                      height={18}
                      width={18}
                      alt="code"
                    />

                    {assignmentSession?.trainer}
                  </p>
                )}

                {assignmentSession?.category?.title && (
                  <p className="bg-[#00d4d4] text-black mt-8  text-xs px-2 py-1 rounded-full w-fit">
                    {assignmentSession?.category.title}
                  </p>
                )}

                <div className="flex flex-row gap-4 mt-2 text-xs sm:text-sm">
                  {assignmentSession?.start_date && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="text-primary-color1 text-lg" />
                      <span>{assignmentSession?.start_date}</span>
                    </div>
                  )}
                  {assignmentSession?.end_date && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="text-primary-color1 text-lg" />
                      <span>{assignmentSession?.end_date}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AssignmentCard;
