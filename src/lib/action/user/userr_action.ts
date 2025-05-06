import axios from "axios";
import { toast } from "sonner";

export const fetchAssignmentById = async (assignment_id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exams/${assignment_id}`,
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
  


export const fetchExamFiles = async () => {
    try {
      const response = await axios.get(
        `/assignment/exam-files`,
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

  export const createAnswer = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post(
        `/assignment/answers`,
        values,
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



  export const getQuestionsByFormId = async (
    form_id: number
  ) => {
    const payload = {
      form_id: form_id
    }
    try {
      const response = await axios.post(`/assignment/question-forms/get-questions-by-id`, payload, {
        headers: {
         "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
      
      throw new Error(response.data?.message ||  "Failed to create evaluation");
      
    } catch (error: any) {
      console.error("Error creating evaluation:", error);
      toast.error(error.response?.data?.message || "Failed to create evaluation");
      throw error;
    }
  };

  export const assignUser = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post(
        `/assignment/assignment-users`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('create');
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Unknown error");
      }
      throw new Error("Unexpected error");
    }
  };

  export const getUserById = async (user_id: number) => {
    try {
      const response = await axios.get(`/assignment/assignment-users/${user_id}`, {
        headers: {
         "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
      
      throw new Error(response.data?.message ||  "Failed to create evaluation");
      
    } catch (error: any) {
      console.error("Error creating evaluation:", error);
      toast.error(error.response?.data?.message || "Failed to create evaluation");
      throw error;
    }
  };

  export const getGradeAfterCreate = async (user_id: number) => {
    try {
      const response = await axios.get(`/assignment/answers/calculate-grade/${user_id}`, {
        headers: {
         "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
      
      throw new Error(response.data?.message ||  "Failed to create evaluation");
      
    } catch (error: any) {
      console.error("Error creating evaluation:", error);
      toast.error(error.response?.data?.message || "Failed to create evaluation");
      throw error;
    }
  };