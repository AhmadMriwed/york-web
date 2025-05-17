import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getServerLanguage } from "@/app/(root)/[locale]/api/getServerLanguage";
import {
  AssignmentSession,
  Category,
  Condition,
  EndFormType,
  Evaluation,
  FilterAssignmentSessionsParams,
  Organization,
  Requirement,
  SectionType,
  StartFormType,
  Type,
} from "@/types/adminTypes/assignments/assignmentsTypes";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";

import { toast } from "sonner";
import { getAuthHeaders } from "@/store/adminstore/slices/enums/authHeaders";
import {
  ResultQuestionData,
  UserResponse,
} from "@/types/adminTypes/assignments/examTypes";

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
      response.data?.data !== undefined ? response.data.data : response.data
    ) as T;
  } catch (error) {
    throw error;
  }
};

const deleteApi = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.delete(
      url,
      config
    );
    return response.data.data;
  } catch (error) {
    console.error("Error in DELETE request:", error);
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

export const addExamSection = async (formData: any) => {
  try {
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exam-sections`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};
export const updateExamSection = async (formData: any, id: number) => {
  try {
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exam-sections/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    return await get<Category[]>("/categories");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch categories";
    throw new Error(errorMessage);
  }
};

export const fetchAssignmentSessionById = async (
  id: number
): Promise<AssignmentSession> => {
  try {
    return await get<AssignmentSession>(`/exam-sections/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

export const deleteAssignmentSession = async (id: number): Promise<void> => {
  try {
    const res = await axios.delete(
      `/assignment/exam-sections/${id}`,
      getAuthHeaders()
    );

    if (res.status === 200) {
      toast.success("Assignment Session Deleted Successfully");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};
export const duplicateAssignmentSession = async (id: number): Promise<void> => {
  try {
    const res = await axios.get(
      `/assignment/exam-sections/duplicate/${id}`,
      getAuthHeaders()
    );

    console.log(res);
    if (res.status === 200) {
      toast.success("Assignment Session duplicated Successfully");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const changeStatus = async (id: number): Promise<void> => {
  try {
    const res = await axios.patch(
      `/assignment/exam-sections/${id}/toggle-status`,
      getAuthHeaders()
    );

    if (res.status === 200) {
      console.log("toggle");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};
export const filterAssignmentSessions = async (
  params: FilterAssignmentSessionsParams
): Promise<AssignmentSession[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params.search) queryParams.append("search", params.search);
    if (params.organization)
      queryParams.append("organization", params.organization);
    if (params.status) queryParams.append("status", params.status);
    if (params.from_date) queryParams.append("from_date", params.from_date);
    if (params.to_date) queryParams.append("to_date", params.to_date);
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());

    if (params.categories && params.categories.length > 0) {
      params.categories.forEach((catId) => {
        queryParams.append("categories[]", catId.toString());
      });
    }

    const url = `/exam-sections/filterAll?${queryParams.toString()}`;
    return await get<AssignmentSession[]>(url);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to filter assignments";
    throw new Error(errorMessage);
  }
};

// Exam :
export const createExam = async (values: {
  title: string;
  sub_title?: string;
  status?: string;
  number_of_questions?: number;
  duration_in_minutes?: number;
  exam_type_id?: number;
  exam_section_id?: number;
}) => {
  try {
    const response = await axios.post(`/assignment/exams`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success("Exam created successfully");
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to create exam");
  } catch (error: any) {
    console.error("Error creating exam:", error);
    toast.error(error.response?.data?.message || "Failed to create exam");
    throw error;
  }
};
export const updateExam = async (values: {
  form_id: number;
  title: string;
  sub_title?: string;
  status?: string;
  number_of_questions?: number;
  duration_in_minutes?: number;
  exam_type_id?: number;
  exam_section_id?: number;
  image?: string;
  exam_config?: {
    condition_exams_id?: string;
    time_exam?: string;
    view_results?: string;
    language?: string;
    date_view?: string;
    count_questions_page?: number;
    time_questions_page?: string;
    required_page_next?: boolean;
    count_return_exam?: number;
    view_answer?: string;
    start_date?: Date;
    end_date?: Date;
  };
  start_form?: {
    title?: string;
    sub_title?: string;
    description?: string;
    image?: string;
    show_configration?: number;
    show_condition?: number;
  };
  end_form?: {
    title?: string;
    sub_title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
  exam_condition?: {
    condition_exams_id?: number[];
  };
}) => {
  try {
    const formData = new FormData();

    formData.append("form_id", values.form_id.toString());
    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title || "");
    formData.append("status", values.status || "");
    formData.append(
      "number_of_questions",
      values.number_of_questions?.toString() || ""
    );
    formData.append(
      "duration_in_minutes",
      values.duration_in_minutes?.toString() || ""
    );
    formData.append("exam_type_id", values.exam_type_id?.toString() || "");
    formData.append(
      "exam_section_id",
      values.exam_section_id?.toString() || ""
    );

    if (values.exam_config) {
      formData.append(
        "exam_config[count_questions_page]",
        values.exam_config.count_questions_page?.toString() || ""
      );
      formData.append(
        "exam_config[count_return_exam]",
        values.exam_config.count_return_exam?.toString() || ""
      );
      formData.append(
        "exam_config[view_answer]",
        values.exam_config.view_answer?.toString() || ""
      );
      formData.append(
        "exam_config[view_results]",
        values.exam_config.view_results || ""
      );
      formData.append(
        "exam_config[language]",
        values.exam_config.language || ""
      );
      if (values.exam_config.start_date)
        formData.append(
          "exam_config[start_date]",
          values.exam_config.start_date.toString()
        );
      if (values.exam_config.end_date)
        formData.append(
          "exam_config[end_date]",
          values.exam_config.end_date.toString()
        );
    }

    if (values.start_form?.image) {
      formData.append("start_form[image]", values.start_form.image);
    }

    if (values.end_form?.image) {
      formData.append("end_form[image]", values.end_form.image);
    }

    formData.append("start_form[title]", values.start_form?.title || "");
    formData.append(
      "start_form[sub_title]",
      values.start_form?.sub_title || ""
    );
    formData.append(
      "start_form[description]",
      values.start_form?.description || ""
    );
    formData.append(
      "start_form[show_condition]",
      values.start_form?.show_condition ? "1" : "0"
    );
    formData.append(
      "start_form[show_configration]",
      values.start_form?.show_configration ? "1" : "0"
    );

    if (values.end_form) {
      formData.append("end_form[title]", values.end_form.title || "");
      formData.append("end_form[sub_title]", values.end_form.sub_title || "");
      formData.append(
        "end_form[description]",
        values.end_form.description || ""
      );
      formData.append("end_form[url]", values.end_form.url || "");
    }

    // Handle exam_condition if exists
    if (values.exam_condition?.condition_exams_id?.length) {
      formData.append(
        "exam_condition[condition_exams_id]",
        JSON.stringify(values.exam_condition.condition_exams_id)
      );
    }

    // Send the form data to the server
    const response = await axios.post(
      `/assignment/exams/update-all`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Exam updated successfully");
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to update exam");
  } catch (error: any) {
    console.error("Error updating exam:", error);
    toast.error(error.response?.data?.message || "Failed to update exam");
    throw error;
  }
};

export const changeExamStatus = async (id: number): Promise<void> => {
  try {
    const res = await axios.patch(
      `/assignment/exams/${id}/toggle-status`,
      getAuthHeaders()
    );

    if (res.status === 200) {
      console.log("toggle");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};
export const deleteExam = async (id: number): Promise<void> => {
  try {
    const res = await axios.delete(`/assignment/exams/${id}`, getAuthHeaders());

    if (res.status === 200) {
      toast.success("Exam  Deleted Successfully");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};
export const fetchExamTypes = async (): Promise<Type[]> => {
  try {
    return await get<Type[]>("/exam-types");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch exam-types";
    throw new Error(errorMessage);
  }
};
export const fetchOrganization = async (): Promise<Organization[]> => {
  try {
    const organizations = await get<Organization[]>(
      "/exam-sections/get-organization"
    );
    return organizations;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch organization";
    throw new Error(errorMessage);
  }
};

export const fetchExamUsers = async (assignment_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/exams/${assignment_id}/assignment-users`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

// exam condations :
export const fetchExamCondations = async (): Promise<Condition[]> => {
  try {
    return await get<Condition[]>("/condition-exams");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch exam-types";
    throw new Error(errorMessage);
  }
};

// exam requirement :
export const fetchExamRequirementFields = async (): Promise<Requirement[]> => {
  try {
    return await get<Requirement[]>("/field-requirements");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch requirement";
    throw new Error(errorMessage);
  }
};

export const fetchAssignmentById = async (id: number): Promise<Assignment> => {
  try {
    return await get<Assignment>(`/exams/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};
export const fetchAssignmentByUrl = async (
  url: string
): Promise<Assignment> => {
  try {
    return await get<Assignment>(`/exams/by-url/${url}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch assignments";
    throw new Error(errorMessage);
  }
};

// start form :
export const fetchStartFormById = async (
  id: number
): Promise<StartFormType> => {
  try {
    return await get<StartFormType>(`/start-forms/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch start form";
    throw new Error(errorMessage);
  }
};

export const UpdateStartForm = async (formData: FormData, id: number) => {
  try {
    const response = await axios.post(
      `/assignment/start-forms/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success("Start form updated successfully");
      return response.data;
    }

    throw new Error(response.data?.details || "Failed to update form");
  } catch (error: any) {
    console.error("Error updating form:", error);
    toast.error(
      error.response?.data?.details ||
        error.response?.data?.message ||
        "Failed to update form"
    );
    throw error;
  }
};

export const uploadFileToStartForm = async (
  formId: number | string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `/assignment/start-forms/${formId}/upload-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle successful upload
    if (response.status === 201) {
      const responseData = response.data;

      // If the response contains an error message despite 201 status
      if (responseData?.error) {
        throw new Error(responseData.message || "Upload failed");
      }

      toast.success(responseData.message || "File uploaded successfully");
      return {
        id: responseData.id || Date.now(),
        name: file.name,
        size: file.size,
        ...responseData,
      };
    }

    throw new Error(response.data?.message || "Unexpected response status");
  } catch (error: any) {
    console.error("Upload error:", error);

    // Handle case where error contains success message
    if (error.message.includes("successfully")) {
      toast.success(error.message);
      return {
        id: Date.now(),
        name: file.name,
        size: file.size,
      };
    }

    toast.error(
      error.response?.data?.message || error.message || "Failed to upload file"
    );
    throw error;
  }
};

// end from
export const fetchEndFormById = async (id: number): Promise<EndFormType> => {
  try {
    return await get<EndFormType>(`/end-forms/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};
export const UpdateEndForm = async (formData: FormData, id: number) => {
  try {
    const response = await axios.post(`/assignment/end-forms/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("end form updated successfully");
      return response.data;
    }

    toast.error(response?.data?.details || "Failed to update form");
    throw new Error(response.data?.details || "Failed to update form");
  } catch (error: any) {
    console.error("Error updating form:", error);
    toast.error(
      error.response?.data?.details ||
        error.response?.data?.message ||
        "Failed to update form"
    );
    throw error;
  }
};

export const uploadFileToEndForm = async (
  formId: number | string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `/assignment/end-forms/${formId}/upload-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle successful upload
    if (response.status === 201) {
      const responseData = response.data;

      // If the response contains an error message despite 201 status
      if (responseData?.error) {
        throw new Error(responseData.message || "Upload failed");
      }

      toast.success(responseData.message || "File uploaded successfully");
      return {
        id: responseData.id || Date.now(),
        name: file.name,
        size: file.size,
        ...responseData,
      };
    }

    throw new Error(response.data?.message || "Unexpected response status");
  } catch (error: any) {
    console.error("Upload error:", error);

    // Handle case where error contains success message
    if (error.message.includes("successfully")) {
      toast.success(error.message);
      return {
        id: Date.now(),
        name: file.name,
        size: file.size,
      };
    }

    toast.error(
      error.response?.data?.message || error.message || "Failed to upload file"
    );
    throw error;
  }
};

// evaluation :

export const createEvaluation = async (values: {
  title: string;
  sub_title?: string;
  status?: string;
  evaluation_type_id?: number;
  exam_section_id?: number;
}) => {
  try {
    const response = await axios.post(`/assignment/evaluations`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success("evaluation created successfully");
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to create evaluation");
  } catch (error: any) {
    console.error("Error creating evaluation:", error);
    toast.error(error.response?.data?.message || "Failed to create evaluation");
    throw error;
  }
};

export const updateEvaluation = async (values: {
  form_id: number;
  title: string;
  sub_title?: string;
  status?: string;
  number_of_questions?: number;
  duration_in_minutes?: number;
  evaluation_type_id?: number;
  exam_section_id?: number;
  image?: string;
  exam_config?: {
    condition_exams_id?: string;
    time_exam?: string;
    view_results?: string;
    language?: string;
    date_view?: string;
    count_questions_page?: number;
    time_questions_page?: string;
    required_page_next?: boolean;
    count_return_exam?: number;
    view_answer?: string;
    start_date?: Date;
    end_date?: Date;
  };
  start_form?: {
    title?: string;
    sub_title?: string;
    description?: string;
    image?: string;
    show_configration?: number;
    show_condition?: number;
  };
  end_form?: {
    title?: string;
    sub_title?: string;
    description?: string;
    url?: string;
    image?: string;
  };
  exam_condition?: {
    condition_exams_id?: number[];
  };
}) => {
  try {
    const formData = new FormData();

    formData.append("form_id", values.form_id.toString());
    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title || "");
    formData.append("status", values.status || "");
    formData.append(
      "number_of_questions",
      values.number_of_questions?.toString() || ""
    );
    formData.append(
      "duration_in_minutes",
      values.duration_in_minutes?.toString() || ""
    );
    formData.append(
      "evaluation_type_id",
      values.evaluation_type_id?.toString() || ""
    );
    formData.append(
      "exam_section_id",
      values.exam_section_id?.toString() || ""
    );

    if (values.exam_config) {
      formData.append(
        "exam_config[count_questions_page]",
        values.exam_config.count_questions_page?.toString() || ""
      );
      formData.append(
        "exam_config[count_return_exam]",
        values.exam_config.count_return_exam?.toString() || ""
      );
      formData.append(
        "exam_config[view_answer]",
        values.exam_config.view_answer?.toString() || ""
      );
      formData.append(
        "exam_config[view_results]",
        values.exam_config.view_results || ""
      );
      formData.append(
        "exam_config[language]",
        values.exam_config.language || ""
      );
      if (values.exam_config.start_date)
        formData.append(
          "exam_config[start_date]",
          values.exam_config.start_date.toString()
        );
      if (values.exam_config.end_date)
        formData.append(
          "exam_config[end_date]",
          values.exam_config.end_date.toString()
        );
    }

    if (values.start_form?.image) {
      formData.append("start_form[image]", values.start_form.image);
    }

    if (values.end_form?.image) {
      formData.append("end_form[image]", values.end_form.image);
    }

    formData.append("start_form[title]", values.start_form?.title || "");
    formData.append(
      "start_form[sub_title]",
      values.start_form?.sub_title || ""
    );
    formData.append(
      "start_form[description]",
      values.start_form?.description || ""
    );
    formData.append(
      "start_form[show_condition]",
      values.start_form?.show_condition ? "1" : "0"
    );
    formData.append(
      "start_form[show_configration]",
      values.start_form?.show_configration ? "1" : "0"
    );

    if (values.end_form) {
      formData.append("end_form[title]", values.end_form.title || "");
      formData.append("end_form[sub_title]", values.end_form.sub_title || "");
      formData.append(
        "end_form[description]",
        values.end_form.description || ""
      );
      formData.append("end_form[url]", values.end_form.url || "");
    }

    // Handle exam_condition if exists
    if (values.exam_condition?.condition_exams_id?.length) {
      formData.append(
        "exam_condition[condition_exams_id]",
        JSON.stringify(values.exam_condition.condition_exams_id)
      );
    }

    // Send the form data to the server
    const response = await axios.post(
      `/evaluation/evaluations/update-all`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success("Exam updated successfully");
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to update exam");
  } catch (error: any) {
    console.error("Error updating exam:", error);
    toast.error(error.response?.data?.message || "Failed to update exam");
    throw error;
  }
};
export const fetchEvaluationById = async (id: number): Promise<Evaluation> => {
  try {
    return await get<Evaluation>(`/evaluations/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.details ||
      error.details ||
      "Failed to fetch evaluations";
    throw new Error(errorMessage);
  }
};
export const fetchEvaluationByUrl = async (
  url: string
): Promise<Evaluation> => {
  try {
    return await get<Evaluation>(`/evaluations/by-url/${url}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.details ||
      error.message ||
      "Failed to fetch evaluation";
    throw new Error(errorMessage);
  }
};

export const changeEvaluationStatus = async (id: number): Promise<void> => {
  try {
    const res = await axios.patch(
      `/evaluation/evaluations/${id}/toggle-status`,
      getAuthHeaders()
    );

    if (res.status === 200) {
      console.log("toggle");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const deleteEvaluation = async (id: number): Promise<void> => {
  try {
    const res = await axios.delete(
      `/evaluation/evaluations/${id}`,
      getAuthHeaders()
    );

    if (res.status === 200) {
      toast.success("Evalution  Deleted Successfully");
    }
  } catch (error: any) {
    console.error("Error:", error);
  }
};

export const fetchEvaluationTypes = async (): Promise<Type[]> => {
  try {
    return await get<Type[]>("/evaluation-types");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.details ||
      error.message ||
      "Failed to fetch evaluation-types";
    throw new Error(errorMessage);
  }
};

// export :
export const exportFile = async ({
  url,
  ids,
  from,
  to,
  fileName,
  format,
  singleFile = true,
}: {
  url: string;
  ids?: number[];
  from?: number;
  to?: number;
  fileName: string;
  format: string;
  singleFile?: boolean;
}) => {
  try {
    const validFormats = ["xlsx", "csv", "pdf", "docx"];
    if (!validFormats.includes(format)) {
      throw new Error(
        `Invalid format. Allowed types: ${validFormats.join(", ")}`
      );
    }

    // Convert range to array of IDs if needed
    const finalIds =
      ids ||
      (from !== undefined && to !== undefined
        ? Array.from({ length: to - from + 1 }, (_, i) => from + i)
        : undefined);

    const payload: Record<string, any> = {
      file_name: fileName,
      type: format,
    };

    if (finalIds && finalIds.length > 0) {
      if (singleFile) {
        // Export all as single file
        payload.ids = finalIds;
      } else {
        // Export multiple files (one per ID)
        for (const id of finalIds) {
          const singlePayload = {
            file_name: `${fileName}_${id}`,
            type: format,
            ids: [id],
          };

          const res = await axios.post(url, singlePayload, {
            headers: {
              ...getAuthHeaders("application/json").headers,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            responseType: "blob",
          });

          if (res.status === 200) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName}_${id}.${format}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        }
        toast.success(`${finalIds.length} files exported successfully`);
        return { success: true, count: finalIds.length };
      }
    } else {
      throw new Error("No IDs or valid range provided for export");
    }

    if (singleFile) {
      const res = await axios.post(url, payload, {
        headers: {
          ...getAuthHeaders("application/json").headers,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.${format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("File exported successfully");
        return res.data;
      }
    }
  } catch (error: any) {
    console.error("Export Error:", error);
    toast.error(error.response?.data?.message || "Failed to export file(s)");
    throw error;
  }
};

// questions:
export const getQuestions = async (values: {
  per_page: string;
  form_id: number;
}) => {
  try {
    const response = await axios.post(
      `/assignment/question-forms/get-questions-by-id`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to create evaluation");
  } catch (error: any) {
    console.error("Error creating evaluation:", error);
    toast.error(error.response?.data?.message || "Failed to create evaluation");
    throw error;
  }
};

// results page :
export const fetchResultById = async (id: number): Promise<UserResponse> => {
  try {
    return await get<UserResponse>(`/assignment-users/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};
export const fetchResultByIdNumber = async (id: any): Promise<UserResponse> => {
  try {
    return await get<UserResponse>(`/assignment-users/get-by-id-number/${id}`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};

export const fetchResultViewById = async (
  id: number
): Promise<ResultQuestionData[]> => {
  try {
    console.log(await get<ResultQuestionData[]>(`/answers/17/correctness`));
    return await get<ResultQuestionData[]>(`/answers/17/correctness`);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};
