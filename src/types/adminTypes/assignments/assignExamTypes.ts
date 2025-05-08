export interface Category {
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


type ConditionExam = {
  id: number;
  name: string;
  type: string; // You can make this a literal type if needed
};

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
  condition_exams: ConditionExam[]
}

interface StartForm {
  id: number;
  form_id: number;
  title: string;
  sub_title: string;
  description: string;
  show_configration: number; // likely a boolean-like number (0 or 1)
  show_condition: number;    // likely a boolean-like number (0 or 1)
  image: string;             // URL or file path
  created_at: string;        // ISO date string
  updated_at: string;        // ISO date string
}

interface EndForm {
  id: number;
  form_id: number;
  title: string;
  sub_title: string;
  description: string;
  show_configration: number; // likely a boolean-like number (0 or 1)
  show_condition: number;    // likely a boolean-like number (0 or 1)
  image: string;             // URL or file path
  created_at: string;        // ISO date string
  updated_at: string;
  link: string;
  url : string;        // ISO date string
}


type Form = {
  id: number;
  created_at: string;
  updated_at: string;
}
type FieldRequirment = {
  id: number;
  form_id?: number;
  name:string; 
  field_requirement_id?: number;
}

export interface Assignment {
  start_forms: StartForm[];
  end_forms: EndForm[];
  id: number;
  code: string;
  url: string|null;
  forms: Form[];
  title: string;
  sub_title: string;
  status: "Active" | "Inactive" | "Draft"; 
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
  field_requirements: FieldRequirment[];
}


interface EvaluationType {
  id: number;
  type: string;
  hint: string | null;
  description: string;
}


export interface EvaluationConfig {
  id: number;
  exam_id: number;
  evaluation_id: number;
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
  condition_exams: ConditionExam[]
}

export interface Evaluation {
  start_forms: StartForm[];
  end_forms: EndForm[];
  id: number;
  code: string;
  url?:string; 
  forms: Form[];
  title: string;
  sub_title: string;
  status: "Active" | "Inactive" | "Draft"; // Update with possible statuses
  image: string | null;
  number_of_questions: number;
  number_of_students: number;
  grade_percentage: number;
  duration_in_minutes: number;
  evaluation_type: EvaluationType;
  exam_section_id: number | null;
  exam_type_id: number;
  created_at: string;
  updated_at: string;
  evaluation_config: EvaluationConfig;
  field_requirements: FieldRequirment[];
}

export interface ExamData {
  id: number;
  code: string;
  title: string;
  sub_title: string;
  status: string;
  image: string | null;
  number_of_questions: number;
  duration_in_minutes: number;
  grade_percentage: number | null;
  exam_type: {
    id: number;
    type: string;
    hint: string | null;
    description: string;
  };
  exam_section_id: number;
  exam_type_id: number;
  created_at: string;
  updated_at: string;
  exam_config: {
    id: number;
    exam_id: number;
    evaluation_id: number | null;
    time_exam: string;
    start_date: string;
    end_date: string;
    view_results: string;
    view_answer: string;
    date_view: string;
    count_questions_page: number;
    time_questions_page: string;
    required_page_next: boolean;
    count_return_exam: number;
    language: string;
    created_at: string;
    updated_at: string;
  };
}