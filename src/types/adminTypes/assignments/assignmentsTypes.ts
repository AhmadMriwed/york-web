export interface Category {
  id: number;
  img: string;
  imgicon: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Type {
  id: number;
  type: string;
}

export interface AssignmentSession {
  id: number;
  code: string;
  image: string;
  title: string;
  organization: string;
  trainer: string;
  start_date: string;
  end_date: string;
  description: string;
  status: string;
  type: Type;
  category: Category;
  created_at: string;
  updated_at: string;
}

export interface SectionType {
  id: number;
  type: string;
}

export interface FilterAssignmentSessionsParams {
  search?: string;
  organization?: string;
  from_date?: string;
  to_date?: string;
  categories?: number[];
  per_page?: number;
}


interface ExamType {
  id: number;
  type: string;
  hint: string | null;
  description: string;
}

export interface ExamConfig {
  id: number;
  exam_id: number;
  condition_exam_id: number | null;
  time_exam: string;
  start_date: string;
  end_date: string;
  view_results: "manually" | "per_answer" | "after_finish"; // Update with possible values
  view_answer: "manually" | "per_answer" | "after_finish"; // Update with possible values
  date_view: string;
  count_questions_page: number;
  time_questions_page: string;
  required_page_next: boolean;
  count_return_exam: number;
  language: "en" | "fn"| 'ar' | string; // Update with possible language codes
  created_at: string;
  updated_at: string;
}

export interface Assignment {
  id: number;
  code: string;
  title: string;
  sub_title: string;
  status: "Active" | "Inactive" | "Draft"; // Update with possible statuses
  image: string | null;
  number_of_questions: number;
  number_of_students: number;
  percentage: number;
  duration_in_minutes: number;
  exam_type: ExamType;
  exam_section_id: number | null;
  exam_type_id: number;
  created_at: string;
  updated_at: string;
  exam_config: ExamConfig;
}
