import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
let adminToken = cookie.get("admin_token");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    // Authorization: `Bearer 78|3PzjMYbKuGOdZ8HNQGHprPwp1lPyQEP6xlLkdAGK4f63e1cc`,
    Authorization: `Bearer ${adminToken}`,
  },
});

export const UserAxios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer 78|3PzjMYbKuGOdZ8HNQGHprPwp1lPyQEP6xlLkdAGK4f63e1cc`,
  },
});
