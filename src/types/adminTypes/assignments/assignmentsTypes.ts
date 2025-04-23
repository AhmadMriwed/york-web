interface Category {
    id: number;
    img: string;
    img_icon: string;
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
    status:string; 
    type: Type;
    category: Category;
    created_at: string;
    updated_at: string;
  }
  export interface AddAssignmentSectionTypes {

    code: string;
    image: string;
    title: string;
    organization: string;
    trainer: string;
    start_date: string;
    end_date: string;
    description: string;
    status:string; 
    type_id: number;
    category_id: number;
  }


  export interface SectionType{
    id:number; 
    type:string; 
  }