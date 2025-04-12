export interface Venue {
  id: number;
  title: string;
  description: string;
  image: string | null;
}
export interface Category {
  id: number;
  title: string;
  description: string;
  image: string | null;
}
interface SeasonModel {
  name: string;
  origin: string;
}
interface Language {
  name: string;
  code: string;
}
interface MonthModel {
  name: string;
  origin: string;
}
interface YearModel {
  name: string;
  origin: string;
}

export interface filterDataType {
  languages: Language[];
  venues: Venue[];
  categories: Category[];
  season_models: SeasonModel[];
  month_models: MonthModel[];
  year_models: YearModel[];
  count_course_ad: number;
}

// SUBMIT COURSES
export interface submitCourseType {
  id: number;
  status: string | null;
  cause: string | null;
  course_ad_id: number;
  name: string | null;
  category: Category;
  venue: Venue;
  language: string;
  title: string;
  description: string | null;
  fee: string;
  start_date: string;
  end_date: string;
  hours: number;
  code: string;
  entity_type: string;
  num_people: number;
  user_id: number;
  user: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name: string;
    phone_number: string;
    image: string;
    about_me: string;
    gender: string;
    account_type: string;
  };
  department: {
    name: string | null;
    email: string | null;
    url: string | null;
    job_title: string;
    cv_trainer: string | null;
    date_review: string | null;
  };
  selection_training: any;
}

export interface submitCourseState {
  isLoading: boolean;
  error: null | any;
  submitCourses: submitCourseType[] | [];
  adSubmitCourses: submitCourseType[] | [];
  submitDetails: submitCourseType | null;
  /* operations */
  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

// COURSE ADS
export interface TranslatedText {
  origin: string;
  ar?: string|null;
  en?: string  |null;
}
export type FlexibleTranslatedText =  TranslatedText|string ;

export interface courseAdType {
  category: Category;
  change_active_date: string;
  code: string;
  count_courses: number;
  count_requests: number;
  count_views: number;
  description: FlexibleTranslatedText;
  end_date: string;
  fee: string;
  houres: number;
  id: number;
  image: null | string;
  language: string;
  outlines: FlexibleTranslatedText;
  start_date: string;
  sub_title: FlexibleTranslatedText;
  title: FlexibleTranslatedText;
  venue: Venue;
}

export interface courseAdsState {
  isLoading: boolean;
  error: null | any;
  courseAds: courseAdType[] | [];
  filterData: filterDataType;
  courseAdInfo: courseAdType;
  /* operations */
  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

// COURSES
export interface courseType {
  id: number;
  code: string;
  active: number;
  title: string;
  sub_title: string;
  start_date: string;
  end_date: string;
  houres: number;
  change_active_date: string | null;
  fee: string;
  description: string;
  outlines: string;
  language: string;
  course_status: string;
  status: string;
  image: string;
  location: any;
  course_ad: {
    id: number;
    code: string;
    title: string;
    image: string | null;
  };
  category: Category;
  venue: Venue;
  count_training_session: number;
  count_clients: number;
  count_trainers: number;
  count_trainees: number;
  owner_id: number;
  owner: {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_name: string | null;
    phone_number: string | null;
    image: string | null;
    about_me: string | null;
    gender: string | null;
    account_type: string;
  };
}

export interface coursesState {
  isLoading: boolean;
  error: null | any;
  allCourses: courseType[] | [];
  filterData: filterDataType;
  courseInfo: null | courseType;
  courseId: null | number;
  /* operations */
  operationLoading: boolean;
  operationError: null | any;
  status: boolean;
}

export interface myCoursesState {
  isLoading: boolean;
  error: null | any;
  myCourses: courseType[] | [];
}

// TRAINING PLAN
export interface PDFType {
  id: number;
  name: string;
  path: string;
  size: number;
  sub_type: string;
  type: string;
}

export interface trainingPlanType {
  id: number;
  title: {
    en:string|null; 
    ar:string|null; 
    origin:string|null; 
  };
  sub_title: {
    en:string|null; 
    ar:string|null; 
    origin:string|null; 
  };
  image: string | null;
  file: null | PDFType;
  year: number;
}

export interface trainingPlanState {
  isLoading: boolean;
  error: any | null;
  trainingPlan: trainingPlanType | null;
  planInfo: trainingPlanType | null;
  /* plan operation */
  status: boolean;
  operationLoading: boolean;
  operationError: null | any;
}

// JOINED USERS
export interface clientType {
  id: number;
  permission_courses: {
    id: number;
    name: string;
    guard_name: string;
  };
  courses_id: number;
  client_id: number;
  status: string;
  date_accept: string;
  user: {
    user_id: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image: string;
    domains: null | any;
    gender: string;
  };
}
export interface traineeType {
  id: number;
  permission_courses: {
    id: number;
    name: string;
    guard_name: string;
  };
  courses_id: number;
  user_id: number;
  status: string;
  date_accept: string;
  date_reject: string;
  user: {
    user_id: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image: string;
    domains: null | any;
    gender: string;
  };
}

export interface requestToJoinType {
  id: number;
  permission_courses: {
    id: number;
    name: string;
    guard_name: string;
  };
  cv_file: any;
  courses_id: number;
  user_id: number;
  status: string;
  cause: null | string;
  date_accept: string;
  date_reject: string;
  user: {
    user_id: number;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image: string | null;
    domains: null | any;
    gender: string;
  };
}

export interface courseJoinedUsersState {
  isLoading: boolean;
  error: null | any;
  courseClients: clientType[] | [];
  courseTrainers: clientType[] | [];
  courseTrainees: traineeType[] | [];
  requestsToJoin: requestToJoinType[] | [];
  /* operations */
  operationError: null | any;
  operationLoading: boolean;
  status: boolean;
}

// COURSE REQUESTS

export interface courseRequestsState {
  isLoading: boolean;
  error: any | null;
  courseRequests: courseType[] | [];
  /* operations */
  operationError: null | any;
  operationLoading: boolean;
  status: boolean;
}
