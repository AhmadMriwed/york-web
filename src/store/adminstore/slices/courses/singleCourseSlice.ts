import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { singleCourseState } from "@/types/adminTypes/courses/coursesTypes";
import { Axios } from "@/utils/axios";

// get course by id
export const getCourseInfo = createAsyncThunk(
  "courses/getCourseInfo",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/course/${id}`);
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

const singleCourse = createSlice({
  name: "singleCourse",

  initialState: {
    isLoading: false,
    error: null,
    courseInfo: null,
  } as singleCourseState,

  reducers: {},

  extraReducers: (builder) => {
    // get single course
    builder
      .addCase(getCourseInfo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseInfo.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseInfo = action.payload.data;
      })
      .addCase(getCourseInfo.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default singleCourse.reducer;
