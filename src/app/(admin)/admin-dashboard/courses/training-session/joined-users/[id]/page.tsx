"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserStatus,
  getUsersByType,
  joinedUsersCompleted,
} from "@/store/adminstore/slices/sessions/joinedUsersSlice";
import { GlobalState } from "@/types/storeTypes";
import { joinedUserType } from "@/types/adminTypes/sessions/sessionsTypes";
/* icons */
import MoreIcon from "@rsuite/icons/More";
/* components */
import { IconButton, Table, Dropdown, Popover, Whisper, Loader } from "rsuite";
import Header from "@/components/Pars/Header";
import Loading from "@/components/Pars/Loading";
import UserReportModal from "@/components/sessions/UserReportModal";
import EditUserStatusModal from "@/components/sessions/EditUserStatusModal";
import NameCell from "@/components/sessions/CustomCells/NameCell";
import ImageCell from "@/components/sessions/CustomCells/ImageCell";
import TimeCell from "@/components/sessions/CustomCells/TimeCell";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import OperationAlert from "@/components/Pars/OperationAlert";

const { Column, HeaderCell, Cell } = Table;

const ActionCell = ({ rowData, dataKey, sessionId, ...props }: any) => {
  const [userReportOpen, setUserReportOpen] = useState<boolean>(false);
  const [userEditOpen, setUserEditOpen] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const handleViewUser = () => setUserReportOpen(true);

  const handleChangeStatus = (user: joinedUserType) => {
    if (user.status === "Expelled")
      dispatch(
        changeUserStatus({
          id: sessionId,
          ids: [user.user.user_id],
          status: "Joint",
          userType: user.user.account_type,
        })
      );
    else if (user.status === "Joint")
      dispatch(
        changeUserStatus({
          id: sessionId,
          ids: [user.user.user_id],
          status: "Expelled",
          userType: user.user.account_type,
        })
      );
    else return;
  };

  return (
    <Cell {...props} className="link-group" style={{ padding: "6px" }}>
      <UserReportModal
        modalOpen={userReportOpen}
        setModalOpen={setUserReportOpen}
        userData={rowData}
      />
      <EditUserStatusModal
        modalOpen={userEditOpen}
        setModalOpen={setUserEditOpen}
        userData={rowData}
        sessionId={sessionId}
      />
      <Whisper
        placement="leftStart"
        trigger="click"
        speaker={(props, ref) => {
          const { className, left, top, onClose } = props;
          const handleSelect = (eventKey: any) => {
            onClose();
            switch (eventKey) {
              case 1:
                handleViewUser();
                break;
              case 2:
                setUserEditOpen(true);
                break;
              case 3:
                handleChangeStatus(rowData);
                break;
              default:
                break;
            }
          };
          return (
            <Popover ref={ref} className={className} style={{ left, top }} full>
              <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item
                  eventKey={1}
                  className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                >
                  View user report
                </Dropdown.Item>
                {(rowData.status === "Joint" ||
                  rowData.status === "Expelled") && (
                  <>
                    <Dropdown.Item
                      eventKey={2}
                      className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                    >
                      Edit status
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey={3}
                      className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
                    >
                      {rowData.status === "Joint" ? "Expel" : "Rejoin"}
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Popover>
          );
        }}
      >
        <IconButton icon={<MoreIcon />} circle />
      </Whisper>
    </Cell>
  );
};

const filteringBtns: string[] = ["Trainers", "Trainees", "Clients"];

const JoinedUsers = ({ params }: any) => {
  const { id } = params;
  const [filterBy, setFilterBy] = useState<string>("Trainers");
  const {
    isLoading,
    error,
    operationLoading,
    operationError,
    status,
    trainees,
    trainers,
    clients,
  } = useSelector((state: GlobalState) => state.joinedUsers);
  const dispatch: any = useDispatch();

  const users = useMemo(() => {
    if (filterBy === "Trainers") return trainers;
    if (filterBy === "Trainees") return trainees;
    if (filterBy === "Clients") return clients;
    return [];
  }, [filterBy, trainees, trainers, clients]);

  // Fetch users
  useEffect(() => {
    dispatch(getUsersByType({ type: "Trainers", id }));
    dispatch(getUsersByType({ type: "Trainees", id }));
    dispatch(getUsersByType({ type: "Clients", id }));
  }, [dispatch, id]);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <ErrorMessage msg="Oops! There was an error, please try again later." />
    );

  return (
    <section className="px-2 pt-6 lg:px-6">
      <OperationAlert
        messageOnSuccess="operation accomplished successfully!"
        messageOnError="Oops! There was an error, please try again later."
        status={status}
        error={operationError}
        completedAction={joinedUsersCompleted}
      />
      <Header
        title="Joined Users"
        description="Manage all the users who have joined the session."
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
            {btnName === "Trainers"
              ? `(${trainers.length})`
              : btnName === "Trainees"
              ? `(${trainees.length})`
              : `(${clients.length})`}
          </button>
        ))}
      </div>
      <div className="my-7 max-w-[950px] m-auto">
        <Table
          height={400}
          style={{ borderRadius: "4px", color: "#888" }}
          data={users}
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
            <HeaderCell>Join Time</HeaderCell>
            <TimeCell dataKey="joind_time" />
          </Column>

          <Column width={175}>
            <HeaderCell>Left Time</HeaderCell>
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

export default JoinedUsers;
