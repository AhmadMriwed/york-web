import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerLanguage } from "@/app/(root)/[locale]/api/getServerLanguage";
import {
    AddAssignmentSectionTypes,
  AssignmentSession,
  SectionType,
} from "@/types/adminTypes/assignments/assignmentsTypes";

interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ASSIGNMENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for language
// apiClient.interceptors.request.use((config) => {
//   const language = getServerLanguage();
//   config.headers["Accept-Language"] = language === "ar" ? "ar" : "en";
//   return config;
// });

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(
      url,
      config
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};


export const fetchAssignmentSessions = async (): Promise<
  AssignmentSession[]
> => {
  try {
    return await get<AssignmentSession[]>("/exam-sections");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

export const fetchSectionTypes = async (): Promise<SectionType[]> => {
  try {
    return await get<SectionType[]>("/exam-sections-type");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};
export const fetchAssignmentSessionById = async (id: number): Promise<SectionType[]> => {
  try {
    console.log(id);
    return await get<SectionType[]>(`/exam-sections/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

export const addExamSection = async (
  formData: any
)=> {
  try {
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const response =  await axios.post(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exam-sections`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};
export const updateExamSection = async (
  formData: any, id: number
)=> {
  try {
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const response =  await axios.post(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exam-sections/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
    return response;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
    }
};
