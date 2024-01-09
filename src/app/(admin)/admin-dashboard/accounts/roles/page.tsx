"use client";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import Action from "@/components/crud/Action";
import CrudLayout from "@/components/crud/CrudLayout";
import { useState } from "react";

const Roles = () => {
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);

   const data = [
      {
         ID: "1",
         Name: "Role 1",
      },
      {
         ID: "2",
         Name: "Role 2",
      },
      {
         ID: "3",
         Name: "Role 3",
      },
   ];

   const columns = [
      {
         name: "ID",
         selector: (row: any) => row.ID,
         sortable: true,
      },
      {
         name: "Name",
         selector: (row: any) => row.Name,
         sortable: true,
      },
      {
         name: "Action",
         selector: (row: any) => (
            <Action
               id={row.ID}
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
            interfaceName="Roles"
            openAdd={openAdd}
            setOpenAdd={setOpenAdd}
            isThereAdd={true}
         />
         <ModalOperation
            open={openAdd}
            setOpen={setOpenAdd}
            requestType="Add Roel"
            operation="Save"
         />
         <ModalOperation
            open={openEdit}
            setOpen={setOpenEdit}
            requestType="Edit Role"
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
};

export default Roles;
