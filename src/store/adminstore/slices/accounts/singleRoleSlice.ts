import {
   SingleRoleState,
   SingleUserState,
} from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleRole = createAsyncThunk(
   "singleRole/getSingleRole",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`admin/roles/${id}`);
         console.log(res, "roles get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);
const singleRole = createSlice({
   name: "singleRole",
   initialState: {
      isLoading: false,
      error: null,
      status: false,
      singleRole: {},
   } as SingleRoleState,

   reducers: {},

   extraReducers: (builder) => {
      // get single Roles
      builder.addCase(getSingleRole.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.singleRole = action.payload;
         state.status = true;
      });
      builder.addCase(getSingleRole.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default singleRole.reducer;
