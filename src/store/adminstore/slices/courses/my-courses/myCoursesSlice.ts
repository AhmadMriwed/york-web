import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { myCoursesState } from "@/types/adminTypes/courses/coursesTypes";

// get my courses
export const getMyCourses = createAsyncThunk(
  "myCourses/getMyCourses",
  async (status: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/course/getMyCourses?status=${status}`);
      if (res.status === 200) {
        console.log("success my courses");
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
