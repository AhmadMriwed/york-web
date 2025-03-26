// import axios from "axios";
// import { baseURL, baseURLL } from "./api";
// import Cookie from "universal-cookie";
// const cookie = new Cookie();

// export const Axios = axios.create({
//   baseURL: baseURLL,
// });
// export const TrainerAxios = axios.create({
//   baseURL: baseURL,
// });
// export const UserAxios = axios.create({
//   baseURL: baseURL,
// });
// Axios.interceptors.request.use(
//   (config) => {
//     const adminToken = cookie.get("admin_token");
//     if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// TrainerAxios.interceptors.request.use(
//   (config) => {
//     const trainerToken = cookie.get("trainer_token");
//     if (trainerToken) {
//       config.headers.Authorization = `Bearer ${trainerToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// UserAxios.interceptors.request.use(
//   (config) => {
//     const userToken = cookie.get("user_token");
//     if (userToken) {
//       config.headers.Authorization = `Bearer ${userToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

// استخدام المسارات المحلية بدلاً من المباشرة
const API_BASE_URLS = {
  admin: '/api/admin',
  trainer: '/api/trainer',
  user: '/api/user'
};

// إنشاء مثيلات axios
export const Axios = axios.create({
  baseURL: API_BASE_URLS.admin,
});

export const TrainerAxios = axios.create({
  baseURL: API_BASE_URLS.trainer,
});

export const UserAxios = axios.create({
  baseURL: API_BASE_URLS.user,
});

// دالة مساعدة لإعداد interceptors
const setupInterceptor = (instance:any, tokenKey:string) => {
  instance.interceptors.request.use(
    (config:any) => {
      const token = cookie.get(tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error:any) => Promise.reject(error)
  );
};

setupInterceptor(Axios, "admin_token");
setupInterceptor(TrainerAxios, "trainer_token");
setupInterceptor(UserAxios, "user_token");