import { getServerLanguage } from "@/app/(root)/[locale]/api/getServerLanguage";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  data: T;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  let language = getServerLanguage();
  if (typeof window === "undefined") {
    language = getServerLanguage();
  } else {
    language = getServerLanguage();
  }

  config.headers["Accept-Language"] = language === "ar" ? "ar" : "en";

  return config;
});

const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.get(url, {
      ...config,
      params: {
        ...config?.params,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await apiClient.post(
      url,
      data,
      config
    );
    return response.data.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export { get, post };
