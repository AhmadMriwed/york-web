import { UserResponse } from "@/types/adminTypes/assignments/examTypes";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "universal-cookie";
const cookies = new Cookies();
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
    const response = await axios.get(`/assignment/exam-files`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const response = await axios.post(`/assignment/answers`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
  form_id: number,
  pageNumber?: number
) => {
  const payload = {
    form_id: form_id,
  };
  try {
    const response = await axios.post(
      `/assignment/question-forms/get-questions-by-id?page=${pageNumber}`,
      payload,
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

export const assignUser = async (
  values: any,
  headers: Record<string, string>
) => {
  try {
    const response = await axios.post(`/assignment/assignment-users`, values, {
      headers: headers,
    });
    if (headers.password !== null) {
      cookies.set("exam_user_password", headers.password);
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const getUserById = async (
  user_id: number,
  id_number: any,
  form_id: number
) => {
  try {
    const password = cookies.get("exam_user_password");
    const response = await axios.get(
      `/assignment/assignment-users/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(password && { password: password }),
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

export const getGradeAfterCreate = async (user_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/answers/calculate-grade/${user_id}`,
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
export const submitRating = async (data: {
  assignment_user_id: number;
  rating: number;
  comment?: string;
}) => {
  try {
    const response = await axios.post("/assignment/form-ratings", data);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getQuestions = async (form_id: number) => {
  const payload = {
    form_id: form_id,
  };
  try {
    const response = await axios.post(
      `/assignment/question-forms/get-questions-by-id`,
      payload,
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

// start assignment :
export const startAssignment = async (
  user_id: number,
  headers: Record<string, string> = {}
) => {
  try {
    console.log("headers", headers);
    console.log("user_id", user_id);
    const response = await axios.get(
      `/assignment/assignment-users/start-assignment/${user_id}`,
      { headers }
    );

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to start assignment");
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const enhancedError = new Error(
        error.response?.data?.message || "Failed to start assignment"
      );
      // enhancedError.response = error.response;
      throw enhancedError;
    }
    throw error;
  }
};
export const getSolution = async (user_id: number) => {
  try {
    const response = await axios.get(`/assignment/answers/${user_id}/full`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    }

    throw new Error(response.data?.message || "Failed to start assignment");
  } catch (error: any) {
    console.log("error");
  }
};

export const fetchStartFormFiles = async (start_form_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/start-form-files/${start_form_id}/files`,
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

export const checkIfUserIsFinish = async (
  user_id: number,
  form_id: number,
  id_number: any
) => {
  try {
    const userPassword = await cookies.get("exam_user_password");
    console.log(user_id, form_id, id_number, userPassword);
    const response = await axios.get(
      `/assignment/assignment-users/check-user-finish/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(userPassword && { password: userPassword }),
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
export const getTimers = async (
  user_id: number,
  form_id: number,
  id_number: any
) => {
  try {
    const userPassword = cookies.get("exam_user_password");
    const response = await axios.get(
      `/assignment/assignment-users/${user_id}/remaining-time`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(userPassword && { password: userPassword }),
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

export const fetchResultById = async (
  user_id: number,
  id_number: any,
  form_id: number
) => {
  try {
    const userPassword = cookies.get("exam_user_password");
    const response = await axios.get(
      `/assignment/assignment-users/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(userPassword && { password: userPassword }),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};

export const assignUserForTrainerEvaluation = async (
  values: any,
  headers: Record<string, string>
) => {
  try {
    const response = await axios.post(`/assignment/assignment-users`, values, {
      headers: headers,
    });
    if (headers.password !== null) {
      cookies.set("trainer_evaluation_user_password", headers.password);
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const checkIfUserIsFinishForTrainerEvaluation = async (
  user_id: number,
  form_id: number,
  id_number: any
) => {
  try {
    const userPassword = await cookies.get("trainer_evaluation_user_password");
    console.log(user_id, form_id, id_number, userPassword);
    const response = await axios.get(
      `/assignment/assignment-users/check-user-finish/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(userPassword && { password: userPassword }),
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

export const getUserByIdForTrainerEvaluation = async (
  user_id: number,
  id_number: any,
  form_id: number
) => {
  try {
    const password = cookies.get("trainer_evaluation_user_password");
    const response = await axios.get(
      `/assignment/assignment-users/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(password && { password: password }),
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

export const fetchResultByIdNumberForEvaluation = async (
  user_id: number,
  id_number: any,
  form_id: number
) => {
  try {
    const userPassword = cookies.get("trainer_evaluation_user_password");
    const response = await axios.get(
      `/assignment/assignment-users/${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          id_number: id_number,
          form_id: form_id,
          ...(userPassword && { password: userPassword }),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch end form";
    throw new Error(errorMessage);
  }
};
