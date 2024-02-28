import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
// const token = cookie.get("");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer 8|vo1rULsHKY0HLmXuAMtoBIOjF2WSZRGihrumzZtj520d1bae`,
    // Cookie: "cookiesession1=678B28FFUVWXYZABCDFGHIJKLMNO80B0",
  },
});
