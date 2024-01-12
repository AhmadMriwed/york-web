import axios from "axios";
import { baseURL } from "./api";
import Cookie from "universal-cookie";

const cookie = new Cookie();
// const token = cookie.get("");

export const Axios = axios.create({
   baseURL: baseURL,
   headers: {
      Authorization: `Bearer 2|Ny4IIA3LqYFV7KudK2v7yAIx8OhxkdmozKL52Hx49c973274`,
   },
});
