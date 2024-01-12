"use client";

import { Modal, Button, Checkbox } from "rsuite";
import { ThemeContext } from "../../Pars/ThemeContext";
import { useContext, useRef, useState } from "react";
import { getPermissions } from "@/store/adminstore/slices/permissionsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import {
   PermissionsState,
   PermissionsType,
} from "@/types/adminTypes/accounts/roles/rolesTypes";
import { Form, Formik } from "formik";
import * as yup from "yup";

interface ModalType {
   open: boolean;
   setOpen: any;
   requestType: string;
   operation: string;
   serviceId?: any;
}

const roleSchema = yup.object().shape({
   name: yup.string().required("Please add the Your Role Name"),
   permissions: yup.array(),
});

export default function ModalOperation({
   open,
   setOpen,
   requestType,
   operation,
}: ModalType) {
   const [permissionsIds, setPermissionsIds] = useState<any[]>([]);
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const dispatch: any = useDispatch();

   const { isLoading, error, permissions }: PermissionsState = useSelector(
      (state: GlobalState) => state.permissions
   );

   const submithandler = async (values: any, actions: any) => {
      const data = { ...values, permissions: permissionsIds };
      console.log(data);
   };

   const handleChecked = (value: any, checked: boolean, id: number) => {
      console.log(value, checked, id);
      if (checked) {
         setPermissionsIds((prev: number[]) => {
            return [...prev, id];
         });
      } else {
         const newPermissions = permissionsIds.filter(
            (permId) => permId !== id && permId
         );
         setPermissionsIds(newPermissions);
      }
   };

   useEffect(() => {
      if (open) {
         dispatch(getPermissions());
      }
   }, [dispatch, open]);

   console.log("all", permissionsIds);

   return (
      <Modal
         backdrop={true}
         open={open}
         onClose={() => setOpen(false)}
         className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] w-[calc(1000px)] h-auto ${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }`}
      >
         <Modal.Header closeButton={true}>
            <Modal.Title
               className={`${
                  mode === "dark" ? "text-light" : "text-dark"
               } font-bold`}
            >
               {requestType}
            </Modal.Title>
         </Modal.Header>

         <Modal.Body
            className={`${mode === "dark" ? "text-light" : "text-dark"}`}
         >
            <Formik
               initialValues={{
                  name: "",
                  permissions: [],
               }}
               validationSchema={roleSchema}
               onSubmit={submithandler}
            >
               {(props) => (
                  <Form className="">
                     <label className="block">Role Name</label>
                     <input
                        type="text"
                        className="w-[calc(100%_-_12px)] max-w-[880px] border-none outline-none px-2 py-1 my-1 mr-3 rounded-[4px] text-black"
                        placeholder="role name"
                        name="name"
                        onChange={(e) => (props.values.name = e.target.value)}
                     />
                     {props.errors.name && props.touched.name && (
                        <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                           {props.errors.name}
                        </div>
                     )}
                     <div className="flex mt-5 gap-[20px] flex-wrap ">
                        {isLoading && "loading"}
                        {!isLoading &&
                           permissions.map((permission: PermissionsType) => {
                              return (
                                 <div
                                    key={permission.name}
                                    className="border border-[#3c417c] min-w-[280px] rounded-[6px] min-h-[255px] pe-2"
                                 >
                                    <h3 className="ms-[10px]">
                                       {permission.name}
                                    </h3>
                                    <div className="">
                                       {permission.permissions.map(
                                          (permission: {
                                             id: number;
                                             name: string;
                                          }) => {
                                             return (
                                                <Checkbox
                                                   key={permission.id}
                                                   className="block [&>.rs-checkbox-checker]:!py-0 [&>.rs-checkbox-checker]:!min-h-[26px] [&>.rs-checkbox-checker_label_.rs-checkbox-wrapper]:!top-0"
                                                   onChange={(
                                                      value,
                                                      checked: boolean
                                                   ) => {
                                                      handleChecked(
                                                         value,
                                                         checked,
                                                         permission.id
                                                      );
                                                   }}
                                                >
                                                   {" "}
                                                   {permission.name}
                                                </Checkbox>
                                             );
                                          }
                                       )}
                                    </div>
                                 </div>
                              );
                           })}
                     </div>

                     {operation !== "visible" && (
                        <div className="element-center flex-col gap-3 mt-3">
                           <p className="capitalize text-red-500 p-2">
                              you have to check / un check fields exept the old
                              checked fields
                           </p>
                           <Button
                              type="submit"
                              className="w-fit py-[6px] px-[25px] text-center rounded-[6px] text-white bg-[#3c417c]"
                           >
                              {operation}
                           </Button>
                        </div>
                     )}
                  </Form>
               )}
            </Formik>
         </Modal.Body>
      </Modal>
   );
}
