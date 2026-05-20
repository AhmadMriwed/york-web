import { getAuthHeaders } from "@/store/adminstore/slices/enums/authHeaders";
import axios from "axios";
import { toast } from "sonner";
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

export const deletedQuestions = async (ids: number[]) => {
  try {
    console.log(ids);
    const response = await axios.delete(
      "/assignment/question-forms/bulk-destroy",
      {
        data: { ids: ids },
        headers: {
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

export const fetchEvaluationById = async (evaluation_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/evaluations/${evaluation_id}`,
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
export const deleteStartForm = async (form_id: number) => {
  try {
    console.log(form_id);
    const response = await axios.delete(`/assignment/start-forms/${form_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
export const deleteEndForm = async (form_id: number) => {
  try {
    console.log(form_id);
    const response = await axios.delete(`/assignment/end-forms/${form_id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const getEvaluationUsers = async (evaluation_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/evaluations/${evaluation_id}/assignment-users`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};
export const getEvaluationByUrl = async (url: string) => {
  try {
    const response = await axios.get(`/assignment/evaluations/by-url/${url}`, {
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

export const markAllEvaluationQuestions = async (
  values: any,
  evaluation_id: number
) => {
  try {
    const response = await axios.post(
      `/assignment/evaluations/${evaluation_id}/update-question-grades`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log;
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update grading settings";
      console.error("API Error:", errorMessage, error.response?.data);
      throw new Error(errorMessage);
    }
    console.error("Unexpected error:", error);
    throw new Error(
      "An unexpected error occurred while updating grading settings"
    );
  }
};

export const getResultView = async (user_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/answers/${user_id}/correctness`,
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

export const getTrainees = async (id: number) => {
  try {
    const response = await axios.get(
      `/assignment/rated-assignment-user/${id}/get-by-exam-section`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

interface StudentData {
  id_number: string;
  first_name: string;
  last_name: string;
  email: string;
  exam_section_id: number;
}

export const addNewStudent = async (studentData: StudentData): Promise<any> => {
  try {
    const response = await axios.post(
      "/assignment/rated-assignment-user",
      studentData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      data: response.data,
      message: "Student added successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to add new student";
      console.error("API Error:", errorMessage, error.response?.data);
      throw new Error(errorMessage);
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while adding the student");
  }
};

//generate url for trainer :

export const generateUrlForTrainer = async (
  evaluation_id: number,
  trainerData: {
    id_number: string;
    password: string;
    exam_section_id: number;
  }
): Promise<any> => {
  try {
    const response = await axios.post(
      `/assignment/evaluation-trainers/${evaluation_id}`,
      trainerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      data: response.data,
      message: "Student added successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to add new student";
      console.error("API Error:", errorMessage, error.response?.data);
      throw new Error(errorMessage);
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while adding the student");
  }
};
/// trainer login :
export const loginTrainer = async (
  evaluation_id: number,
  trainerData: {
    id_number: string;
    password: string;
  }
): Promise<any> => {
  try {
    const response = await axios.post(
      `/assignment/evaluation-trainers/${evaluation_id}/trainer-login`,
      trainerData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    cookie.set("trainer_password_for_evaluate_trainee", trainerData.password);

    return {
      data: response.data,
      message: "trainer login successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed";
      console.error("API Error:", errorMessage, error.response?.data);
      throw new Error(errorMessage);
    }
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred while login");
  }
};

// get trainee id for evaluation :
export const startTraineeEvaluation = async (
  evaluation_id: number,
  assignment_user_id: number
) => {
  try {
    const response = await axios.get(
      `/assignment/evaluation-trainers/${evaluation_id}/rate/${assignment_user_id}`,
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
export const getTraineeId = async (assignment_user_id: number) => {
  try {
    const response = await axios.get(
      `/assignment/rated-assignment-user/${assignment_user_id}`,
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

export const getTraineeById = async (
  user_id: number,
  id_number: any,
  form_id: number
) => {
  try {
    const password = cookie.get("trainer_password_for_evaluate_trainee");
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
