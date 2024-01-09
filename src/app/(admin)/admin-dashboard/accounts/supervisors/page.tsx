"use client";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import AddSupervisorModal from "@/components/accounts/supervisors/AddSupervisorModal";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import { useState } from "react";
export default function Supervisors() {
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const data = [
      {
         id: "1",
         name: "super 1",
         email: "role1@gmail.com",
         photo: "----",
         role: "Role 1",
         status: "active",
      },
      {
         id: "2",
         name: "super 2",
         email: "role2@gmail.com",
         photo: "----",
         role: "Role 2",
         status: "active",
      },
      {
         id: "3",
         name: "super 3",
         email: "role3@gmail.com",
         photo: "----",
         role: "Role 3",
         status: "active",
      },
   ];

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
         name: "Role",
         selector: (row: any) => row.role,
         sortable: true,
      },
      {
         name: "Status",
         selector: (row: any) => row.status,
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

   return (
      <main className="pt-0 overflow-x-auto max-w-full">
         <CrudLayout
            columns={columns}
            dataTabel={data}
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            interfaceName="Supervisors"
            isThereAdd={true}
         />
         <AddSupervisorModal
            open={openAdd}
            setOpen={setOpenAdd}
            requestType="Add Supervisor"
            operation="Save"
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
