"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";


import dynamic from "next/dynamic";
// استيراد المكونات مع تعطيل SSR (التقديم المبدئي) لهذه المكونات
const AddTrainerModal = dynamic(() => import("@/components/accounts/trainers/AddTrainerModal"), { ssr: false });
const ModalOperation = dynamic(() => import("@/components/accounts/roles/ModalOperation"), { ssr: false });
const ShowUserProfileModal = dynamic(() => import("@/components/accounts/users/ShowUserProfileModal"), { ssr: false });

// import ModalOperation from "@/components/accounts/roles/ModalOperation";
// import AddTrainerModal from "@/components/accounts/trainers/AddTrainerModal";
// import ShowUserProfileModal from "@/components/accounts/users/ShowUserProfileModal";
import Action from "@/components/crud/Action";
import { useStaticEnums } from "@/utils/useStaticEnums";
import CrudLayout from "@/components/crud/CrudLayout";
import {
  changeTrainerStatus,
  completedTrainerOperation,
  deleteTrainer,
  getTrainers,
  getTrainersByStatus,
  getTrainersByType,
} from "@/store/adminstore/slices/accounts/trainersSlice";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Pagination } from "rsuite";

export default function Trainers() {
  const [activePage, setActivePage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openVisible, setOpenvisible] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [term, setTerm] = useState("");
  const [userId, setUserId] = useState<number>(0);
  const staticEnums = useStaticEnums();
  const { isLoading, error, trainers, status, total, perPage } = useSelector(
    (state: GlobalState) => state.trainers
  );

  const dispatch: any = useDispatch();

  // useEffect(() => {
  //   dispatch(getTrainers({ activePage, term }));
  // }, [dispatch, activePage, term]);
    // وضع شرط للتأكد من أن الكود يعمل فقط في بيئة المتصفح
  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getTrainers({ activePage, term }));
    }
  }, [dispatch, activePage, term]);

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
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
      grow: 2,
    },
    {
      name: "Photo",
      selector: (row: any) =>
        row.image ? (
          <Image src={row.image} alt="user photo" width={50} height={50} />
        ) : (
          " "
        ),
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: any) =>
        row.account_status?.status ? row.account_status?.status : "suspended",
      sortable: true,
    },
    {
      name: "Trainer Type",
      selector: (row: any) => row.trainer_type,
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

  return (
    <main
      className={`pt-0 overflow-x-auto overflow-y-clip max-w-full relative ${
        total > perPage && "pb-[70px]"
      }`}
    >
      {isLoading && <Loading />}
      {!isLoading && (
        <CrudLayout
          columns={columns}
          dataTabel={trainers}
          openAdd={openAdd}
          setOpenAdd={setOpenAdd}
          interfaceName="Trainers"
          isThereAdd={true}
          isLoading={isLoading}
          action={changeTrainerStatus}
          isThereChangeStatus={true}
          setTerm={setTerm}
        >
          <Dropdown
            className="w-[127px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
            title={"Trainer Type"}
          >
            {staticEnums.entityTypesEnum.map((filter) => {
              return (
                <Dropdown.Item
                  key={filter.value}
                  className="text-white capitalize"
                  onClick={() =>
                    dispatch(
                      getTrainersByType(filter.value === "certificated" ? 1 : 2)
                    )
                  }
                >
                  {filter.label}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Item
              className="text-white capitalize"
              onClick={() => dispatch(getTrainers({ activePage, term }))}
            >
              All
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            className="w-[127px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
            title={"Trainer Status"}
          >
            {staticEnums.statusEnum.map((filter) => {
              return (
                <Dropdown.Item
                  key={filter.value}
                  className="text-white capitalize"
                  onClick={() => dispatch(getTrainersByStatus(filter.value))}
                >
                  {filter.label}
                </Dropdown.Item>
              );
            })}
            <Dropdown.Item
              className="text-white capitalize"
              onClick={() => dispatch(getTrainers({ activePage, term }))}
            >
              All
            </Dropdown.Item>
          </Dropdown>
        </CrudLayout>
      )}

      <AddTrainerModal
        open={openAdd}
        setOpen={setOpenAdd}
        requestType="Add Trainer"
        operation="Save"
      />
      <ModalOperation
        open={openEdit}
        setOpen={setOpenEdit}
        requestType="edit"
        operation="Update"
        label="Trainer Role"
      />
      <AlertModal
        open={openDelete}
        setOpen={setOpenDelete}
        requestType="delete"
        id={userId}
        status={status}
        completed={completedTrainerOperation}
        deleteAction={deleteTrainer}
        label="Are you sure you want to delete the selected trainer ?"
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
      <ShowUserProfileModal
        open={openVisible}
        setOpen={setOpenvisible}
        id={userId}
        userType="trainer"
      />
    </main>
  );
}
