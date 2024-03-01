import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { sessionOperationCompleted } from "@/store/adminstore/slices/sessions/trainingSessionsSlice";
import {
  changeStatus,
  deleteSession,
  duplicateSession,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { calculateHours, getLocalDate } from "@/utils/dateFuncs";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
/* icons */
import { Calendar, More, Edit, Trash, Paragraph } from "@rsuite/icons";
import { FaClock } from "react-icons/fa";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";
/* components */
import Image from "next/image";
import { Avatar, Dropdown, IconButton } from "rsuite";
import ListItem from "./ListItem";
import AlertModal from "../Pars/AlertModal";

const Session = ({ pickable, session }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { operationLoading, deleteStatus } = useSelector(
    (state: GlobalState) => state.sessions
  );
  const dispatch: any = useDispatch();
  const router = useRouter();

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="lg"
        circle
        style={{
          color: `${
            mode === "dark" ? "var(--light-color)" : "var(--dark-color)"
          }`,
        }}
      />
    );
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleShowDetails = () => {
    router.push(
      `/admin-dashboard/courses/training-session/session-info/${session.id}`
    );
  };

  const handleEdit = () => {
    router.push(
      `/admin-dashboard/courses/training-session/update/${session.id}`
    );
  };

  const handleDuplicate = () => {
    dispatch(duplicateSession(session.id));
  };

  const handleActivation = () => {
    const status: "Active" | "Inactive" =
      session.status === "Active" ? "Inactive" : "Active";
    dispatch(
      changeStatus({
        ids: [session.id],
        status: status,
        classification: session.classification_session,
      })
    );
  };

  return (
    <article
      className={`relative p-3 sm:p-6 flex flex-col sm:flex-row gap-4
      rounded-[16px] ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
    >
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${session.title}" ?`}
        deleteAction={deleteSession}
        completed={sessionOperationCompleted}
        id={session.id}
        status={deleteStatus}
        deleteLoading={operationLoading}
      />
      {!pickable && (
        <div className="absolute top-2 right-2">
          <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
            <Dropdown.Item
              icon={<Paragraph />}
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleShowDetails}
            >
              Show Details
            </Dropdown.Item>
            <Dropdown.Item
              icon={<Trash />}
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleDelete}
            >
              Delete
            </Dropdown.Item>
            <Dropdown.Item
              icon={<Edit />}
              className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
              onClick={handleEdit}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              icon={<HiOutlineDuplicate />}
              className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
              onClick={handleDuplicate}
            >
              Duplicate
            </Dropdown.Item>
            <Dropdown.Item
              icon={
                session.status === "Active" ? (
                  <PiToggleRightFill />
                ) : (
                  <PiToggleLeft />
                )
              }
              className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
              onClick={handleActivation}
            >
              {session.status === "Active" ? "Deactivate" : "Activate"}
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
      {!pickable && (
        <div className="bg-slate-400 w-[175px] h-[150px] rounded-[8px]">
          {session.image && (
            <Image
              src={`/${session.image}`}
              alt="Session Image"
              width={400}
              height={400}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </div>
      )}
      <div className="flex-1">
        <h6 className="text-[18px] sm:text-[20px] font-bold max-w-xs">
          {`${session.title && session.title} `}
          <span
            className="bg-[var(--primary-color1)] text-white text-[12px]
            text-center rounded-full px-3 py-1"
          >
            {session.status && session.status}
          </span>
        </h6>
        <div className="flex flex-1 justify-between items-end">
          <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col">
              {session.code && (
                <p className="text-[14px] sm:text-[16px] text-[#888] mt-2">
                  {`code: ${session.code}`}
                </p>
              )}
              {session.training_session_type && (
                <p className="text-[14px] max-w-xs text-[#888]">
                  {`type: ${session.training_session_type.name}`}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Avatar
                src={session.owner.image && session.owner.image}
                alt="Trainer Image"
                size="xs"
                circle
              />
              <p className="text-[14px]">
                {session.owner.first_name + " " + session.owner.last_name}
              </p>
            </div>
          </div>
          <div className="flex items-end xl:items-center flex-col xl:flex-row gap-2 sm:gap-4">
            <ListItem
              icon={<FaClock />}
              text={`${calculateHours(session.date_from, session.date_to)} hr`}
            />
            <ListItem
              icon={<Calendar />}
              text={
                session.date_from &&
                session.date_to &&
                `${getLocalDate(session.date_from)} - ${getLocalDate(
                  session.date_to
                )}`
              }
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Session;
