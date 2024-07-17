"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import {
   completedRoleOperation,
   deleteRole,
   getRoles,
} from "@/store/adminstore/slices/accounts/rolesSlice";
import { RolesState } from "@/types/adminTypes/accounts/accountsTypes";
import { GlobalState } from "@/types/storeTypes";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "rsuite";

const Roles = () => {
   const [activePage, setActivePage] = useState(1);
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [term, setTerm] = useState("");

   const [roleId, setRoleId] = useState<number>();
   const messageOperation: string =
      (openAdd && "adding") ||
      (openEdit && "updating") ||
      (openDelete && "deleting") ||
      "";

   const {
      isLoading,
      error,
      roles,
      status,
      perPage,
      total,
      operationLoading,
   }: RolesState = useSelector((state: GlobalState) => state.roles);

   const dispatch: any = useDispatch();

   useEffect(() => {
      dispatch(getRoles({ activePage, term }));
   }, [dispatch, activePage, term]);

   console.log("term", term);
   console.log("roles", roles.length);

   const columns = [
      {
         name: "ID",
         selector: (row: any) => row.id,
         sortable: true,
      },
      {
         name: "Name",
         selector: (row: any) => row.name,
         sortable: true,
      },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               id={row.id}
               handleEdit={() => {
                  setOpenEdit(true);
                  setRoleId(row.id);
               }}
               handleVisible={() => {
                  setOpenvisible(true);
                  setRoleId(row.id);
               }}
               handleDelete={() => {
                  setOpenDelete(true);
                  setRoleId(row.id);
               }}
            />
         ),
      },
   ];

   // const searchFire = () => {
   //    console.log("term :", term.current.value);
   // };

   // && roles.length > 0

   return (
      <main
         className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
            total > perPage && "pb-[70px]"
         }`}
      >
         {" "}
         {isLoading && <Loading />}
         {!isLoading && (
            <>
               <CrudLayout
                  columns={columns}
                  dataTabel={roles}
                  interfaceName="Roles"
                  openAdd={openAdd}
                  setOpenAdd={setOpenAdd}
                  isThereAdd={true}
                  isLoading={isLoading}
                  setTerm={setTerm}
                  totalItems={total}
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
         <ModalOperation
            open={openAdd}
            setOpen={setOpenAdd}
            requestType="create"
            operation="Save"
            label="Add Role"
            roleId={roleId}
            operationStatus={status}
         />
         <ModalOperation
            open={openEdit}
            setOpen={setOpenEdit}
            requestType="edit"
            operation="Update"
            label="Edit Role"
            roleId={roleId}
            operationStatus={status}
         />
         <ModalOperation
            open={openVisible}
            setOpen={setOpenvisible}
            requestType="read"
            operation="visible"
            label="Role"
            roleId={roleId}
         />
         <OperationAlert
            status={status}
            error={error}
            messageOnError={`An error occurred while ${messageOperation} (${error}) , try again `}
            messageOnSuccess={`Role has been ${messageOperation} successfully`}
            completedAction={completedRoleOperation}
            closeAdd={setOpenAdd}
            closeEdit={setOpenEdit}
            closeDelete={setOpenDelete}
         />
         <AlertModal
            open={openDelete}
            setOpen={setOpenDelete}
            requestType="delete"
            id={roleId}
            status={status}
            completed={completedRoleOperation}
            deleteAction={deleteRole}
            label="Are you sure you want to delete this role ?"
         />
      </main>
   );
};

export default Roles;
