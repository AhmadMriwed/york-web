import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("login/get", async () => { 
    return  await axios.get("")
    .then((res) => res.data);
  });

  // export const addNewCourse = createAsyncThunk(
  //   "courses/add",
  //   async (data) => {
  //     return await axiosInstance.post("https://mar-services.onrender.com/courses", data).then((res) => {
  //       return res.data;
  //     });
  //   }
  // );