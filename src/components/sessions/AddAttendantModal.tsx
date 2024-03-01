import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAttendant } from "@/store/adminstore/slices/sessions/attendanceRequestsSlice";
import { getUTCDate } from "@/utils/dateFuncs";
import { unattendUserType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "../Pars/ThemeContext";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Avatar, Modal } from "rsuite";
import CustomInput from "./CustomInput";
import Loading from "../Pars/Loading";

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
        <Avatar src={user.image} size="xs" alt="User Image" />
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
          ? "[&>div>*]:!bg-dark [&>div>*]:text-[var(--light-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--dark-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--light-color)]"
              : "text-[var(--dark-color)]"
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
          {(props) => (
            <Form>
              {operationLoading ? (
                <Loading />
              ) : (
                <div
                  className={`w-[100%] p-6
              rounded-[10px] ${mode === "dark" ? "bg-light" : "bg-white"}`}
                >
                  <CustomInput
                    type="date"
                    name="attend_time"
                    label="Attend Time"
                    required
                    placeholder="Attend Time"
                    value={props.values.attend_time}
                    onChange={(value: any) => {
                      props.values.attend_time = value;
                    }}
                    formikErrors={props.errors.attend_time}
                    formikTouched={props.touched.attend_time}
                  />
                  <CustomInput
                    type="select"
                    selectData={usersData}
                    name="user_id"
                    label="User"
                    required
                    placeholder="Select User"
                    value={props.values.user_id}
                    onChange={(value: any) => (props.values.user_id = value)}
                    formikErrors={props.errors.user_id}
                    formikTouched={props.touched.user_id}
                  />
                  <CustomInput
                    type="select"
                    selectData={attendantStatus}
                    name="status"
                    label="Status"
                    optional
                    placeholder="Status"
                    value={props.values.status}
                    onChange={(value: any) => (props.values.status = value)}
                    formikErrors={props.errors.status}
                    formikTouched={props.touched.status}
                  />
                  <CustomInput
                    type="text"
                    name="cause"
                    label="Cause"
                    optional
                    placeholder="Enter Cause"
                    value={props.values.cuase}
                    onChange={(value: any) => (props.values.cuase = value)}
                    formikErrors={props.errors.cuase}
                    formikTouched={props.touched.cuase}
                  />
                  <button type="submit" className="colored-btn !w-full">
                    Add
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
