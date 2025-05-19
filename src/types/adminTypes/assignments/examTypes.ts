export interface UserResponse {
  id: number;
  form_id: number;
  id_number: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  start: string;
  end: string;
  grade: string;
  correct_answers_count: number;
  wrong_answers_count: number;
  status: string;
  answers: {
    id: number;
    user_id: number;
    submission_time: string;
    time_to_stay_until_the_answer: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
  message?: string;
}

export type ResultQuestionData = {
  question: string;
  correct_answer_grade: number;
  wrong_answer_grade: number;
  user_answers: string[];
  correct_answers: string[];
  status: "Correct" | "InCorrect";
};

type Forms = {
  id: number;
};
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
  forms: Forms[];
}

type QuestionField = {
  id: number;
  question_form_id: number;
  field: string;
  field_type: string;
};

type CorrectAnswer = {
  id: number;
  question_form_id: number;
  correct_value: string;
  created_at: string;
  updated_at: string;
};

type Field = {
  question_field_id?: number;
  field: string;
};

export interface QuestionData {
  id: number;
  form_id: number;
  question_type_id: number;
  question_number: number;
  question: string;
  correct_answer_grade: number;
  wrong_answer_grade: number;
  hint: string | null;
  show_grade: number;
  fields: QuestionField[];
  correct_answers: CorrectAnswer[];
  created_at: string;
  updated_at: string;
  answer_id?: number | null;
}

export interface UserData {
  id: number;
  form_id: number;
  first_name: string;
  id_number: string;
  last_name: string | null;
  email: string | null;
  role: string;
  attended: boolean;
  start: string | null;
  end: string | null;
  grade: number | null;
  correct_answers_count: number | null;
  wrong_answers_count: number | null;
  status: string | null;
  duration_in_minutes: number | null;
  created_at: string;
  updated_at: string;
}
