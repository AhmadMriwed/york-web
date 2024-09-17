import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const Axios = axios.create({
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

export const UserAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer 78|3PzjMYbKuGOdZ8HNQGHprPwp1lPyQEP6xlLkdAGK4f63e1cc`,
  },
});
