import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
let adminToken = cookie.get("admin_token");

export const Axios = axios.create({
   baseURL: baseURL,
   headers: {
      Authorization: `Bearer ${adminToken??`95|yCBQDLEOZguiKQi5AIfFPcJv2GWLJRhsToxInnGa31d14d0d`}`,
   },
});

export const UserAxios = axios.create({
   baseURL: baseURL,
   headers: {
      Authorization: `Bearer 95|yCBQDLEOZguiKQi5AIfFPcJv2GWLJRhsToxInnGa31d14d0d`,
   },
});
