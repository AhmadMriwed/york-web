"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import AddEnums from "@/components/enums/AddEnums";
import EditEnums from "@/components/enums/EditEnums";
import ShowEnumDetailes from "@/components/enums/ShowEnumDetailes";
import {
   completedRequestTypeOperation,
   createRequestType,
   deleteRequestType,
   getRequestTypes,
   updateRequestType,
} from "@/store/adminstore/slices/enums/requestTypesSlice";
import { GlobalState } from "@/types/storeTypes";
import mergeDifferentProperties from "@/utils/mergeDifferentProperties";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "rsuite";
import * as yup from "yup";

export default function RequestTypes() {
   const [activePage, setActivePage] = useState(1);
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [term, setTerm] = useState("");

   const [enumId, setEnumId] = useState<number>(0);
   const messageOperation: string =
      (openAdd && "adding") ||
      (openEdit && "updating") ||
      (openDelete && "deleting") ||
      "";
   const dispatch: any = useDispatch();

   const {
      isLoading,
      error,
      requestTypes,
      status,
      operationLoading,
      perPage,
      total,
   } = useSelector((state: GlobalState) => state.requestTypes);

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
         name: "Type",
         selector: (row: any) => row.type,
         sortable: true,
      },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               id={row.id}
               handleEdit={() => {
                  setOpenEdit(true);
                  setEnumId(row.id);
               }}
               handleVisible={() => {
                  setOpenvisible(true);
                  setEnumId(row.id);
               }}
               handleDelete={() => {
                  setOpenDelete(true);
                  setEnumId(row.id);
               }}
            />
         ),
      },
   ];

   const formFields = [
      {
         name: "name",
         label: "Name",
         type: "text",
         placeholder: "Enter a request name",
         validation: yup.string().required("Request Name is Required"),
      },
      {
         name: "type",
         label: "Type",
         type: "text",
         placeholder: "Enter a request type",

         validation: yup.string().required("Request Type is Required"),
      },
   ];

   const initialValues = {
      name: "",
      type: "",
   };

   const handleSubmit = (values: any) => {
      console.log("submit", values);
      dispatch(createRequestType(values));
   };
   const handleEdit = (values: any, singleEnum: any) => {
      console.log("submit", values);
      const data = mergeDifferentProperties(singleEnum, values);
      console.log("data", data);
      dispatch(updateRequestType({ formData: data, enumId }));
   };

   useEffect(() => {
      dispatch(getRequestTypes({ activePage, term }));
   }, [dispatch, activePage, term]);

   return (
      <main
         className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
            total > perPage && "pb-[70px]"
         }`}
      >
         {" "}
         {isLoading && <Loading />}
         {!isLoading && requestTypes.length > 0 && (
            <CrudLayout
               columns={columns}
               dataTabel={requestTypes}
               openAdd={openAdd}
               setOpenAdd={setOpenAdd}
               interfaceName="Request Types"
               isThereAdd={true}
               isLoading={isLoading}
               withImportExport={true}
               setTerm={setTerm}
            />
         )}
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
         <OperationAlert
            status={status}
            error={error}
            messageOnError={`An error occurred while ${messageOperation} (${error}) , try again `}
            messageOnSuccess={`Category has been ${messageOperation} successfully`}
            completedAction={completedRequestTypeOperation}
            closeAdd={setOpenAdd}
            closeEdit={setOpenEdit}
            closeDelete={setOpenDelete}
         />
         <AddEnums
            formFields={formFields}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            open={openAdd}
            setOpen={setOpenAdd}
            isLoading={operationLoading}
            requestType="Add Request Type"
            loadingContent="Request Type Creating ..."
         />
         <EditEnums
            id={enumId}
            open={openEdit}
            setOpen={setOpenEdit}
            isLoading={operationLoading}
            requestType="Edit Request Type"
            loadingContent="Editing ..."
            formFields={formFields}
            onSubmit={handleEdit}
            initialValues={initialValues}
            url="admin/requestType/"
         />
         <AlertModal
            open={openDelete}
            setOpen={setOpenDelete}
            requestType="delete"
            id={enumId}
            status={status}
            completed={completedRequestTypeOperation}
            deleteAction={deleteRequestType}
            label="Are you sure you want to delete this requst type ?"
         />
         <ShowEnumDetailes
            id={enumId}
            open={openVisible}
            setOpen={setOpenvisible}
            title="Request Type Destailes"
            url="admin/requestType/"
         />
      </main>
   );
}
