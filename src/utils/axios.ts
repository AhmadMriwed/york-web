import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
let token = cookie.get("admin_token");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer 84|GVy5Q2HktaIFaqxudjCP3vusS8QnGOIcphStjv0U59273e4c`,
    // Cookie: "cookiesession1=678B28FFUVWXYZABCDFGHIJKLMNO80B0",
  },
});
