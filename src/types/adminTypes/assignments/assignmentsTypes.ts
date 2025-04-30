export interface Category {
  id: number;
  img: string;
  imgicon: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}


export interface Type {
  id: number;
  type: string;
  hint?: string | null;
  description?: string | null;
}

export interface Condition {
  id: number;
  name: string;
  type: string;
}
export interface Requirement {
  id: number;
  name?: string;
  form_id?: number;
  field_requirement_id:number;
}

export interface  ExamConfig {
  id: number;
  exam_id?: number;
  evaluation_id?: number;
  time_exam: string;
  start_date: string;
  end_date: string;
  view_results: string;
  view_answer: string;
  date_view: string | null;
  count_questions_page: number;
  time_questions_page: string;
  required_page_next: boolean;
  count_return_exam: number;
  language: string;
  created_at: string;
  updated_at: string;
  condition_exams?: Condition[];

}

export interface Forms {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface StartFormType {
  id: number;
  form_id: number;
  title: string;
  sub_title: string;
  description: string;
  show_configration: number;
  show_condition: number ;
  image: string | null;
  created_at: string;
  updated_at: string;
  files:any[]
}

export interface EndFormType {
  id: number;
  form_id: number;
  title: string;
  sub_title: string;
  description: string;
  url: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  files:any[];
}

export interface Assignment {
  id: number;
  code: string;
  title: string;
  sub_title: string;
  status: string;
  image: string | null;
  number_of_questions: number;
  duration_in_minutes: number;
  exam_type: Type;
  exam_section_id: number;
  exam_type_id: number;
  created_at: string;
  updated_at: string;
  exam_config: ExamConfig;
  forms: Forms[];
  start_forms: StartFormType[];
  start_form_image:string|null ;
  end_forms: EndFormType[];
  end_form_image:string|null ;
  field_requirements: Requirement[];
  condition_exams?: Condition[];
  grade_percentage?:number; 
  
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
  evaluations:Evaluation[]
  post_exams:Assignment[];
  pre_exams:Assignment[];
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
export interface Evaluation extends Assignment {
  evaluation_type_id:number;
  evaluation_config:ExamConfig; 
}
