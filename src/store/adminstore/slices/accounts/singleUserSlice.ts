import { SingleUserState } from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleUser = createAsyncThunk(
   "singleUser/getSingleUser",
   async (url: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(url);
         console.log(res, "users get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message);
      }
   }
);

const singleUser = createSlice({
   name: "singleUser",
   initialState: {
      isLoading: false,
      error: null,
      operationError: null,
      status: false,
      singleUser: {},
   } as SingleUserState,

   reducers: {
      completedSingleUserOperation: (state) => {
         state.status = false;
         state.error = null ;
         state.operationError = null;
      },
   },
   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getSingleUser.pending, (state) => {
         state.error = null;
         state.isLoading = true;
         state.operationError = null;
      });
      builder.addCase(getSingleUser.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.singleUser = action.payload;
         state.status = true;
         state.operationError = null;
         console.log("users", action.payload);
      });
      builder.addCase(getSingleUser.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
         state.operationError = action.payload;
         state.status = false;
      });
   },
});

export const { completedSingleUserOperation } = singleUser.actions;

export default singleUser.reducer;
