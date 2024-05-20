import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
let token = cookie.get("admin_token");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    // Cookie: "cookiesession1=678B28FFUVWXYZABCDFGHIJKLMNO80B0",
  },
});
