import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myCoursesState } from "@/types/adminTypes/courses/coursesTypes";
import axios from "axios";
import Cookie from "universal-cookie";

 const cookie = new Cookie();
 



// get my courses
export const getMyCourses = createAsyncThunk(
  "myCourses/getMyCourses",
  async (status: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`admin/course/getMyCourses?status=${status}`,{
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`,
            "Content-Type": "multipart/form-data",
          },
      });
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const myCourses = createSlice({
  name: "myCourses",

  initialState: {
    isLoading: false,
    error: null,
    myCourses: [],
  } as myCoursesState,

  reducers: {},

  extraReducers: (builder) => {
    // get my courses
    builder
      .addCase(getMyCourses.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getMyCourses.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.myCourses = action.payload.data;
      })
      .addCase(getMyCourses.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default myCourses.reducer;
