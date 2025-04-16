"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import { ErrorToaster } from "@/components/accounts/ErrorToaster";
import CrudLayout from "@/components/accounts/crud/CrudLayout";
import AddUserModal from "@/components/accounts/users/AddUserModal";
import EditUser from "@/components/accounts/users/EditUser";
import ShowUserProfileModal from "@/components/accounts/users/ShowUserProfileModal";
import Action from "@/components/crud/Action";
import {
  bulkDestroy,
  changeUserStatus,
  completedUserOperation,
  deleteUser,
  getUsers,
  getUsersByStatus,
  getUsersByType,
} from "@/store/adminstore/slices/accounts/usersSlice";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
import { useStaticEnums } from "@/utils/useStaticEnums";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Message, Pagination, useToaster } from "rsuite";

export default function Users() {
  // pagination config

  const [activePage, setActivePage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openVisible, setOpenvisible] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filteredUserType, setFilteredUserType] = useState("all");
  const [filteredUserStatus, setFilteredUserStatus] = useState("all");
  const [term, setTerm] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const [ isThereChangeStatus, setIsThereChangeStatus] = useState(true);
  const staticEnum = useStaticEnums();

  const dispatch: any = useDispatch();
  const { isLoading, error, users, status, perPage,operationMessage, total, operationError } = useSelector(
    (state: GlobalState) => state.users
  );

  const columns = [
    {
      id: "id",
      name: "ID",
      selector: (row: any) => row.user_id,
      sortable: true,
    },
    {
      id: "name",
      name: "Name",
      // selector: (row: any) => row.first_name + " " + row.last_name,
      selector: (row: any) => row.user_name? row.user_name : row.first_name + " " + row.last_name,
      sortable: true,
    },
    {
      id: "email",
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      id: "photo",
      name: "Photo",
      selector: (row: any) =>
        row.image ? (
          <Image src={row.image.startsWith('http')? row.image : storageURL + row.image} alt="user photo" width={50} height={50} />
        ) : (
          "no image available"
        ),
      sortable: true,
    },

    {
      id: "status",
      name: "Status",
      selector: (row: any) =>
        row.status?.status ? row.status?.status : "suspended",
      sortable: true,
    },
    {
      id: "user type",

      name: "User Type",
      selector: (row: any) => row.account_type,
      sortable: true,
    },
    {
      id: "action",
      name: "Action",
      selector: (row: any) => (
        <Action
          id={row.user_id}
          handleEdit={() => {
            setOpenEdit(true);
            setUserId(row.id);
          }}
          handleVisible={() => {
            setOpenvisible(true);
            setUserId(row.id);
          }}
          handleDelete={() => {
            setOpenDelete(true);
            setUserId(row.id);
          }}
        />
      ),
    },
  ];

  
  useEffect(() => {
    dispatch(getUsers({ activePage, term }));
  }, [dispatch, activePage, term]);

  return (
    <main
      className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
        total > perPage && "pb-[70px]"
      }`}
    >
      {isLoading && <Loading />}

      {!isLoading && users.length >= 0 && (
        <>
          <CrudLayout
            columns={columns}
            dataTabel={users}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Users"
            isThereAdd={true}
            isLoading={isLoading}
            isThereChangeStatus={true}
            setTerm={setTerm}
            action={changeUserStatus}
            actionForDelete={bulkDestroy}
            status = {status}
          >
            <Dropdown
              className="w-[115px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
              title={filteredUserType === 'all'? "User Type": filteredUserType}
            >
              {staticEnum.accountTypeEnum.map((filter) => {
                return (
                  <Dropdown.Item
                    key={filter.value}
                    onClick={() => {
                      setFilteredUserType(filter.value);
                      dispatch(getUsersByType({ activePage, filteredUserType}));
                    }}
                    className="text-white capitalize"
                  >
                    {filter.label}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item
                onClick={() => {
                  dispatch(getUsers({ activePage, term }));
                }}
                className="text-white capitalize"
              >
                All
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              className="w-[115px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
              title={
                filteredUserStatus === "all"
                  ? "User Status"
                  : filteredUserStatus
              }
            >
              {staticEnum.activateAccount.map((filter) => {
                return (
                  <Dropdown.Item
                    key={filter.value}
                    className="text-white capitalize"
                    onClick={() => {
                      setFilteredUserStatus(filter.value);
                      dispatch(getUsersByStatus(filter.value));
                    }}
                  >
                    {filter.label}
                  </Dropdown.Item>
                );
              })}
              <Dropdown.Item
                onClick={() => {
                  dispatch(getUsers({ activePage, term }));
                }}
                className="text-white capitalize"
              >
                All
              </Dropdown.Item>
            </Dropdown>
          </CrudLayout>
          {total > perPage && (
            <Pagination
              prev
              next
              size="sm"
              total={total}
              limit={perPage}
              maxButtons={3}
              activePage={activePage}
              onChangePage={setActivePage}
              className="my-[30px] w-max absolute left-[50%] bottom-0 translate-x-[-50%] 
               [&>div_.rs-pagination-btn]:!bg-white
               [&>div_.rs-pagination-btn]:!text-[var(--primary-color2)]
               [&>div_.rs-pagination-btn]:!mx-[5px]
               [&>div_.rs-pagination-btn]:!rounded-[50%]
               [&>div_.rs-pagination-btn]:!border-none
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!bg-[var(--primary-color2)]
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!text-white
               "
            />
          )}
        </>
      )}

      <ShowUserProfileModal
        open={openVisible}
        setOpen={setOpenvisible}
        id={userId}
        userType="user"
      />
      <AddUserModal open={openAdd} setOpen={setOpenAdd} />

      <EditUser open={openEdit} setOpen={setOpenEdit} id={userId} />

      <AlertModal
        open={openDelete}
        setOpen={setOpenDelete}
        requestType="delete"
        id={userId}
        status={status}
        completed={completedUserOperation}
        deleteAction={deleteUser}
        label="Are you sure you want to delete the selected user ?"
      />
             <OperationAlert
              messageOnSuccess={'Operation has been completed successfuly'}
              messageOnError={`Oops! ${operationError}`}
              status={status}
              error={operationError}
              completedAction={completedUserOperation}
            />
            {status === false && <ErrorToaster error={operationError}/>}
    </main>
  );
}
