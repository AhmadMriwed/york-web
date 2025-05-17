"use client";
import React, { useState } from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Form, FormProvider, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { addNewStudent } from "@/lib/action/evaluation_action";

const studentSchema = z.object({
  id_number: z.string().min(1, "Student ID is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  exam_section_id: z.number(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface AddNewStudentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  refetch?: () => Promise<void>;
  setRefetchStudentsResult?: any;
}

const AddNewStudentModal = ({
  isModalOpen,
  setIsModalOpen,
  refetch,
  setRefetchStudentsResult,
}: AddNewStudentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      id_number: "",
      first_name: "",
      last_name: "",
      email: "",
      exam_section_id: Number(id),
    },
  });

  const onSubmit = async (values: StudentFormValues) => {
    setIsSubmitting(true);
    try {
      await addNewStudent(values);
      toast.success("Student added successfully");
      setIsModalOpen(false);
      form.reset();

      if (refetch) {
        await refetch();
      }
      setRefetchStudentsResult((prev: any) => !prev);
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add student"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCancel}>
      <DialogContent className="w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary-color1 dark:text-primary-color2">
            Add New Student
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="Student ID"
                  name="id_number"
                  placeholder="STU-001"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="First Name"
                  name="first_name"
                  placeholder="John"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="Last Name"
                  name="last_name"
                  placeholder="Doe"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="Email"
                  name="email"
                  placeholder="student@example.com"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <Button
                className="border-primary-color1 text-primary-color1 hover:bg-primary-color1 hover:text-white dark:text-gray-100 dark:hover:text-white"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="bg-primary-color1 hover:bg-primary-color2 transition-colors duration-200"
                htmlType="submit"
                loading={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Student"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewStudentModal;
