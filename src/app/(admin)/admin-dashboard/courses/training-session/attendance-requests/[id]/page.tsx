"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  attendanceOperationCompleted,
  getAttendanceRequests,
  getUnattendanceUsers,
  updateAttendance,
} from "@/store/adminstore/slices/sessions/attendanceRequestsSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "@/components/Pars/ThemeContext";
/* icons */
import { Check, Close, More } from "@rsuite/icons";
/* components */
import {
  Dropdown,
  IconButton,
  Loader,
  Modal,
  Popover,
  Table,
  Whisper,
} from "rsuite";
import Header from "@/components/Pars/Header";
import Loading from "@/components/Pars/Loading";
import NameCell from "@/components/sessions/CustomCells/NameCell";
import ImageCell from "@/components/sessions/CustomCells/ImageCell";
import TimeCell from "@/components/sessions/CustomCells/TimeCell";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import ConfirmModal from "@/components/Pars/ConfirmModal";
import AddAttendantModal from "@/components/sessions/AddAttendantModal";

const { Column, HeaderCell, Cell } = Table;

const CauseModal = ({
  modalOpen,
  setModalOpen,
  adminCause,
  trainerCause,
}: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="sm"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-dark [&>div>*]:text-[var(--light-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--dark-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--light-color)]"
              : "text-[var(--dark-color)]"
          }`}
        >
          Rejection Cause
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <p>{adminCause && adminCause}</p>
        <p>{trainerCause && trainerCause}</p>
      </Modal.Body>
    </Modal>
  );
};

const ActionCell = ({ rowData, dataKey, sessionId, ...props }: any) => {
  const [causeModalOpen, setCauseModalOpen] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  function objectToUrlEncoded(obj: any) {
    return Object.keys(obj)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      )
      .join("&");
  }

  return (
    <Cell
      {...props}
      className="link-group"
      verticalAlign="center"
      style={{ padding: "6px" }}
    >
      <CauseModal
        modalOpen={causeModalOpen}
        setModalOpen={setCauseModalOpen}
        adminCause={
          rowData.response_admin &&
          rowData.response_admin.cuase &&
          rowData.response_admin.cuase
        }
        trainerCause={
          rowData.response_trainer &&
          rowData.response_trainer.cuase &&
          rowData.response_trainer.cuase
        }
      />
      {rowData.status === "Accept" && <Check className="text-green-600 ml-3" />}
      {rowData.status === "Rejected" && (
        <IconButton
          icon={<Close />}
          circle
          className="text-red-600 hover:text-red-600"
          onClick={() => setCauseModalOpen(true)}
        />
      )}
      {rowData.status === "Pending" && (
        <Whisper
          placement="leftStart"
          trigger="click"
          speaker={(props, ref) => {
            const { className, left, top, onClose } = props;
            const handleSelect = (eventKey: any) => {
              onClose();
              let updatedStatus;
              switch (eventKey) {
                case 1:
                  updatedStatus = "Accept";
                  break;
                case 2:
                  updatedStatus = "Rejected";
                  break;
                default:
                  break;
              }
              const updateData = objectToUrlEncoded({
                status: updatedStatus,
                attend_time: getUTCDate(rowData.attend_time),
              });
              dispatch(updateAttendance({ data: updateData, id: rowData.id }));
            };
            return (
              <Popover
                ref={ref}
                className={className}
                style={{ left, top }}
                full
              >
                <Dropdown.Menu onSelect={handleSelect}>
                  <Dropdown.Item
                    eventKey={1}
                    className="text-green-600 hover:text-green-600 hover:bg-slate-100"
                  >
                    <Check />
                    Accept attendant
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey={2}
                    className="text-red-600 hover:text-red-600 hover:bg-slate-100"
                  >
                    <Close />
                    Reject attendant
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Popover>
            );
          }}
        >
          <IconButton icon={<More />} circle />
        </Whisper>
      )}
    </Cell>
  );
};

const filteringBtns: string[] = ["Pending", "Accepted", "Rejected"];

const AttendanceRequests = ({ params }: any) => {
  const { id } = params;

  const [filterBy, setFilterBy] = useState<string>("Pending");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const {
    isLoading,
    error,
    operationLoading,
    operationError,
    status,
    accepted,
    rejected,
    pending,
  } = useSelector((state: GlobalState) => state.attendanceRequests);
  const dispatch: any = useDispatch();

  const attendanceRequests = useMemo(() => {
    if (filterBy === "Pending") return pending;
    if (filterBy === "Accepted") return accepted;
    if (filterBy === "Rejected") return rejected;
    return [];
  }, [filterBy, pending, accepted, rejected]);

  // Fetch users
  useEffect(() => {
    dispatch(getAttendanceRequests({ type: "Pending", id }));
    dispatch(getAttendanceRequests({ type: "Accepted", id }));
    dispatch(getAttendanceRequests({ type: "Rejected", id }));
    dispatch(getUnattendanceUsers());
  }, [dispatch, id]);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  return (
    <section className="px-2 pt-6 lg:px-6">
      <ConfirmModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        successMsg="The attendant was added successfully."
        failMsg="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completed={attendanceOperationCompleted}
      />
      <AddAttendantModal
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
        sessionID={id}
      />
      <Header
        title="Attendance Requests"
        description="Manage all attendance requests for the session."
        btnTitle="Add Attendant"
        btnAction={() => setAddModalOpen(true)}
      />
      <div className="mt-7 border-b-[1px] border-[#303030] flex justify-evenly sm:justify-start items-center">
        {filteringBtns.map((btnName) => (
          <button
            key={btnName}
            onClick={() => setFilterBy(btnName)}
            className={`py-2 sm:px-4 text-[14px] sm:text-[16px] ${
              filterBy === btnName
                ? "border-b-2 border-[var(--primary-color1)]"
                : ""
            }`}
          >
            {btnName}
            {btnName === "Pending"
              ? `(${pending.length})`
              : btnName === "Accepted"
              ? `(${accepted.length})`
              : `(${rejected.length})`}
          </button>
        ))}
      </div>
      <div className="my-7 max-w-[950px] m-auto">
        <Table
          height={400}
          style={{ borderRadius: "4px", color: "#888" }}
          data={attendanceRequests}
        >
          <Column width={75} align="center">
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="user[user_id]" />
          </Column>

          <Column width={100} align="center" verticalAlign="center">
            <HeaderCell>Image</HeaderCell>
            <ImageCell />
          </Column>

          <Column width={175}>
            <HeaderCell>Name</HeaderCell>
            <NameCell />
          </Column>

          <Column width={175}>
            <HeaderCell>Attend time</HeaderCell>
            <TimeCell dataKey="attend_time" />
          </Column>

          <Column width={175}>
            <HeaderCell>Left time</HeaderCell>
            <TimeCell dataKey="left_time" />
          </Column>

          <Column width={175}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="status" />
          </Column>

          <Column width={75} fixed="right">
            <HeaderCell>{operationLoading ? <Loader /> : "..."}</HeaderCell>
            <ActionCell sessionId={id} />
          </Column>
        </Table>
      </div>
    </section>
  );
};

export default AttendanceRequests;
