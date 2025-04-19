import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { AssignmentSession } from "@/app/admin/dashboard/assignments/assignment-session/page";
/* icons */
import { Calendar, More, Edit, Trash, Paragraph } from "@rsuite/icons";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
/* components */
import Image from "next/image";
import { Dropdown, IconButton, Progress } from "rsuite";
import { User, Users } from "lucide-react";
import DeleteModal from "./DeleteModal";

const AssignmentCard = ({ assignment }: { assignment: AssignmentSession }) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [showDeleteAssignmentSession, setShowDeleteAssignmentSession] =
    useState<boolean>(false);

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
      `/admin/dashboard/assignments/assignment-session/${assignment.id}`
    );
  };

  const handleEdit = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${assignment.id}/update    `
    );
  };

  return (
    <article
      className={`p-4 flex flex-col rounded-lg ${
        mode === "dark" ? "bg-[#212A34] text-[#FFF]" : "bg-white text-[#000]"
      } shadow-sm hover:shadow-md transition-all duration-200`}
    >
      {/* Mobile Layout (matches your image) */}
      <div className="flex flex-col sm:hidden gap-4">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold">
              {assignment.title || "Untitled"}
            </h3>
            <p className="text-xs text-gray-500">#{assignment.code}</p>
          </div>
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item icon={<Paragraph />} onClick={handleShowDetails}>
              Show Details
            </Dropdown.Item>
            <Dropdown.Item icon={<Edit />} onClick={handleEdit}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              icon={<Trash />}
              onClick={() => setShowDeleteAssignmentSession(true)}
            >
              Delete
            </Dropdown.Item>
            <DeleteModal
              title="Are you sure you want to delete this assignment Session?"
              note="This action cannot be undone. All data related to this assignment session will
                      be  removed."
              open={showDeleteAssignmentSession}
              onCancel={() => setShowDeleteAssignmentSession(false)}
              onConfirm={() => {}}
            />
            <Dropdown.Item
              icon={
                assignment.status ? <PiToggleRightFill /> : <PiToggleLeft />
              }
            >
              {assignment.status ? "Deactivate" : "Activate"}
            </Dropdown.Item>
          </Dropdown>
        </div>

        {/* Progress and Info Row */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary-color1 text-sm" />
              <span className="text-xs text-gray-600">
                {assignment.start_date} - {assignment.end_date}
              </span>
            </div>
            <div className="text-xs">
              <span className="text-gray-500">Category: </span>
              <span> {assignment.category.title}</span>
            </div>
            {assignment.students_count && (
              <div className="text-xs text-gray-500">
                <Users className="inline mr-1 h-3 w-3" />
                {assignment.students_count} students
              </div>
            )}
          </div>

          <div className="h-16 w-16">
            <Progress.Circle
              percent={assignment.percentage}
              strokeColor={
                assignment.percentage < 50
                  ? "#D26060"
                  : assignment.percentage >= 70
                  ? "#5fc3a5"
                  : "#ffbe74"
              }
              strokeWidth={8}
              trailWidth={8}
              trailColor={mode === "dark" ? "#2a2a2a" : "#f0f0f0"}
              className="[&>.rs-progress-circle-info]:!text-xs"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout (your existing layout) */}
      <div className="hidden sm:flex flex-col sm:flex-row justify-between gap-4 w-full">
        {/* ... rest of your existing desktop layout ... */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Image Section */}
          <div className="w-full sm:w-[120px] lg:w-[150px] h-[100px] sm:h-auto flex-shrink-0">
            <Image
              src={"/register.png"}
              alt="assignment image"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex flex-row flex-1 sm:items-center gap-2">
              <div className="flex-1 flex gap-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold truncate">
                  {assignment.title || "Untitled"}
                </h3>
                {assignment.status && (
                  <span
                    style={{
                      backgroundColor:
                        assignment.status === "Active"
                          ? "var(--primary-color1)"
                          : "red",
                    }}
                    className=" text-white text-xs h-6 px-2 py-1 rounded-full w-fit"
                  >
                    {assignment.status}
                  </span>
                )}
              </div>
              {/* Actions Section */}
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
                    icon={<Trash />}
                    onClick={() => setShowDeleteAssignmentSession(true)}
                  >
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={
                      assignment.status ? (
                        <PiToggleRightFill />
                      ) : (
                        <PiToggleLeft />
                      )
                    }
                  >
                    {assignment.status ? "Deactivate" : "Activate"}
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-10">
              <div className="space-y-3">
                {assignment.code && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    #{assignment.code}
                  </p>
                )}

                {assignment.category?.title && (
                  <span className="bg-[#00d4d4] text-black text-xs px-2 py-1 rounded-full w-fit">
                    {assignment.category.title}
                  </span>
                )}

                {/* Dates - Stack on mobile, inline on larger screens */}
                <div className="flex flex-row gap-4 mt-2 text-xs sm:text-sm">
                  {assignment.start_date && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="text-primary-color1 text-lg" />
                      <span>{assignment.start_date}</span>
                    </div>
                  )}
                  {assignment.end_date && (
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="text-primary-color1 text-lg" />
                      <span>{assignment.end_date}</span>
                    </div>
                  )}
                </div>

                {/* Additional stats can go here */}
                {assignment.students_count && (
                  <div className="text-gray-500 mt-2">
                    <Users className="text-primary-color1 text-xs h-5 mr-2 inline-block" />
                    {assignment.students_count} students
                  </div>
                )}
              </div>
              <div className="h-24 w-24 mx-auto">
                <Progress.Circle
                  percent={assignment.percentage}
                  strokeColor={
                    assignment.percentage < 50
                      ? "#D26060"
                      : assignment.percentage >= 70
                      ? "#5fc3a5"
                      : "#ffbe74"
                  }
                  strokeWidth={10}
                  trailWidth={10}
                  className="[&>.rs-progress-circle-info]:!justify-center [&>.rs-progress-circle-info]:!items-center [&>.rs-progress-circle-info]:!flex [&>.rs-progress-circle-info]:!text-[14px] [&>.rs-progress-svg>.rs-progress-trail]:!stroke-[#bab9b95d]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AssignmentCard;
