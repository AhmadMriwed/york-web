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
import { ThemeContext } from "@/components/pars/ThemeContext";
import { storageURL } from "@/utils/api";
/* icons */
import { Calendar, More, Edit, Trash, Paragraph } from "@rsuite/icons";
import { FaClock } from "react-icons/fa";
import { PiToggleRightFill, PiToggleLeft } from "react-icons/pi";
import { HiOutlineDuplicate } from "react-icons/hi";
/* components */
import Image from "next/image";
import { Dropdown, IconButton } from "rsuite";
import AlertModal from "../pars/AlertModal";

const Session = ({ session }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const { operationLoading, status } = useSelector(
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

  const handleDelete = () => {
    setDeleteModal(true);
  };

  const handleShowDetails = () => {
    router.push(
      `/admin/dashboard/courses/training-session/session-info/${session.id}`
    );
  };

  const handleEdit = () => {
    router.push(
      `/admin/dashboard/courses/training-session/update/${session.id}`
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
      className={`p-3 sm:p-6 flex justify-between gap-2
      rounded-[16px] ${
        mode === "dark" ? "bg-[#212A34] text-[#FFF]" : "bg-white text-[#000]"
      }`}
    >
      <AlertModal
        open={deleteModal}
        setOpen={setDeleteModal}
        requestType="delete"
        label={`Are you sure you want to delete "${session.title}" ?`}
        deleteAction={deleteSession}
        completed={sessionOperationCompleted}
        id={session.id}
        status={status}
      />
      <div className="flex justify-between gap-2">
        <div
          className="bg-slate-400 min-w-[100px] h-[100px] sm:w-[175px] sm:h-[150px] rounded-[8px]"
          onClick={() => console.log(storageURL + session.image)}
        >
          {session.image && (
            <Image
              src={storageURL + session.image}
              alt="session image"
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
        <div className="flex flex-col justify-between gap-1 max-w-[125px] sm:max-w-xs">
          <p className="m-0 text-[12px] sm:text-[18px] font-bold leading-[1rem] sm:leading-[1.6rem]">
            {`${session.title && session.title.slice(0, 24)} `}
            <span
              className="bg-[var(--primary-color1)] text-white text-[10px] sm:text-[12px]
            text-center rounded-full px-[4px] py-[1px] sm:px-3 sm:py-1"
            >
              {session.status && session.status}
            </span>
          </p>
          {session.code && (
            <p className="m-0 text-[10px] sm:text-[14px] sm:text-[16px] text-[#888]">
              {`code: ${session.code}`}
            </p>
          )}
          {session.training_session_type &&
            session.training_session_type.name && (
              <p className="m-0 text-[10px] sm:text-[14px] max-w-xs text-[#888]">
                {`type: ${
                  session.training_session_type.name.slice(0, 16) + "..."
                }`}
              </p>
            )}
          <div className="flex items-center gap-1">
            <div className="bg-slate-400 w-[14px] h-[14px] sm:w-[24px] sm:h-[24px] rounded-full">
              {session.owner.image && (
                <Image
                  src={session.owner.image}
                  alt="trainer image"
                  className="rounded-full"
                  width={400}
                  height={400}
                />
              )}
            </div>
            <p className="text-[10px] sm:text-[14px]">
              {session.owner.first_name &&
                session.owner.last_name &&
                session.owner.first_name + " " + session.owner.last_name}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div>
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
        <div className="flex flex-col xl:flex-row gap-1 sm:gap-2">
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <FaClock />
            <p>
              {session.date_from &&
                session.date_to &&
                `${calculateHours(session.date_from, session.date_to)} hr`}
            </p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{session.date_from && `${getLocalDate(session.date_from)}`}</p>
          </div>
          <div className="text-[10px] sm:text-[14px] flex items-center gap-1">
            <Calendar />
            <p>{session.date_to && `${getLocalDate(session.date_to)}`}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Session;
