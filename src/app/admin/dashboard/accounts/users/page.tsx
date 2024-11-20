"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import EditUser from "@/components/accounts/users/EditUser";
import ShowUserProfileModal from "@/components/accounts/users/ShowUserProfileModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import {
  completedUserOperation,
  deleteUser,
  getUsers,
  getUsersByType,
} from "@/store/adminstore/slices/accounts/usersSlice";
import { GlobalState } from "@/types/storeTypes";
import { useStaticEnums } from "@/utils/useStaticEnums";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Pagination } from "rsuite";

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
  const staticEnum = useStaticEnums();

  const dispatch: any = useDispatch();
  const { isLoading, error, users, status, perPage, total } = useSelector(
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
      selector: (row: any) => row.first_name + " " + row.last_name,
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
          <Image src={row.image} alt="user photo" width={50} height={50} />
        ) : (
          "no image available"
        ),
      sortable: true,
    },

    {
      id: "status",
      name: "Status",
      selector: (row: any) =>
        row.account_status?.status ? row.account_status?.status : "suspended",
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
            setUserId(row.user_id);
          }}
          handleVisible={() => {
            setOpenvisible(true);
            setUserId(row.user_id);
          }}
          handleDelete={() => {
            setOpenDelete(true);
            setUserId(row.user_id);
          }}
        />
      ),
    },
  ];

  const filterUserTypeBy = [
    {
      id: 1,
      title: "client",
      type: "Client",
    },
    {
      id: 2,
      title: "trainee",
      type: "Trainee",
    },
    {
      id: 3,
      title: "trainer",
      type: "Trainer",
    },
  ];
  const filterUserStatusBy = [
    {
      id: 1,
      title: "active",
    },
    {
      id: 2,
      title: "inactive",
    },
    {
      id: 3,
      title: "all",
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

      {!isLoading && users.length > 0 && (
        <>
          <CrudLayout
            columns={columns}
            dataTabel={users}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Users"
            isThereAdd={false}
            isLoading={isLoading}
            isThereChangeStatus={true}
            setTerm={setTerm}
          >
            <Dropdown
              className="w-[115px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
              title={"User Type"}
            >
              {staticEnum.accountTypeEnum.map((filter) => {
                return (
                  <Dropdown.Item
                    key={filter.value}
                    onClick={() => {
                      dispatch(getUsersByType(filter.value));
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
                    onClick={() => {}}
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
    </main>
  );
}
