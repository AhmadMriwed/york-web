"use client";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import AddTraineeModal from "@/components/accounts/trainees/AddTraineeModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import { getTrainees } from "@/store/adminstore/slices/accounts/traineeSlice";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "rsuite";

export default function Trainees() {
   const basicData = [
      {
         id: "1",
         name: "super 1",
         email: "role1@gmail.com",
         photo: "----",
         status: "active",
         userType: "client",
      },
      {
         id: "2",
         name: "super 2",
         email: "role2@gmail.com",
         photo: "----",
         status: "inactive",
         userType: "Trainee",
      },

      {
         id: "4",
         name: "super 1",
         email: "role1@gmail.com",
         photo: "----",
         status: "inactive",
         userType: "client",
      },
      {
         id: "5",
         name: "super 2",
         email: "role2@gmail.com",
         photo: "----",
         status: "active",
         userType: "Trainee",
      },
   ];

   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [data, setData] = useState(basicData);
   const [filteredUserType, setFilteredUserType] = useState("all");
   const [filteredUserStatus, setFilteredUserStatus] = useState("all");

   const { isLoading, error, trainees } = useSelector(
      (state: GlobalState) => state.trainees
   );

   console.log(trainees);

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
         selector: (row: any) => row.account_status,
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

   const filterUserTypeBy = [
      {
         id: 1,
         title: "client",
      },
      {
         id: 2,
         title: "trainee",
      },

      {
         id: 4,
         title: "all",
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

   const handleFilteration = (
      statusFilterFactor: string,
      typeFilterFactor: string
   ) => {
      const filterdData = basicData.filter(
         (row) =>
            (statusFilterFactor === "all" ||
               row.status.toLowerCase() === statusFilterFactor.toLowerCase()) &&
            (typeFilterFactor === "all" ||
               row.userType.toLowerCase() === typeFilterFactor.toLowerCase())
      );
      setData(filterdData);
   };

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
         >
            {" "}
            <Dropdown
               className="w-[125px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               title={
                  filteredUserType === "all" ? "Trainee Type" : filteredUserType
               }
            >
               {filterUserTypeBy.map((filter) => {
                  return (
                     <Dropdown.Item
                        key={filter.id}
                        onClick={() => {
                           setFilteredUserType(filter.title);
                           handleFilteration(filteredUserStatus, filter.title);
                        }}
                        className="text-white capitalize"
                     >
                        {filter.title}
                     </Dropdown.Item>
                  );
               })}
            </Dropdown>
            <Dropdown
               className="w-[125px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left"
               title={
                  filteredUserStatus === "all"
                     ? "Trainee Status"
                     : filteredUserStatus
               }
            >
               {filterUserStatusBy.map((filter) => {
                  return (
                     <Dropdown.Item
                        key={filter.id}
                        onClick={() => {
                           setFilteredUserStatus(filter.title);
                           handleFilteration(filter.title, filteredUserType);
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
