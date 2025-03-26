import { string } from "zod";

export interface EnumType1 {
   id: number;
   title: string;     
   description: string;
   image: string;
 }


export interface EnumType2 {
   id: number;
   hint: string;
   description: string;
   type: string;
}
export interface EnumType3 {
   id: number;
   name: string;
   type: string;
}
export interface VenuesState {
   isLoading: boolean;
   error: any;
   operationLoading: boolean;
   status: boolean;
   perPage: number;
   total: number;
   venues: EnumType1[];
}

export interface CategoriesState {
   isLoading: boolean;
   error: any;
   operationLoading: boolean;
   status: boolean;
   perPage: number;
   total: number;
   categories: EnumType1[];
   categoriesAsMenue: {
      label: string;
      value: number;
   }[];
}

export interface RequestTypesState {
   isLoading: boolean;
   error: any;
   status: boolean;
   perPage: number;
   total: number;
   operationLoading: boolean;
   requestTypes: EnumType3[];
   requestTypesAsMenue: {
      label: string;
      value: number;
   }[];
}

export interface ExamTypesState {
   isLoading: boolean;
   error: any;
   status: boolean;
   perPage: number;
   total: number;
   operationLoading: boolean;
   examTypes: EnumType2[];
}

export interface QuestionTypesState {
   isLoading: boolean;
   error: any;
   perPage: number;
   total: number;
   status: boolean;
   operationLoading: boolean;
   questionTypes: EnumType2[];
}

export interface TrainerTypesState {
   isLoading: boolean;
   error: any;
   status: boolean;
   perPage: number;
   total: number;
   operationLoading: boolean;
   trainerTypes: EnumType3[];
}

export interface CourseTypesState {
   isLoading: boolean;
   error: any;
   status: boolean;
   operationLoading: boolean;
   perPage: number;
   total: number;
   courseTypes: EnumType3[];
}
export interface SingleEnumType {
   id: number;
   title?: string;
   description?: string;
   image?: null | string;
   hint?: string;
   type?: string;
   name?: string;
}

export interface SingleEnumState {
   isLoading: boolean;
   error: any;
   singleEnum: SingleEnumType;
}

export interface ImportExport {
   isLoading: boolean;
   error: any;
   importedFile: any;
   exportedFile: any;
}
