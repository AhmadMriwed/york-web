"use client";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import AddTraineeModal from "@/components/accounts/trainees/AddTraineeModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import { getTrainees } from "@/store/adminstore/slices/accounts/traineeSlice";
import { GlobalState } from "@/types/storeTypes";
import { useStaticEnums } from "@/utils/useStaticEnums";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "rsuite";

export default function Trainees() {
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [filteredUserStatus, setFilteredUserStatus] = useState("all");
   const [term, setTerm] = useState("");
   const staticEnum = useStaticEnums();

   const { isLoading, error, trainees } = useSelector(
      (state: GlobalState) => state.trainees
   );

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
      },
      {
         name: "Photo",
         selector: (row: any) => (
            <Image src={row.image} width={50} height={50} alt="user photo" />
         ),
         sortable: true,
      },

      {
         name: "Status",
         selector: (row: any) =>
            row.account_status?.status
               ? row.account_status?.status
               : "suspended",
         sortable: true,
      },
      {
         name: "User Type",
         selector: (row: any) => row.account_type,
         sortable: true,
      },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               id={row.id}
               handleEdit={() => setOpenEdit(true)}
               handleVisible={() => setOpenvisible(true)}
               handleDelete={() => () => setOpenDelete(true)}
            />
         ),
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

   const dispatch: any = useDispatch();

   useEffect(() => {
      dispatch(getTrainees());
   }, [dispatch]);
   return (
      <main className="pt-0 overflow-x-auto overflow-y-clip max-w-full">
         <CrudLayout
            columns={columns}
            dataTabel={trainees}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Trainees"
            isThereAdd={true}
            isLoading={isLoading}
            isThereChangeStatus={true}
            setTerm={setTerm}
         >
            {" "}
            <Dropdown
               className="w-[125px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               title="Trainee Type"
            >
               {staticEnum.userTypesEnum.map((filter) => {
                  return (
                     <Dropdown.Item
                        key={filter.value}
                        onClick={() => {}}
                        className="text-white capitalize"
                     >
                        {filter.label}
                     </Dropdown.Item>
                  );
               })}
               <Dropdown.Item
                  className="text-white capitalize"
                  onClick={() => dispatch(getTrainees())}
               >
                  All
               </Dropdown.Item>
            </Dropdown>
            <Dropdown
               className="w-[125px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               title="Trainee Status"
            >
               {filterUserStatusBy.map((filter) => {
                  return (
                     <Dropdown.Item
                        key={filter.id}
                        onClick={() => {
                           setFilteredUserStatus(filter.title);
                        }}
                        className="text-white capitalize"
                     >
                        {filter.title}
                     </Dropdown.Item>
                  );
               })}
            </Dropdown>
         </CrudLayout>
         <AddTraineeModal
            open={openAdd}
            setOpen={setOpenAdd}
            requestType="Add Trainee"
         />
         <ModalOperation
            open={openEdit}
            setOpen={setOpenEdit}
            requestType="edit"
            operation="Update"
            label="Edit Trainee"
         />
         <ModalOperation
            open={openVisible}
            setOpen={setOpenvisible}
            requestType="read"
            operation="visible"
            label="Trainee Role "
         />
      </main>
   );
}
