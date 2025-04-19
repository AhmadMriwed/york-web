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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";

// Validation schema
export const ExportExamStatsValidation = z.object({
  reportType: z.enum(["word", "excel"]),
  title: z.string(),
  from: z.number(),
  to: z.number(),
});

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  examSections?: Array<{
    id: string;
    name: string;
    code: string;
  }>;
  trainers?: Array<{
    id: string;
    name: string;
  }>;
};

const ExportAssignments = ({ isModalOpen, setIsModalOpen }: Props) => {
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
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // API call to generate the report
      console.log("Exporting exam statistics:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, you would likely:
      // 1. Call your API endpoint
      // 2. Get back the file (Word/Excel)
      // 3. Trigger download

      handleCancel();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Export Assignments : "
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title  */}

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Title :"
              name="title"
              placeholder="Enter title"
            />

            {/* Report Type */}
            <FormField
              control={form.control}
              name="reportType"
              render={({ field }) => (
                <FormItem className="grid-cols-1" style={{ zIndex: 1000 }}>
                  <FormLabel>Report Type :</FormLabel>
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
                      <SelectItem value="Word">Word</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* from  */}

            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="From :"
              name="from"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="To :"
              name="to"
            />
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
                "Export Assignments "
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ExportAssignments;
