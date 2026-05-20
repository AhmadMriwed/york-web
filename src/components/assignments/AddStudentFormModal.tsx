// components/AddStudentModal.tsx
"use client";
import { Modal, Radio, Form, Input, Button, message } from "antd";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import {
  addMultipleStudents,
  addStudent,
} from "@/lib/action/assignment_action";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type AddStudentFormProps = {
  formId: number;
  visible: boolean;
  onCancel: () => void;
  refetch: () => void;
};

const AddStudentForm = ({
  formId,
  visible,
  onCancel,
  refetch,
}: AddStudentFormProps) => {
  const [formType, setFormType] = useState<"single" | "multiple">("single");
  const [loading, setLoading] = useState(false);

  const [singleForm] = Form.useForm();
  const [multipleForm] = Form.useForm();

  const extractLetters = (str: string): string => {
    return str.replace(/[^a-zA-Z]/g, "");
  };

  const extractNumbers = (str: string): string => {
    return str.replace(/\D/g, "");
  };

  const processMultipleIds = (input: string[]): string[] => {
    const result: string[] = [];

    for (const item of input) {
      if (item.includes("-")) {
        const [startStr, endStr] = item.split("-").map((s) => s.trim());

        const startNum = extractNumbers(startStr);
        const endNum = extractNumbers(endStr);

        const prefix = extractLetters(startStr);

        if (prefix === extractLetters(endStr) && startNum && endNum) {
          const start = parseInt(startNum);
          const end = parseInt(endNum);

          if (!isNaN(start) && !isNaN(end) && start <= end) {
            for (let i = start; i <= end; i++) {
              result.push(
                `${prefix}${i.toString().padStart(startNum.length, "0")}`
              );
            }
            continue;
          }
        }
      }

      result.push(item);
    }

    return result;
  };

  const addSingleStudent = async (data: {
    id_number: string;
    email: string;
  }) => {
    try {
      const response = await addStudent(data.id_number, data.email, formId);

      if (response.data) {
        toast.success("Student added successfully", {});
        refetch();
      }
    } catch (error: any) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student", {
        description: error.message,
      });
    }
  };

  const addMultipleStudent = async (id_numbers: string[]) => {
    try {
      const processedIds = processMultipleIds(id_numbers);

      if (processedIds.length === 0) {
        throw new Error("No valid ID numbers found");
      }

      // Call the API with the processed IDs
      const response = await addMultipleStudents(formId, processedIds);

      toast.success(`Added ${processedIds.length} students successfully`, {});
      refetch();
    } catch (error: any) {
      toast.error(`Failed to add students: ${error.message}`);
    }
  };

  const handleSingleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await addSingleStudent({
        id_number: values.id_number,
        email: values.email || "",
      });
      singleForm.resetFields();
      onCancel();
    } catch (error) {
      message.error("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const rawIds = values.id_numbers
        .split(/[\n,]+/)
        .map((id: string) => id.trim())
        .filter((id: string) => id.length > 0);

      if (rawIds.length === 0) {
        throw new Error("Please enter at least one valid ID or range");
      }

      await addMultipleStudent(rawIds);

      multipleForm.resetFields();
      onCancel();
    } catch (error: any) {
      message.error(error.message || "Failed to process student IDs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Student(s)"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
      className="add-student-modal"
      closeIcon={<FaTimes className="text-gray-500 hover:text-gray-700" />}
    >
      <div className="p-4">
        <Radio.Group
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
          className="mb-6 w-full"
          buttonStyle="solid"
        >
          <Radio.Button value="single" className="w-1/2 text-center">
            Single Student
          </Radio.Button>
          <Radio.Button value="multiple" className="w-1/2 text-center">
            Multiple Students
          </Radio.Button>
        </Radio.Group>

        {formType === "single" ? (
          <Form
            form={singleForm}
            layout="vertical"
            onFinish={handleSingleSubmit}
          >
            <Form.Item
              name="id_number"
              label="ID Number"
              rules={[{ required: true, message: "Please input ID number!" }]}
            >
              <Input size="large" placeholder="e.g. ABC123" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email (optional)"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
            >
              <Input size="large" placeholder="student@example.com" />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={onCancel} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Add Student
              </Button>
            </div>
          </Form>
        ) : (
          <Form
            form={multipleForm}
            layout="vertical"
            onFinish={handleMultipleSubmit}
          >
            <Form.Item
              name="id_numbers"
              label="Student IDs or Ranges"
              rules={[
                {
                  required: true,
                  message: "Please input at least one ID or range!",
                },
              ]}
              tooltip={
                <div>
                  <p>Accepted formats:</p>
                  <ul className="list-disc pl-4">
                    <li>Single ID: AF123</li>
                    <li>Number range: 1-10 (will create 10 students)</li>
                    <li>
                      Alphanumeric range: AF123-AF130 (will create 8 students)
                    </li>
                    <li>Multiple IDs separated by newlines or commas</li>
                  </ul>
                </div>
              }
            >
              <Textarea
                rows={6}
                placeholder={`Enter IDs or ranges:
AF123
1-10
AF100-AF105
STU001, STU002, STU003`}
                className="w-full font-mono placeholder:text-gray-400"
              />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={onCancel} size="large">
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
              >
                Process Students
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Modal>
  );
};

export default AddStudentForm;
