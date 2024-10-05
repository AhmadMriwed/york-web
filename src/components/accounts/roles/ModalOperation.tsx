"use client";

import { Modal, Button, Checkbox } from "rsuite";
import { ThemeContext } from "../../pars/ThemeContext";
import { useContext, useState } from "react";
import { getPermissions } from "@/store/adminstore/slices/accounts/permissionsSlice";
import { FaCheck } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import { Form, Formik } from "formik";
import * as yup from "yup";
import {
  completedRoleOperation,
  createRole,
  updateRole,
} from "@/store/adminstore/slices/accounts/rolesSlice";
import {
  PermissionsState,
  PermissionsType,
  SingleRoleState,
} from "@/types/adminTypes/accounts/accountsTypes";
import Loading from "@/components/pars/Loading";
import { getSingleRole } from "@/store/adminstore/slices/accounts/singleRoleSlice";

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: "create" | "read" | "edit";
  operation: string;
  label: string;
  roleId?: number;
  operationStatus?: boolean;
}

const roleSchema = yup.object().shape({
  name: yup.string().required("Please add the Role Name"),
  permissions: yup.array(),
});

const OperationContent = ({
  isLoading,
  permissions,
  requestType,
  handleChecked,
}: {
  isLoading: boolean;
  permissions: PermissionsType[];

  requestType: "create" | "read" | "edit";
  handleChecked?: any;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const { singleRoleIds }: SingleRoleState = useSelector(
    (state: GlobalState) => state.singleRole
  );

  return (
    <div className="flex mt-5 gap-[20px] flex-wrap ">
      {isLoading && <Loading />}
      {!isLoading &&
        permissions &&
        permissions.map((permission: PermissionsType) => {
          return (
            <div
              key={permission.name}
              className={`border border-[#3c417c] min-w-[280px] rounded-[6px] min-h-[255px] pe-2 ${
                mode === "dark" ? "bg-inherit" : "bg-white"
              }`}
            >
              <h3 className="ms-[10px] text-[18px]">{permission.name}</h3>
              <div className="">
                {permission.permissions.map(
                  (permission: {
                    id: number;
                    name: string;
                    enabled?: boolean;
                  }) => {
                    if (requestType === "create" || requestType === "edit") {
                      return (
                        <Checkbox
                          key={permission.id}
                          className="block [&>.rs-checkbox-checker]:!py-0 [&>.rs-checkbox-checker]:!min-h-[26px] [&>.rs-checkbox-checker_label_.rs-checkbox-wrapper]:!top-0"
                          onChange={(value, checked: boolean) => {
                            handleChecked(value, checked, permission.id);
                          }}
                          defaultChecked={singleRoleIds.includes(permission.id)}
                        >
                          {" "}
                          {permission.name}
                        </Checkbox>
                      );
                    } else if (requestType === "read") {
                      return (
                        <div
                          key={permission.id}
                          className="flex items-center gap-3 px-3 mb-1"
                        >
                          {" "}
                          <FaCheck
                            style={{
                              color: "var(--primary-color2)",
                              fontSize: "14px",
                              marginInlineEnd: "3px",
                            }}
                          />{" "}
                          <p>{permission.name}</p>
                        </div>
                      );
                    }
                  }
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default function ModalOperation({
  open,
  setOpen,
  requestType,
  operation,
  label,
  roleId,
  operationStatus,
}: ModalType) {
  const [permissionsIds, setPermissionsIds] = useState<any[]>([]);
  const [deletedRolesIds, setDeletedRolesIds] = useState<any[]>([]);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();

  const { isLoading, error, permissions }: PermissionsState = useSelector(
    (state: GlobalState) => state.permissions
  );

  const {
    isLoading: roleLoading,
    error: roleError,
    singleRole,
    singleRoleIds,
  }: SingleRoleState = useSelector((state: GlobalState) => state.singleRole);

  const { operationLoading, status } = useSelector(
    (state: GlobalState) => state.roles
  );

  const submithandler = async (values: any, actions: any) => {
    const data = { name: values.name, permissions_ids: permissionsIds };
    dispatch(createRole(data));
  };

  const editRoleHandler = () => {
    let deleted_permissions_ids = deletedRolesIds;

    const combinedArray = singleRoleIds.concat(permissionsIds);

    const newPermissionsIds = combinedArray.filter(
      (id) => !deletedRolesIds.includes(id)
    );

    console.log(newPermissionsIds, "newPermissionsIds");

    let new_permissions_ids = newPermissionsIds;

    const data = {
      name: singleRole.name,
      deleted_permissions_ids,
      new_permissions_ids,
    };
    dispatch(updateRole({ id: roleId, data: data }));
  };

  const handleChecked = (value: any, checked: boolean, id: number) => {
    if (checked) {
      setPermissionsIds((prev: number[]) => {
        return [...prev, id];
      });
    } else {
      if (singleRoleIds.includes(id)) {
        setDeletedRolesIds((prev: number[]) => {
          return [...prev, id];
        });
      } else {
        const newPermissions = permissionsIds.filter(
          (permId) => permId !== id && permId
        );
        setPermissionsIds(newPermissions);
      }
    }
  };

  console.log("new permissions Ids", permissionsIds);
  console.log("single role Ids", singleRoleIds);
  console.log("deleted Role Ids", deletedRolesIds);

  useEffect(() => {
    if (open) {
      if (requestType === "create") {
        setPermissionsIds([]);

        dispatch(getPermissions());
      } else if (requestType === "read") {
        dispatch(getSingleRole(roleId));
      } else if (requestType === "edit") {
        setPermissionsIds([]);
        setDeletedRolesIds([]);
        dispatch(getPermissions());
        dispatch(getSingleRole(roleId));
      }
    }
  }, [dispatch, open, requestType, roleId]);

  useEffect(() => {
    if (operationStatus && open) {
      dispatch(completedRoleOperation());
      setOpen(false);
    }
  }, [operationStatus, dispatch, setOpen, open]);

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
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
          {label}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={`${mode === "dark" ? "text-light" : "text-dark"}`}>
        {requestType === "create" && (
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

                <OperationContent
                  isLoading={isLoading}
                  permissions={permissions}
                  handleChecked={handleChecked}
                  requestType={requestType}
                />

                {operation !== "visible" && (
                  <div className="element-center flex-col gap-3 mt-3">
                    <p className="capitalize text-red-500 p-2">
                      you have to check / un check fields exept the old checked
                      fields
                    </p>
                    {props.errors.name && props.touched.name && (
                      <div className="pl-[5px] ml-[10px] mt-2 mb-[10px] text-red-600">
                        {props.errors.name}
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-fit py-[6px] px-[25px] text-center rounded-[6px] text-white bg-btnColor hover:bg-btnColor"
                    >
                      {operation}
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )}

        {requestType === "read" && (
          <>
            {roleLoading && <Loading />}
            {!roleLoading && (
              <>
                <div className="flex items-center gap-2">
                  {" "}
                  <label>Role Name : </label>
                  <p className="text-[var(--primary-color2)] text-[18px]">
                    {singleRole.name}
                  </p>
                </div>

                <OperationContent
                  isLoading={roleLoading}
                  permissions={singleRole.role_permissions}
                  requestType={requestType}
                />
              </>
            )}
          </>
        )}

        {requestType === "edit" && (
          <>
            {roleLoading && <Loading />}
            {!roleLoading && (
              <>
                <div className="flex items-center gap-2">
                  {" "}
                  <label>Role Name : </label>
                  <p className="text-[var(--primary-color2)] text-[18px]">
                    {singleRole.name}
                  </p>
                </div>

                <OperationContent
                  isLoading={roleLoading}
                  permissions={permissions}
                  requestType={requestType}
                  handleChecked={handleChecked}
                />

                <div className="element-center flex-col gap-3 mt-3">
                  <p className="capitalize text-red-500 p-2">
                    you have to check the only fields you want (any field is not
                    checked will not be added)
                  </p>
                  <Button
                    className="w-fit py-[6px] px-[25px] text-center rounded-[6px] text-white bg-[#3c417c]"
                    onClick={editRoleHandler}
                  >
                    {operation}
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
