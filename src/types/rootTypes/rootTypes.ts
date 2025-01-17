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
    content: string; 
    created_at: string; 
    updated_at: string; 
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