"use client";
import AlertModal from "@/components/Pars/AlertModal";
import Loading from "@/components/Pars/Loading";
import ModalOperation from "@/components/accounts/roles/ModalOperation";
import AddTrainerModal from "@/components/accounts/trainers/AddTrainerModal";
import ShowUserProfileModal from "@/components/accounts/users/ShowUserProfileModal";
import Action from "@/components/crud/Action";
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
import { Dropdown } from "rsuite";

export default function Trainers() {
   // pagination config
   const count = 10;
   const perPage = 3;
   const [activePage, setActivePage] = useState(1);
   const [openAdd, setOpenAdd] = useState(false);
   const [openEdit, setOpenEdit] = useState(false);
   const [openVisible, setOpenvisible] = useState(false);
   const [openDelete, setOpenDelete] = useState(false);
   const [filteredUserType, setFilteredUserType] = useState("all");
   const [filteredUserStatus, setFilteredUserStatus] = useState("all");
   const [userId, setUserId] = useState<number>(0);

   const { isLoading, error, trainers, status } = useSelector(
      (state: GlobalState) => state.trainers
   );

   const dispatch: any = useDispatch();

   useEffect(() => {
      dispatch(getTrainers(activePage));
   }, [dispatch, activePage]);

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
         selector: (row: any) => row.status,
         sortable: true,
      },
      {
         name: "Trainer Type",
         selector: (row: any) => row.account_type,
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

   const filterUserTypeBy = [
      {
         id: 1,
         title: "Certificate",
         type: 1,
      },
      {
         id: 2,
         title: "Uncertificate",
         type: 2,
      },
   ];
   const filterUserStatusBy = [
      {
         id: 1,
         title: "Accepted",
         status: "Accepted",
      },
      {
         id: 2,
         title: "Rejected",
         status: "Rejected",
      },
   ];

   return (
      <main className="pt-0 overflow-x-auto overflow-y-clip max-w-full">
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
               factor="id"
               action={changeTrainerStatus}
            >
               {" "}
               <Dropdown
                  className="w-[127px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
                  title={
                     filteredUserType === "all"
                        ? "Trainer Type"
                        : filteredUserType
                  }
               >
                  {filterUserTypeBy.map((filter) => {
                     return (
                        <Dropdown.Item
                           key={filter.id}
                           className="text-white capitalize"
                           onClick={() =>
                              dispatch(getTrainersByType(filter.type))
                           }
                        >
                           {filter.title}
                        </Dropdown.Item>
                     );
                  })}
                  <Dropdown.Item
                     className="text-white capitalize"
                     onClick={() => dispatch(getTrainers(activePage))}
                  >
                     All
                  </Dropdown.Item>
               </Dropdown>
               <Dropdown
                  className="w-[127px] !bg-btnColor [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-btnColor [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-btnColor [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
                  title={
                     filteredUserStatus === "all"
                        ? "Trainer Status"
                        : filteredUserStatus
                  }
               >
                  {filterUserStatusBy.map((filter) => {
                     return (
                        <Dropdown.Item
                           key={filter.id}
                           className="text-white capitalize"
                           onClick={() =>
                              dispatch(getTrainersByStatus(filter.status))
                           }
                        >
                           {filter.title}
                        </Dropdown.Item>
                     );
                  })}
                  <Dropdown.Item
                     className="text-white capitalize"
                     onClick={() => dispatch(getTrainers(activePage))}
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

         <ShowUserProfileModal
            open={openVisible}
            setOpen={setOpenvisible}
            id={userId}
            userType="trainer"
         />
      </main>
   );
}
