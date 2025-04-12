"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import { ErrorToaster } from "@/components/accounts/ErrorToaster";
import AddSupervisorModal from "@/components/accounts/supervisors/AddSupervisorModal";
import ShowUserProfileModal from "@/components/accounts/users/ShowUserProfileModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import {
  completedSupervisorOperation,
  deleteSupervisor,
  getSupervisors,
} from "@/store/adminstore/slices/accounts/supervisorsSlice";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination,Message, useToaster } from "rsuite";

export default function Supervisors() {
  // pagination config

  const [activePage, setActivePage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openVisible, setOpenvisible] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [term, setTerm] = useState("");
  const toaster = useToaster();

  const [userId, setUserId] = useState<number>(0);
  const dispatch: any = useDispatch();

  const { isLoading, error, supervisors, status, perPage, total, operationError } = useSelector(
    (state: GlobalState) => state.supervisors
  );

  console.log("supervisors", supervisors);
  console.log(operationError);
  console.log(error);
  console.log(status);

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.user_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.first_name + " " + row.last_name,
      sortable: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Photo",
      selector: (row: any) => {
        if (row.image === null) {
          return "no image available";
        } else {
          const isUrl = row.image.startsWith("http")
            ? row.image
            : storageURL + row.image;
          return (
            <Image src={isUrl} alt="supervisor photo" width={50} height={50} />
          );
        }
      },
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: any) => row.role.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status?.status || "No Status ",
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: any) => (
        <Action
          id={row.id}
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
    dispatch(getSupervisors({ activePage, term }));
  }, [dispatch, activePage, term]);
  return (
    <main
      className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
        total > perPage && "pb-[70px]"
      }`}
    >
      {" "}
      {isLoading && <Loading />}
      {!isLoading && supervisors.length > 0 && (
        <>
          <CrudLayout
            columns={columns}
            dataTabel={supervisors}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Supervisors"
            factor="id"
            isThereAdd={true}
            isLoading={isLoading}
            isThereChangeStatus={true}
            setTerm={setTerm}
          />

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
      <AddSupervisorModal
        open={openAdd}
        setOpen={setOpenAdd}
        requestType="create"
        label="Add Supervisor"
        operation="Add"
      />
      <AddSupervisorModal
        open={openEdit}
        setOpen={setOpenEdit}
        requestType="edit"
        operation="Update"
        label="Edit Supervisor"
        id={userId}
      />
      <ShowUserProfileModal
        open={openVisible}
        setOpen={setOpenvisible}
        id={userId}
        userType="supervisor"
      />
      <AlertModal
        open={openDelete}
        setOpen={setOpenDelete}
        requestType="delete"
        id={userId}
        status={status}
        completed={completedSupervisorOperation}
        deleteAction={deleteSupervisor}
        label="Are you sure you want to delete the selected supervisor ?"
      />
          <OperationAlert
        messageOnSuccess="The operation was completed successfully"
        messageOnError={`Oops! ${operationError}`}
        status={status}
        error={operationError}
        completedAction={completedSupervisorOperation}
      />
          {status===false &&
       
      <ErrorToaster error={operationError} /> 
      }
    </main>
  );
}
