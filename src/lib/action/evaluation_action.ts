import { getAuthHeaders } from "@/store/adminstore/slices/enums/authHeaders";
import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

export const getQuestions = async () => {
  try {
    const response = await axios.get(
      `/assignment/question-forms`,
      getAuthHeaders()
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


export const deleteQuestion = async (id: number) => {
    try {
      const response = await axios.delete(
        `/assignment/question-forms/${id}`,
        getAuthHeaders()
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

  
  export const deletedQuestions= async (ids: number[]) => {
    try {
     
      console.log(ids);
      const response = await axios.delete(
        '/assignment/question-forms/bulk-destroy',
        {
          data: { "ids": ids }, 
          headers: {
            'Content-Type': 'application/json' 
          }
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

  export const fetchEvaluationById = async (evaluation_id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/evaluations/${evaluation_id}`,
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
  export const updateEvaluationSettings = async (
    formData: any,
    evaluation_id: number
  ) => {
    try {
      console.log(formData);
      console.log(evaluation_id);
      const response = await axios.put(
        `/assignment/config-exams/${evaluation_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`,
            "Content-Type": "application/json",
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
  export const changeEvaluationStatus = async (evaluation_id: number) => {
    try {
      console.log(cookie.get("admin_token"));
      console.log(process.env.NEXT_PUBLIC_ASSIGNMENT_URL);
      const response = await axios.patch(
        `/assignment/evaluations/${evaluation_id}/toggle-status`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`,
            "Content-Type": "application/json",
            "accept-language": "en",
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
  
  export const deleteEvaluation = async (evaluation_id: number) => {
    try {
      console.log(evaluation_id);
      const response = await axios.delete(
        `/assignment/evaluations/${evaluation_id}`,
        getAuthHeaders()
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
  export const deleteStartForm = async ( form_id: number) => {
    try {
  
      console.log(form_id);
      const response = await axios.delete(
        `/assignment/start-forms/${form_id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Unknown error");
      }
      throw new Error("Unexpected error");
    }
  };
  export const deleteEndForm = async ( form_id: number) => {
    try {
  
      console.log(form_id);
      const response = await axios.delete(
        `/assignment/end-forms/${form_id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Unknown error");
      }
      throw new Error("Unexpected error");
    }
  };

  export const generateUrl = async (evaluation_id: number) => {
    try {
      console.log(cookie.get("admin_token"));
      console.log(process.env.NEXT_PUBLIC_ASSIGNMENT_URL);
      const response = await axios.post(
        `/assignment/evaluations/${evaluation_id}/generate-url`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`,
            "Content-Type": "application/json",
            "accept-language": "en",
          },
        }
      );
  
      console.log(response.data);
      return response;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Unknown error");
      }
      throw new Error("Unexpected error");
    }
  };