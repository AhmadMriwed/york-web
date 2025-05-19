import { getAuthHeaders } from "@/store/adminstore/slices/enums/authHeaders";
import axios from "axios";
import { toast } from "sonner";
import Cookie from "universal-cookie";

const cookie = new Cookie();

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

export const updateExamSettings = async (
  formData: any,
  assignment_id: number
) => {
  try {
    // console.log("FormData entries:");
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    console.log(formData);
    console.log(assignment_id);
    const response = await axios.put(
      `/assignment/config-exams/${assignment_id}`,
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

export const changeExamStatus = async (assignment_id: number) => {
  try {
    console.log(cookie.get("admin_token"));
    console.log(process.env.NEXT_PUBLIC_ASSIGNMENT_URL);
    const response = await axios.patch(
      `/assignment/exams/${assignment_id}/toggle-status`,
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
export const generateUrl = async (assignment_id: number) => {
  try {
    console.log(cookie.get("admin_token"));
    console.log(process.env.NEXT_PUBLIC_ASSIGNMENT_URL);
    const response = await axios.post(
      `/assignment/exams/${assignment_id}/generate-url`,
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

export const deleteExam = async (assignment_id: number) => {
  try {
    console.log(assignment_id);
    const response = await axios.delete(
      `/assignment/exams/${assignment_id}`,
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

export const createQuestion = async (formData: any) => {
  try {
    console.log(formData);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/question-forms`,
      formData,
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
export const updateQuestion = async (formData: any, form_id: number) => {
  try {
    console.log(formData);
    console.log(form_id);
    const response = await axios.post(
      `/assignment/question-forms/${form_id}`,
      formData,
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
export const deletedQuestionOptions = async (deletedIds: any) => {
  try {
    console.log(deletedIds);
    const response = await axios.delete(
      "/assignment/question-fields/bulk-destroy",
      {
        data: { ids: deletedIds }, // Axios DELETE payload needs to be in config.data
        headers: {
          "Content-Type": "application/json", // Explicit content type
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

export const getStartInterface = async (start_interface_id: number) => {
  try {
    console.log(start_interface_id);
    const response = await axios.get(
      `/assignment/start-forms/${start_interface_id}`,
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
export const getEndInterface = async (end_interface_id: number) => {
  try {
    console.log(end_interface_id);
    const response = await axios.get(
      `/assignment/end-forms/${end_interface_id}`,
      getAuthHeaders()
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

export const uploadFileToStartForm = async (formId: number, file: File) => {
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
    return response;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const deleteFileToStartForm = async (formId: number, file: File) => {
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
    return response;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const updateStartInterface = async (formId: number, values: any) => {
  try {
    console.log(values);
    const response = await axios.post(
      `/assignment/start-forms/${formId}`,
      values,
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

export const updateEndInterface = async (formId: number, values: any) => {
  try {
    console.log(values);
    const response = await axios.post(
      `/assignment/end-forms/${formId}`,
      values,
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

export const uploadFileToEndForm = async (formId: number, file: File) => {
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
    return response;
  } catch (error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Unknown error");
    }
    throw new Error("Unexpected error");
  }
};

export const getQuestionById = async (question_id: number) => {
  try {
    console.log(question_id);
    const response = await axios.get(
      `/assignment/question-forms/${question_id}`,
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
export const addExamMessages = async (formData: any) => {
  try {
    console.log(formData);

    const response = await axios.post(`/assignment/exam-messages`, formData, {
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
export const updateExamMessages = async (formData: any, messageId: number) => {
  try {
    console.log(formData);

    const response = await axios.put(
      `/assignment/exam-messages/${messageId}`,
      formData,
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

export const deletedQuestionCorrectAnswers = async (deletedIds: any) => {
  try {
    console.log(deletedIds);
    const response = await axios.delete(
      "/assignment/correct-answers/bulk-destroy",
      {
        data: { ids: deletedIds }, // Axios DELETE payload needs to be in config.data
        headers: {
          "Content-Type": "application/json", // Explicit content type
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

export const getSectionById = async (id: number) => {
  try {
    const response = await axios.get(
      `/assignment/exam-sections/${id}`,
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

export const fetchRequirmentFieldsData = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/field-requirements`,
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

export const createStartFormF = async (values: any) => {
  try {
    console.log(values);
    const response = await axios.post(`/assignment/start-forms`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const createEndFormF = async (values: any) => {
  try {
    console.log(values);
    const response = await axios.post(`/assignment/end-forms`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

interface GradeSettings {
  correct_answer_grade: number;
  wrong_answer_grade: number;
}

export const markAll = async (
  values: GradeSettings,
  examId: number
): Promise<GradeSettings> => {
  try {
    const response = await axios.post<GradeSettings>(
      `/assignment/exams/${examId}/update-question-grades`,
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

export const createCategory = async (title: string) => {
  try {
    const payload = {
      title: title,
    };
    console.log(payload);
    const response = await axios.post(`/assignment/categories`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const exportExam = async ({
  id,
  fileName,
  type,
}: {
  id?: number;
  fileName: string;
  type: string;
}) => {
  try {
    const validFormats = ["xlsx", "csv", "pdf", "docx"];
    if (!validFormats.includes(type)) {
      throw new Error(
        `Invalid format. Allowed types: ${validFormats.join(", ")}`
      );
    }

    const payload: Record<string, any> = {
      file_name: fileName,
      type: type,
      id: id,
    };

    const res = await axios.post("/assignment/exams/export-exam", payload, {
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
      link.setAttribute("download", `${fileName}.${type}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("File exported successfully");
      return res.data;
    }
  } catch (error: any) {
    console.error("Export Error:", error);
    toast.error(error.response?.data?.message || "Failed to export file(s)");
    throw error;
  }
};
export const getQuestionTypes = async () => {
  try {
    const response = await axios.get(`/assignment/question-types`, {
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

export const deleteExamMessages = async (exam_messages_id: number) => {
  try {
    console.log(exam_messages_id);
    const response = await axios.delete(
      `/assignment/exam-messages/${exam_messages_id}/delete`,
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
