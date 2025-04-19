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
  organizationName: z.string().min(1, "Required"),
  sectionTitle: z.string().min(1, "Required"),
  sectionCode: z.string().min(1, "Required"),
  startDate: z.date(),
  endDate: z.date(),
  preExamPercentage: z.number().min(0).max(100),
  postExamPercentage: z.number().min(0).max(100),
  trainerEvaluationPercentage: z.number().min(0).max(100),
  trainersEvaluationPercentage: z.number().min(0).max(100),
  trainerName: z.string().min(1, "Required"),
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

const ExportAssignment = ({ isModalOpen, setIsModalOpen }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof ExportExamStatsValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(ExportExamStatsValidation),
    defaultValues: {
      reportType: "word",
      organizationName: "",
      sectionTitle: "",
      startDate: undefined,
      endDate: undefined,
      preExamPercentage: 0,
      postExamPercentage: 0,
      trainerEvaluationPercentage: 0,
      trainersEvaluationPercentage: 0,
      trainerName: "",
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

      alert("Report exported successfully!");
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
      title="Export Assignment : "
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Organization Name */}

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Organization Name  :"
              name="organizationName"
              placeholder="Enter organization name"
            />

            {/* Section Title */}

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Section Title :"
              name="sectionTitlee"
              placeholder="Enter section title"
            />

            {/* Section Code */}

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              label="Section Code :"
              name="sectionCode"
              placeholder="Enter section code"
            />

            {/* Date Range */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      style={{ zIndex: 1000 }}
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        style={{ zIndex: 1000 }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      style={{ zIndex: 1000 }}
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        style={{ zIndex: 1000 }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Percentages */}

            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="Pre-Exam Percentage :"
              name="preExamPercentage"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="Post-Exam Percentage :"
              name="postExamPercentage"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="Trainer Evaluation Percentage :"
              name="trainerEvaluationPercentage"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="Trainers' Evaluation Percentage :"
              name="trainersEvaluationPercentage"
            />
            <CustomFormField
              fieldType={FormFieldType.NUMBER}
              control={form.control}
              label="Trainer Name :"
              name="trainerName"
              placeholder="Enter trainer name"
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
                "Export Report"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ExportAssignment;
