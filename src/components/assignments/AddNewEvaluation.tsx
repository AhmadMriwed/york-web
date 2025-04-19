import { Modal, Space } from "antd";
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
import { PlusCircleOutlined } from "@ant-design/icons";

// Validation schema
export const AddEvaluationValidation = z.object({
  evaluationType: z.enum(["trainer", "trainee"]),
  overallRating: z.number().min(0).max(100),
  ratedStudents: z.number().min(0),
  status: z.enum(["active", "inActive"]),
  startDate: z.date(),
  endDate: z.date(),
});

type Props = {
  title: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onCancel: () => void;
};

const AddNewEvaluationModal = ({
  title,
  isModalOpen,
  setIsModalOpen,
  onCancel,
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof AddEvaluationValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(AddEvaluationValidation),
    defaultValues: {
      evaluationType: "trainer",
      overallRating: 0,
      ratedStudents: 0,
      status: "active",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Adding new evaluation:", values);
      setIsModalOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to add evaluation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title={
        <Space className="m-4 mb-0">
          <span className="font-bold text-lg text-primary-color1">
            {title} :{" "}
          </span>
        </Space>
      }
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="[&_.ant-modal-content]:p-0" // Remove Ant Design padding
      styles={{
        body: {
          padding: "24px",
        },
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Evaluation Type */}
            <FormField
              control={form.control}
              name="evaluationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Evaluation Type :{" "}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 focus:ring-primary-color1 bg-gray-200">
                        <SelectValue placeholder="Select evaluation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[2000]">
                      {" "}
                      {/* Increased z-index */}
                      <SelectItem value="trainer">
                        Trainer Evaluation
                      </SelectItem>
                      <SelectItem value="trainee">
                        Trainee Evaluation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Overall Rating */}
              <CustomFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                label="Overall Rating (%)  :"
                name="overallRating"
              />
              {/* Rated Students */}
              <CustomFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                label="Number OF Students  :"
                name="ratedStudents"
              />
            </div>
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium ">Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 bg-gray-200 focus:ring-primary-color1">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="z-[2000]">
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inActive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium">Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-10 pl-3 text-left bg-gray-200 focus:ring-primary-color1 font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a start date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[2000]"
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
                    <FormLabel className="font-medium">End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-10 pl-3 text-left bg-gray-200 focus:ring-primary-color1 font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick an end date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 z-[2000]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = form.getValues("startDate");
                            return (
                              date < (startDate || new Date("1900-01-01")) ||
                              date > new Date()
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 bg-primary-color1 hover:bg-primary-color2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Evaluation"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddNewEvaluationModal;
