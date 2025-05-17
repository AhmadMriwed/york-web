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
import { Loader2 } from "lucide-react";
import { exportExam } from "@/lib/action/exam_action";

export const ExportExamStatsValidation = z.object({
  reportType: z.string(),
  title: z.string().min(1, "Title is required").trim(),
});

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  assignmentId: number;
  defaultTitle?: string;
};

const ExportExam = ({
  isModalOpen,
  setIsModalOpen,
  assignmentId,
  defaultTitle = "",
}: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof ExportExamStatsValidation>;

  const form = useForm<FormValues>({
    resolver: zodResolver(ExportExamStatsValidation),
    defaultValues: {
      reportType: "word",
      title: defaultTitle,
    },
  });

  const handleCancel = () => {
    form.reset();
    setIsModalOpen(false);
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await exportExam({
        fileName: values.title,
        type: values.reportType === "word" ? "docx" : "xlsx",
        id: assignmentId,
      });

      handleCancel();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Export Assignment"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter export title"
                      {...field}
                      className=" focus:outline-none border focus:ring-2 ring-primary-color1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

export default ExportExam;
