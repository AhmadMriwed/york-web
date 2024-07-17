import { PermissionsState } from "@/types/adminTypes/accounts/accountsTypes";
import { statisticsState } from "@/types/adminTypes/statistics/statisticsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getStatistics = createAsyncThunk(
   "statistics/getStatistics",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get("admin/statistics");
         console.log(res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const statistics = createSlice({
   name: "statistics",
   initialState: {
      isLoading: false,
      error: null,
      statistics: {},
   } as statisticsState,

   reducers: {},

   extraReducers: (builder) => {
      // get all statisitics
      builder.addCase(getStatistics.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getStatistics.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.statistics = action.payload;
      });
      builder.addCase(getStatistics.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default statistics.reducer;
