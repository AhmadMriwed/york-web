import { z } from "zod";

export const addEvaluationValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional(),
  code: z.string().optional(),
  status: z.string().optional(),
  number_of_questions: z
    .number()
    .min(1, "Must have at least 1 question")
    .optional(),

  evaluation_type_id: z.number().optional(),
  exam_section_id: z.number().optional(),
});

export const updateEvaluationValidationSchema = z.object({
  form_id: z.number(),
  code: z.string(),
  title: z.string().min(1, "Title is required"),
  sub_title: z.string().optional(),
  status: z.string(),
  number_of_questions: z.number().optional(),
  duration_in_minutes: z.number().optional(),
  evaluation_type_id: z.number().optional(),
  exam_section_id: z.number().optional(),

  image: z
    .union([z.string().url().or(z.string().min(1)), z.instanceof(File)])
    .nullable()
    .optional(),

  evaluation_config: z
    .object({
      condition_exams_id: z.string().optional(),
      view_results: z.string().optional(),
      language: z.string().optional(),
      date_view: z.string().optional(),
      count_questions_page: z.number().optional(),
      count_return_exam: z.number().optional(),
      view_answer: z.string().optional(),
      start_date: z.date().optional().nullable(),
      end_date: z.date().optional().nullable(),
    })
    .optional()
    .nullable(),

  start_form: z
    .object({
      title: z.string().optional(),
      sub_title: z.string().optional(),
      description: z.string().optional(),
      image: z.union([z.string(), z.instanceof(File)]).optional(),
      show_configration: z.number().optional(),
      show_condition: z.number().optional(),
    })
    .optional(),

  start_form_image: z.union([z.string().url(), z.instanceof(File)]).optional(),

  end_form: z
    .object({
      title: z.string().optional(),
      sub_title: z.string().optional(),
      description: z.string().optional(),
      url: z.string().optional(),

      image: z.union([z.string().url(), z.instanceof(File)]).optional(),
    })
    .optional(),

  end_form_image: z.union([z.string().url(), z.instanceof(File)]).optional(),

  field_requirement: z
    .object({
      field_requirement_id: z.array(z.number()).optional(),
    })
    .optional(),
});
