import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
}

// Create a centralized Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json", 
  },
});

// Helper function for GET requests
const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, config);
    return response.data.data; 
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error; 
  }
};

// Helper function for POST requests
const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(url, data, config);
    return response.data.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error; 
  }
};

export { get, post };