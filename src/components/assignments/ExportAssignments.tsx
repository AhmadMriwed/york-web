"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { Loader2 } from "lucide-react";
import { AssignmentSession } from "@/types/adminTypes/assignments/assignmentsTypes";
import { exportFile } from "@/lib/action/assignment_action";

export const ExportExamStatsValidation = z.object({
  reportType: z.enum(["word", "excel"]),
  title: z.string().min(1, "Title is required").trim(),
  from: z.coerce.number().optional(),
  to: z.coerce.number().optional(),
  exportMode: z.enum(["single", "multiple"]).default("single"),
});

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedAssignments: number[];
  assignments: AssignmentSession[];
  setSelectedAssignments: React.Dispatch<React.SetStateAction<number[]>>;
  refetch: () => void;
};

const ExportAssignments = ({
  isModalOpen,
  setIsModalOpen,
  selectedAssignments,
  setSelectedAssignments,
  assignments,
  refetch,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof ExportExamStatsValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(ExportExamStatsValidation),
    defaultValues: {
      reportType: "word",
      title: "",
      from: undefined,
      to: undefined,
    },
  });

  const handleCancel = () => {
    form.reset();
    setSelectedAssignments([]);
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const exportData = {
        url: "/assignment/exam-sections/export-exam-sections",
        fileName: values.title,
        format: values.reportType === "word" ? "docx" : "xlsx",
        ...(selectedAssignments.length > 0
          ? { ids: selectedAssignments }
          : {
              from: values.from,
              to: values.to,
            }),
      };

      await exportFile(exportData);
      setSelectedAssignments([]);
      handleCancel();
      await refetch?.();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const selectedAssignmentDetails = assignments.filter((assignment) =>
    selectedAssignments.includes(assignment.id)
  );

  return (
    <Modal
      title={`Export Assignments`}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          {selectedAssignments.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">
                Selected Assignments ({selectedAssignments.length}):
              </h4>
              <div className="max-h-40 overflow-y-auto border rounded p-2">
                {selectedAssignmentDetails.map((assignment) => (
                  <div key={assignment.id} className="flex items-center py-1">
                    <span className="text-sm">
                      {assignment.title} ({assignment.code})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Title:"
              name="title"
              placeholder="Enter title"
              required
            />

            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem className="grid-cols-1" style={{ zIndex: 1000 }}>
                  <FormLabel>Report Type:</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger
                        style={{ zIndex: 1000 }}
                        className="bg-gray-50 dark:bg-gray-700"
                      >
                        <SelectValue placeholder="Select a Type " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent style={{ zIndex: 1000 }}>
                      <SelectItem value="word">Word</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {selectedAssignments.length === 0 && (
              <>
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  label="From:"
                  name="from"
                  required
                />
                <CustomFormField
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  label="To:"
                  name="to"
                  required
                />
              </>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary-color1 hover:bg-primary-color2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                "Export"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ExportAssignments;
