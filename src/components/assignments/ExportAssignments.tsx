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
import { AssignmentSession } from "@/app/admin/dashboard/assignments/assignment-session/page";
import { Loader2 } from "lucide-react";

export const ExportExamStatsValidation = z.object({
  reportType: z.enum(["word", "excel"]),
  title: z.string(),
  from: z.number().optional(),
  to: z.number().optional(),
});

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedAssignments: string[];
  assignments: AssignmentSession[];
};

const ExportAssignments = ({
  isModalOpen,
  setIsModalOpen,
  selectedAssignments,
  assignments,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exportMode, setExportMode] = useState<"range" | "selection">("range");

  type FormValues = z.infer<typeof ExportExamStatsValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(ExportExamStatsValidation),
    defaultValues: {
      reportType: "word",
      title: "",
    },
  });

  const handleCancel = () => {
    form.reset();
    setIsModalOpen(false);
    setExportMode("range");
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const exportData = {
        ...values,
        mode: exportMode,
        ...(exportMode === "selection" ? { selectedAssignments } : {}),
      };

      console.log("Exporting assignments:", exportData);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      handleCancel();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
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
                Selected Assignments:
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
                "Export Assignments"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ExportAssignments;
