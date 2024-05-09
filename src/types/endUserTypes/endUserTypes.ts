import { courseAdType } from "../adminTypes/courses/coursesTypes";
import { Venue, Category } from "../adminTypes/courses/coursesTypes";

interface Currency {
  amount: number;
  currency: string;
  flag: string;
  id: number;
}

interface User {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  phone_number: string;
  image: string | null;
  about_me: string;
  gender: string;
  account_type: string;
}

interface permissionCourses {
  id: number;
  name: string;
  guard_name: string;
}

export interface endUserState {
  isLoading: boolean;
  error: any | null;
  venues: Venue[] | [];
  categories: Category[] | [];
  courseads: courseAdType[] | [];
  currencies: Currency[];
  trainers: User[] | [];
  trainees: User[] | [];
  clients: User[] | [];
  coursePermissions: permissionCourses[] | [];
}
