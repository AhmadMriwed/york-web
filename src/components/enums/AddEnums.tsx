import { useContext } from "react";
import { Button, Input, Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { Form, Formik } from "formik";
import * as yup from "yup";
import CustomInput from "../Pars/CustomInput";
import Loading from "../Pars/Loading";

interface ModalType {
  open: boolean;
  setOpen: any;
  requestType: string;
  formFields: {
    name: string;
    label: string;
    type: string;
    validation: any;
    placeholder?: string;
    image?: string;
    accept?: string;
  }[];
  initialValues: any;
  onSubmit: any;
  isLoading: boolean;
  loadingContent?: string;
}

export default function AddEnums({
  open,
  setOpen,
  requestType,
  formFields,
  initialValues,
  onSubmit,
  isLoading,
  loadingContent,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  // Define validation schema
  const validationSchema = yup.object().shape(
    formFields.reduce((accumulator: any, field) => {
      accumulator[field.name] = field.validation;
      return accumulator;
    }, {})
  );

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      size="md"
      className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header closeButton={true}>
        <Modal.Title
          className={`text-center ${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          {requestType}
        </Modal.Title>
      </Modal.Header>

      {isLoading ? (
        <Loading content={loadingContent && loadingContent} />
      ) : (
        <Modal.Body
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } px-3 mb-3`}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form className="">
                {formFields.map((field) => {
                  return field.type === "textarea" ? (
                    <div key={field.name}>
                      <label className="block pl-[5px] text-[#888] mb-1">
                        {field.label}
                      </label>
                      <Input
                        key={field.name}
                        as="textarea"
                        rows={3}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        onChange={(value) => {
                          props.values[field.name] = value;
                        }}
                        className="mb-[10px]"
                      />
                      {props.errors[field.name] &&
                        props.touched[field.name] && (
                          <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
                            {`${props.errors[field.name]}`}
                          </div>
                        )}
                    </div>
                  ) : field.type === "file" ? (
                    <div key={field.name}>
                      <label className="block pl-[5px] text-[#888] mb-1">
                        {field.label}
                      </label>
                      <Input
                        placeholder="Enter an image"
                        name="image"
                        type="file"
                        onChange={(value, e: any) => {
                          console.log(e);
                          props.values.image = e.target.files[0];
                        }}
                        accept="image/*"
                      />
                    </div>
                  ) : (
                    <CustomInput
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                    />
                  );
                })}

                <Modal.Footer className="mt-4 pr-1 element-center">
                  <Button
                    type="submit"
                    appearance="primary"
                    className="bg-btnColor hover:bg-btnColorHover w-[65px]"
                  >
                    Add
                  </Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      )}
    </Modal>
  );
}
