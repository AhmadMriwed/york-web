import * as $ from 'jquery';

export interface Question { 
    question: string; 
    answer: string; 
  }
  
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
  
  export interface Section { 
    id: number; 
    type_id: number; 
    title: string; 
    description: string; 
    img: string | null; 
  }
  
  export interface AboutUs { 
    id: number; 
    title: string; 
    description: string; 
    url: string; 
  }
  
  export interface Slider { 
    id: number; 
    title: string; 
    description: string; 
    img: string; 
    first_btn_text: string; 
    first_btn_url: string; 
    second_btn_text: string; 
    second_btn_url: string; 
  }
  
  export interface Course {
    id: number;
    title: string;
    description: string;
    image: string | null;
    sub_title: string;
    fee: string;
    outlines: string;
    start_date: string;
    end_date: string;
    hours: number;
    language: string;
    code: string;
    count_requests: number;
    count_courses: number;
    change_active_date: string | null;
    category: Category;
    venue: Venue;       
    count_views: number;
  }

  export interface Upcoming_Course{
    id:number;
    title:string;
    description:string;
    img:string;
    course_date:string;
  }

  export interface Training_Plan{
    id:number;
    title:string;
    sub_title:string;
    image:string;
    file:null,
    year:number;

  }
  export interface Client {
    id:number ; 
    img:string;
    url:string;
  }
  export interface Language {
    name: string;
    code: string;
  }
  
  export interface SeasonModel {
    name: string;
    origin: string;
  }
  export interface Year{
    name: string;
    origin: string;
  }

export interface FilterCoursesResponse {
    languages: Language[];
    venues: Venue[];
    categories: Category[];
    season_models: SeasonModel[];
    year_models:Year[];
  } 


export interface PlanRegisterData {
    training_plan_id: number|null;
    full_name: string;
    phone: string;
    email: string;
  }

  
export interface SearchFilters {
  title: string;
  languages: string[];
  category_ids: number[];
  venue_ids: number[];
  season_models: string[];
  year_models: string[];
}

export interface RegistrationData {
  title: string;
  description?: string|undefined;
  fee: string;
  start_date: string;
  end_date: string;
  houres: number;
  language: string;
  code?: string;
  category_id: number;
  venue_id: number;
  name: string;
  email: string;
  url?: string;
  job_title?: string;
  cv_trainer: File | null;
  selection_training?: {
    name?: string;
    email?: string;
    functional_specialization?: string;
    phone_number?: string;
    trainer_id?: number;
  };
  num_people: number;
  entity_type: string;
  user_id?: number;
  course_ad_id?: number;
}


interface ContactUsType {
  id: number;
  type: string;
}

export interface ContactUs {
  id: number;
  type: ContactUsType;
  content?: string;
  url?: string;
}

export interface Certificate{
  id:number; 
  certificate_id:string|null;
  certificate_img:string;
  trainer_full_name:string;
  trainer_img:string;
  valid_from:string;
  valid_to:string;
}

declare global {
  interface JQuery {
    vectorMap(options: any): JQuery;
  }
}