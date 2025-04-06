"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import AddEnums from "@/components/enums/AddEnums";
import { AddNewItem } from "@/components/enums/AddNew";
import EditEnums from "@/components/enums/EditEnums";
import { EditItem } from "@/components/enums/EditItem";
import ShowEnumDetailes from "@/components/enums/ShowEnumDetailes";
import { NewItemFormValidation } from "@/lib/validation";
import {
  completedVenueOperation,
  createVenue,
  deleteVenue,
  deleteVenues,
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
import { z } from "zod";

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

  const { isLoading, error, venues, perPage, status, total, operationLoading } =
    useSelector((state: GlobalState) => state.venues);
  console.log(venues);

  const columns = [
    {
      name: "ID",
      selector: (row: EnumType1) => row.id || "1",
      sortable: true,
    },
    {
      name: "Title",
      selector: (row: EnumType1) =>
        //@ts-ignore
        typeof row.title === "string" ? row.title : row.title?.en || "No title",
      sortable: true,
      wrap: true,
    },
    {
      name: "Description",
      selector: (row: EnumType1) =>
        typeof row.description === "string"
          ? row.description
          : //@ts-ignore
            row.description?.en || "No description",
      sortable: true,
      wrap: true,
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
            <Image src={isUrl} alt="category photo" width={50} height={50} />
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

  const handleSubmit = (values: z.infer<typeof NewItemFormValidation>) => {
    const formData = new FormData();

    // Append data in the format the backend expects
    formData.append("title[en]", values.title_en);
    if (values.description_en)
      formData.append("description[en]", values.description_en);
    if (values.title_ar) formData.append("title[ar]", values.title_ar);
    if (values.description_ar)
      formData.append("description[ar]", values.description_ar);
    if (values.image) formData.append("image", values.image);

    dispatch(createVenue(formData));
  };

  useEffect(() => {
    dispatch(getVenues({ activePage, term }));
  }, [dispatch, activePage, term]);

  const handleEditVenue = (values: z.infer<typeof NewItemFormValidation>) => {
    const formData = new FormData();
    formData.append("title[en]", values.title_en);
    if (values.description_en)
      formData.append("description[en]", values.description_en);
    if (values.title_ar) formData.append("title[ar]", values.title_ar);
    if (values.description_ar)
      formData.append("description[ar]", values.description_ar);
    if (values.image) formData.append("image", values.image);

    dispatch(updateVenue({ id: enumId, formData }));
  };

  return (
    <main className=" overflow-x-auto overflow-y-clip max-w-full">
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
            action={deleteVenues}
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
              className="my-[30px] w-max absolute left-[50%] -bottom-6 translate-x-[-50%] 
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
        messageOnSuccess={
          messageOperation === "deleting"
            ? "Selected venues have been deleted successfully"
            : `Venue has been deleted ${messageOperation} successfully`
        }
        completedAction={completedVenueOperation}
        closeAdd={setOpenAdd}
        closeEdit={setOpenEdit}
        closeDelete={setOpenDelete}
      />

      <AddNewItem
        open={openAdd}
        setOpen={setOpenAdd}
        requestType="Add New Venue"
        onSubmit={handleSubmit}
        isLoading={operationLoading}
        loadingContent="Creating venue..."
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
      <EditItem
        id={enumId}
        open={openEdit}
        setOpen={setOpenEdit}
        requestType="Edit Venue"
        onSubmit={handleEditVenue}
        isLoading={operationLoading}
        loadingContent="Updating venue..."
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
