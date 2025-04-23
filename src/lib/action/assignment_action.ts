import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerLanguage } from "@/app/(root)/[locale]/api/getServerLanguage";
import { AssignmentSession, Category, FilterAssignmentSessionsParams, SectionType } from "@/types/adminTypes/assignments/assignmentsTypes";
import { toast } from "sonner";
import { getAuthHeaders } from "@/store/adminstore/slices/enums/authHeaders";

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
    const response = await apiClient.get(url, config);
    
    return (
      response.data?.data !== undefined 
        ? response.data.data 
        : response.data
    ) as T;
  } catch (error) {
    throw error;
  }
};

const deleteApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(url, config);
      return response.data.data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  };



export const fetchAssignmentSessions = async (): Promise<AssignmentSession[]> => {
  try {
    return await get<AssignmentSession[]>('/exam-sections');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

export const fetchSectionTypes = async (): Promise<SectionType[]> => {
  try {
    return await get<SectionType[]>('/exam-sections-type');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    return await get<Category[]>('/categories');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                       error.message || 
                       "Failed to fetch categories";
    throw new Error(errorMessage);
  }
};



export const fetchAssignmentSessionById = async (id:number): Promise<AssignmentSession> => {
    try {
      return await get<AssignmentSession>(`/exam-sections/${id}`);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to fetch assignments";
      throw new Error(errorMessage);
    }
  };
  

  export const deleteAssignmentSession = async (id: number): Promise<void> => {
           try {
              const res = await axios.delete(`/assignment/exam-sections/${id}`, getAuthHeaders()); 
     
              if (res.status === 200) {
                toast.success('Assignment Session Deleted Successfully')
            }
           } catch (error: any) {
              console.error("Error:", error);
           }
        }


  export const changeStatus = async (id: number): Promise<void> => {
           try {
              const res = await axios.patch(`/assignment/exam-sections/${id}/toggle-status`, getAuthHeaders()); 
     
              if (res.status === 200) {
                console.log('toggle')
            }
           } catch (error: any) {
              console.error("Error:", error);
           }
        }

   
   
        
  export const filterAssignmentSessions = async (
          params: FilterAssignmentSessionsParams
        ): Promise<AssignmentSession[]> => {
          try {
            const queryParams = new URLSearchParams();
            
            if (params.search) queryParams.append('search', params.search);
            if (params.organization) queryParams.append('organization', params.organization);
            if (params.from_date) queryParams.append('from_date', params.from_date);
            if (params.to_date) queryParams.append('to_date', params.to_date);
            if (params.per_page) queryParams.append('per_page', params.per_page.toString());
            
            if (params.categories && params.categories.length > 0) {
              params.categories.forEach(catId => {
                queryParams.append('categories[]', catId.toString());
              });
            }
        
            const url = `/exam-sections/filterAll?${queryParams.toString()}`;
            return await get<AssignmentSession[]>(url);
            
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               "Failed to filter assignments";
            throw new Error(errorMessage);
          }
        };