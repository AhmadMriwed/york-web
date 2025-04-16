export interface UserState {
  user: null | UserType;
  error: null | any;
  loading: boolean;
  msg: string;
  loadingPass: boolean;
  errorPass: null;
  location: string;
  status: boolean;
}

export interface RoleType {
  id: number;
  name: string;
}

export interface UserType {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string | null;
  phone_number: string;
  on_notification: boolean | null;
  image: string | null;
  birth_date: string | null;
  about_me: string | null;
  gender: string | null;
  url: string | null;
  is_verified: boolean;
  language: string;
  categories:{id:number,title:string}[]
  job_type: string | null;
  role: RoleType;
  account_type: string;
  account_status: string | null;
  status: string | null;
  user_type?:string|null
}