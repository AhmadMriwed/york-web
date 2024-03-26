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
   completedVenueOperation,
   createVenue,
   deleteVenue,
   getVenues,
   updateVenue,
} from "@/store/adminstore/slices/enums/venuesSlice";
import { EnumType1 } from "@/types/adminTypes/enums/enumsTypes";
import { GlobalState } from "@/types/storeTypes";
import { storageURL } from "@/utils/api";
import mergeDifferentProperties from "@/utils/mergeDifferentProperties";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "rsuite";
import * as yup from "yup";

export default function Venues() {
   const [activePage, setActivePage] = useState(1);
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [term, setTerm] = useState("");
   const [enumId, setEnumId] = useState<number>(0);
   const dispatch: any = useDispatch();
   const messageOperation: string =
      (openAdd && "adding") ||
      (openEdit && "updating") ||
      (openDelete && "deleting") ||
      "";

   const {
      isLoading,
      error,
      venues,
      perPage,
      status,
      total,
      operationLoading,
   } = useSelector((state: GlobalState) => state.venues);

   const columns = [
      {
         name: "ID",
         selector: (row: EnumType1) => row.id,
         sortable: true,
      },
      {
         name: "Title",
         selector: (row: EnumType1) => row.title,
         sortable: true,

         wrap: true,
         style: {
            minWidth: "100px",
            marginInline: "10px",
            padding: "10px",
         },
      },
      {
         name: "Description",
         selector: (row: EnumType1) => row.description,
         sortable: true,
         wrap: true,
         grow: 3,
         style: {
            minWidth: "300px",
            marginLeft: "10px",
            padding: "10px",
         },
      },
      {
         name: "Image",
         selector: (row: EnumType1) => {
            if (row.image === null) {
               return "no image available";
            } else {
               const isUrl = row.image.startsWith("http")
                  ? row.image
                  : storageURL + row.image;
               return (
                  <Image
                     src={isUrl}
                     alt="category photo"
                     width={50}
                     height={50}
                  />
               );
            }
         },
         style: {
            fontSize: "14px",
         },
         sortable: false,
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
         name: "title",
         label: "Title",
         type: "text",
         placeholder: "Enter a venue title",
         validation: yup.string().required("Venue Title is Required"),
      },

      {
         name: "description",
         label: "Description",
         type: "textarea",
         placeholder: "Enter a Venue description",
         validation: yup.string().required("Venue Description is Required"),
      },
      {
         name: "image",
         label: "Venue Image",
         type: "file",
         placeholder: "Enter a Venue image",
         validation: yup.mixed(),
      },
   ];

   const initialValues = {
      title: "",
      description: "",
      image: null,
   };

   const handleSubmit = (values: any, singleEnum: any) => {
      console.log("submit", values);
      const data = mergeDifferentProperties(singleEnum, values);
      console.log("data", data);
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
         formData.append(key, data[key]);
      });
      console.log(formData);
      dispatch(createVenue(formData));
   };

   useEffect(() => {
      dispatch(getVenues({ activePage, term }));
   }, [dispatch, activePage, term]);

   const handleEdit = (values: any) => {
      console.log("submit", values);
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
         formData.append(key, values[key]);
      });
      console.log(formData);
      dispatch(updateVenue({ formData, enumId }));
   };

   return (
      <main
         className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
            total > perPage && "pb-[70px]"
         }`}
      >
         {isLoading && <Loading />}
         {!isLoading && venues.length > 0 && (
            <>
               <CrudLayout
                  columns={columns}
                  dataTabel={venues}
                  openAdd={openAdd}
                  setOpenAdd={setOpenAdd}
                  interfaceName="Venues"
                  isThereAdd={true}
                  isLoading={isLoading}
                  isThereChangeStatus={false}
                  withImportExport={true}
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
                              [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!text-white"
                  />
               )}
            </>
         )}

         <OperationAlert
            status={status}
            error={error}
            messageOnError={`An error occurred while ${messageOperation} (${error}) , try again `}
            messageOnSuccess={`Venue has been ${messageOperation} successfully`}
            completedAction={completedVenueOperation}
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
            requestType="Add a Venue"
            isLoading={operationLoading}
            loadingContent="Venue Creating ..."
         />

         <AlertModal
            open={openDelete}
            setOpen={setOpenDelete}
            requestType="delete"
            id={enumId}
            status={status}
            completed={completedVenueOperation}
            deleteAction={deleteVenue}
            label="Are you sure you want to delete the selected Venue ?"
         />

         <EditEnums
            id={enumId}
            open={openEdit}
            setOpen={setOpenEdit}
            isLoading={operationLoading}
            requestType="Edit Venue"
            loadingContent="Editing ..."
            formFields={formFields}
            onSubmit={handleEdit}
            initialValues={initialValues}
            url="admin/venue/"
         />
         <AlertModal
            open={openDelete}
            setOpen={setOpenDelete}
            requestType="delete"
            id={enumId}
            status={status}
            completed={completedVenueOperation}
            deleteAction={deleteVenue}
            label="Are you sure you want to delete this venue ?"
         />

         <ShowEnumDetailes
            id={enumId}
            open={openVisible}
            setOpen={setOpenvisible}
            title="Venue Destailes"
            url="admin/venue/"
         />
      </main>
   );
}
