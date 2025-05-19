export interface StudentDataType {
  key: string;
  first_name: string;
  last_name: string;
  id_number: string;
  id: number;
  email: string;
  submission_time?: string;
  duration?: string;
  grade?: number;
  correct_answers_count?: number;
  wrong_answers_count?: number;
  status?: string;
  answers?: Array<{
    submission_time?: string;
    time_to_stay_until_the_answer?: string;
  }>;
}
