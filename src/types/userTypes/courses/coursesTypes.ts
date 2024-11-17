import { courseType } from "@/types/adminTypes/courses/coursesTypes";

interface venueCategoriesType {
   id: number;
   title: string;
   description: string;
   image: null | string;
}

export interface couresesAdsState {
   isLoading: boolean;
   error: any;
   coursesAds: courseType[];
   filterCourse: {
      language: {
         name: string;
         code: string;
      }[];
      venues: venueCategoriesType[];
      categories: venueCategoriesType[];
   };
}
