import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAttendant } from "@/store/adminstore/slices/sessions/attendanceRequestsSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import { unattendUserType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "../pars/ThemeContext";
import { Formik, Form, FormikProps } from "formik";
import * as yup from "yup";
import { Avatar, Loader, Modal } from "rsuite";
import CustomInput from "../inputs/custom-field/CustomInput";

const validationSchema = yup.object().shape({
  attend_time: yup
    .date()
    .required("Attend time is Required")
    .min(new Date(), "Please enter a valid Date"),
  status: yup.string(),
  cuase: yup.string(),
  user_id: yup.number().required("User is Required"),
});

const AddAttendantModal = ({ modalOpen, setModalOpen, sessionID }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const { attendUsers, operationLoading } = useSelector(
    (state: GlobalState) => state.attendanceRequests
  );
  const dispatch: any = useDispatch();

  const attendantStatus = ["Pending", "Accept", "Rejected"].map(
    (status: string) => ({
      label: status,
      value: status,
    })
  );

  const usersData = attendUsers.map((user: unattendUserType) => ({
    label: (
      <div className="flex items-center gap-2">
        <Avatar src={user.image} size="xs" alt="user image" />
        <div className="flex gap-2 items-end">
          <p className="m-0">{`${user.first_name} ${user.last_name}`}</p>
          <p className="m-0 text-[10px] text-[#888]">Id:{user.user_id}</p>
        </div>
      </div>
    ),
    value: user.user_id,
  }));

  const initialValues = {
    session_id: sessionID,
    attend_time: new Date(),
    status: "Accept",
    cuase: "",
    user_id: null,
  };

  const submitHandler = (values: any) => {
    const data: any = {
      ...values,
      attend_time: getUTCDate(values.attend_time),
    };

    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    dispatch(addAttendant(formData));
  };

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="sm"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-[var(--dark-bg-color)] [&>div>*]:text-[var(--dark-text-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--light-text-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--dark-text-color)]"
              : "text-[var(--light-text-color)]"
          }`}
        >
          Add Attendant
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {(props: FormikProps<any>) => (
            <Form>
              {operationLoading ? (
                <div className="element-center">
                  <Loader size="lg" />
                </div>
              ) : (
                <div className="w-[100%] p-6 rounded-sm bg-light">
                  <CustomInput
                    type="date"
                    name="attend_time"
                    label="Attend Time"
                    required
                    placeholder="Attend Time"
                  />
                  <CustomInput
                    type="select"
                    selectData={usersData}
                    name="user_id"
                    label="User"
                    required
                    placeholder="Select User"
                  />
                  <CustomInput
                    type="select"
                    selectData={attendantStatus}
                    name="status"
                    label="Status"
                    optional
                    placeholder="Status"
                  />
                  <CustomInput
                    type="text"
                    name="cause"
                    label="Cause"
                    optional
                    placeholder="Enter Cause"
                  />
                  <button type="submit" className="colored-btn !w-full mt-4">
                    Add Attendant
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddAttendantModal;
