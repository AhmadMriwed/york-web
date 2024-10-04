import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const Axios = axios.create({
  baseURL: baseURL,
});

export const TrainerAxios = axios.create({
  baseURL: baseURL,
});

export const UserAxios = axios.create({
  baseURL: baseURL,
});

Axios.interceptors.request.use(
  (config) => {
    const adminToken = cookie.get("admin_token");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

TrainerAxios.interceptors.request.use(
  (config) => {
    const trainerToken = cookie.get("trainer_token");
    if (trainerToken) {
      config.headers.Authorization = `Bearer ${trainerToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
