export interface TrainerState {
  loading: boolean;
  error: null | any;
  loadingPass: boolean;
  errorPass: null;
  trainer: null | TrainerType;
  msg: string;
  location: string;
  status: boolean;
}
export interface CategoryType {
  id: number;
  title: string;
  image: null | string;
  description: string;
}

export interface TrainerType {
  email: string;
  digital_signature: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  url: string;
  image: null | string;
  birth_date: string;
  about_me: string;
  gender: string;
  location: null | {
    address: string;
    latitude: number;
    longitude: number;
  };
  categories: CategoryType[];
  trainer_type_id: number;
  domains: string;
  account_type: string;
  language: null | string;
  is_verified: boolean;
  access_token: string;
}
