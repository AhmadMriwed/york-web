import { couresesAdsState } from "@/types/userTypes/courses/coursesTypes";
import { UserAxios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCoursesAdsByFilteration = createAsyncThunk(
   "coursesAds/getAllCoursesAdsByFilteration",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try to get all courses-ads");

         const res = await UserAxios.post(`user/course_ads`, {
            // something
         });
         console.log(res, "courses-ads");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const getCourseFilters = createAsyncThunk(
   "coursesAds/getCourseFilters",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try to get all courses-ads");

         const res = await UserAxios.get(
            `user/course_ads/getMap/filterCourse`,
            {
               // something
            }
         );
         console.log(res, "courses-getCourseFilters");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

const coursesAds = createSlice({
   name: "coursesAds",
   initialState: {
      isLoading: false,
      error: null,
      coursesAds: [],
      filterCourse: {
         language: [],
         venues: [],
         categories: [],
      },
   } as couresesAdsState,

   reducers: {},

   extraReducers: (builder) => {
      // get all coursesAds
      builder.addCase(getAllCoursesAdsByFilteration.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(
         getAllCoursesAdsByFilteration.fulfilled,
         (state, action: any) => {
            state.error = null;
            state.isLoading = false;
            state.coursesAds = action.payload;
         }
      );
      builder.addCase(
         getAllCoursesAdsByFilteration.rejected,
         (state, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
         }
      );
      // get all filter
      builder.addCase(getCourseFilters.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getCourseFilters.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.filterCourse = action.payload;
      });
      builder.addCase(getCourseFilters.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default coursesAds.reducer;
