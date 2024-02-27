export interface courseType {
  id: number;
  code: string;
  active: number;
  title: string;
  sub_title: string | null;
  start_date: string;
  end_date: string;
  houres: number;
  change_active_date: string | null;
  fee: string;
  description: string | null;
  outlines: string;
  lang: string;
  course_status: string;
  img: string | null;
  location: string | null;
  course_ad: {
    id: number;
    code: string;
    title: string;
    image: string | null;
  };
  category: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  venue: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

export interface singleCourseState {
  isLoading: boolean;
  error: null | any;
  courseInfo: null | courseType;
}
