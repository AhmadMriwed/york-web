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

export interface UserType {
  email: string;
  first_name: string;
  id: number;
  is_verified: boolean;
  last_name: string;
  access_token: string;
  user_id: number;
  user_type: string;
  language: string | null;
  image: null | string;
  categories: any;
}
