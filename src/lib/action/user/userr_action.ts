import axios from "axios";

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