"use client";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import AddTraineeModal from "@/components/accounts/trainees/AddTraineeModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import { useEffect, useState } from "react";
import { Dropdown } from "rsuite";

export default function Users() {
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
         id: "3",
         name: "super 3",
         email: "role3@gmail.com",
         photo: "----",
         status: "active",
         userType: "Trainer",
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
      {
         id: "6",
         name: "super 3",
         email: "role3@gmail.com",
         photo: "----",
         status: "inactive",
         userType: "Trainer",
      },
   ];

   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [filteredUserType, setFilteredUserType] = useState("all");
   const [filteredUserStatus, setFilteredUserStatus] = useState("all");
   const [data, setData] = useState(basicData);

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
         name: "Email",
         selector: (row: any) => row.email,
         sortable: true,
      },
      {
         name: "Photo",
         selector: (row: any) => row.photo,
         sortable: true,
      },

      {
         name: "Status",
         selector: (row: any) => row.status,
         sortable: true,
      },
      {
         name: "User Type",
         selector: (row: any) => row.userType,
         sortable: true,
      },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               id={row.id}
               handleEdit={() => setOpenEdit(true)}
               handleVisible={() => setOpenvisible(true)}
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
         id: 3,
         title: "trainer",
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

   return (
      <main className="pt-0 overflow-x-auto max-w-full">
         <CrudLayout
            columns={columns}
            dataTabel={data}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Users"
            isThereAdd={false}
         >
            <Dropdown
               className="w-[115px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
               title={
                  filteredUserType === "all" ? "User Type" : filteredUserType
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
               className="w-[115px] bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
               title={
                  filteredUserStatus === "all"
                     ? "User Status"
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
            requestType="Edit Supervisor"
            operation="Update"
         />
         <ModalOperation
            open={openVisible}
            setOpen={setOpenvisible}
            requestType="Role"
            operation="visible"
         />
      </main>
   );
}
