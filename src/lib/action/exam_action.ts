import axios from "axios";


        export const fetchAssignmentById = async (
          assignment_id: number
        )=> {
          try {
            
            const response  =  await axios.get(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/exams/${assignment_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
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

        export const updateExamSettings = async (
          formData: any, assignment_id: number
        )=> {
          try {
            // console.log("FormData entries:");
            // for (const [key, value] of formData.entries()) {
            //   console.log(key, value);
            // }
            console.log(formData);
            console.log(assignment_id);
            const response =  await axios.put(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/config-exams/${assignment_id}`, formData, {
                headers: {
                  'Content-Type': 'application/json',
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




        export const createQuestion = async (
          formData: any
        )=> {
          try {
            console.log(formData);

            const response =  await axios.post(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/question-forms`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
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
        export const updateQuestion = async (
          formData: any
        )=> {
          try {
            console.log(formData);

            const response =  await axios.post(`${process.env.NEXT_PUBLIC_ASSIGNMENT_URL}/question-forms`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
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