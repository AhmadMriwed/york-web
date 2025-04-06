"use client";
import AlertModal from "@/components/Pars/AlertModal";
import HandlingEmptyData from "@/components/Pars/HandlingEmptyData";
import Loading from "@/components/Pars/Loading";
import OperationAlert from "@/components/Pars/OperationAlert";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import AddEnums from "@/components/enums/AddEnums";
import EditEnums from "@/components/enums/EditEnums";
import ShowEnumDetailes from "@/components/enums/ShowEnumDetailes";
import {
  completedExamTypeOperation,
  createExamType,
  deleteExamType,
  deleteExamTypes,
  getExamTypes,
  updateExamType,
} from "@/store/adminstore/slices/enums/examTypesSlice";
import { GlobalState } from "@/types/storeTypes";
import mergeDifferentProperties from "@/utils/mergeDifferentProperties";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "rsuite";
import * as yup from "yup";

export default function ExamTypes() {
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
    "deleting";

  const dispatch: any = useDispatch();

  const {
    error,
    operationLoading,
    status,
    isLoading,
    examTypes,
    perPage,
    total,
  } = useSelector((state: GlobalState) => state.examTypes);

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
      grow: 0,
    },
    {
      name: "Type",
      selector: (row: any) => row.type,
      sortable: true,
      grow: 0,
      style: {
        minWidth: "100px",
      },
      wrap: true,
    },
    {
      name: "Hint",
      selector: (row: any) => row.hint,
      sortable: true,
      wrap: true,
      style: {
        minWidth: "200px",
        marginInline: "10px",
      },
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
      wrap: true,
      grow: 2,
      style: {
        minWidth: "300px",
        marginInline: "10px",
        padding: "10px",
      },
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
      name: "type",
      label: "Type",
      type: "text",
      placeholder: "Enter an exam type",

      validation: yup.string().required("Exam Type is Required"),
    },
    {
      name: "hint",
      label: "Hint",
      type: "text",
      placeholder: "Enter an exam hint",
      validation: yup.string().required("Exam hint is Required"),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter an exam description",
      validation: yup.string().required("Exam description is Required"),
    },
  ];

  const initialValues = {
    type: "",
    hint: "",
    description: "",
  };

  const handleSubmit = (values: any) => {
    console.log("submit", values);
    dispatch(createExamType(values));
    dispatch(getExamTypes({ activePage, term }));
  };

  const handleEdit = (values: any, singleEnum: any) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }

    console.log("enum id ", enumId);

    dispatch(updateExamType({ formData: formData, enumId: enumId }));
    dispatch(getExamTypes({ activePage, term }));
  };

  const handleDelete = async () => {
    await dispatch(deleteExamType(enumId));
    dispatch(getExamTypes({ activePage, term }));
  };

  useEffect(() => {
    dispatch(getExamTypes({ activePage, term }));
  }, [dispatch, activePage, term]);

  return (
    <main
      className={`pt-0 overflow-x-auto overflow-y-clip max-w-full ${
        total > perPage && "pb-[70px]"
      }`}
    >
      {" "}
      {isLoading && <Loading />}
      {!isLoading && examTypes.length === 0 && (
        <HandlingEmptyData
          message="there is no exam type"
          onClick={() => setOpenAdd(true)}
        />
      )}
      {!isLoading && examTypes.length > 0 && (
        <CrudLayout
          columns={columns}
          dataTabel={examTypes}
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          interfaceName="Exam Types"
          isThereAdd={true}
          isLoading={isLoading}
          setTerm={setTerm}
          action={deleteExamTypes}
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
        messageOnSuccess={`Exam type has been ${messageOperation} successfully`}
        completedAction={completedExamTypeOperation}
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
        requestType="Add Exam Type"
        isLoading={operationLoading}
        loadingContent="Exam Type Creating ..."
      />
      <EditEnums
        id={enumId}
        open={openEdit}
        setOpen={setOpenEdit}
        isLoading={operationLoading}
        requestType="Edit Exam Type"
        loadingContent="Editing ..."
        formFields={formFields}
        onSubmit={handleEdit}
        initialValues={initialValues}
        url="admin/examtype/"
      />
      <AlertModal
        open={openDelete}
        setOpen={setOpenDelete}
        requestType="delete"
        id={enumId}
        status={status}
        completed={completedExamTypeOperation}
        deleteAction={handleDelete}
        label="Are you sure you want to delete this exam type ?"
      />
      <ShowEnumDetailes
        id={enumId}
        open={openVisible}
        setOpen={setOpenvisible}
        title="Exam Type Details"
        url="admin/examtype/"
      />
    </main>
  );
}
