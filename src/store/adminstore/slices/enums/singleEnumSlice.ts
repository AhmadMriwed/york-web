import { SingleEnumState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleEnum = createAsyncThunk(
   "singleEnum/getSingleEnum",
   async (url: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(url);
         console.log(res, "enum get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const singleEnum = createSlice({
   name: "singleEnum",
   initialState: {
      isLoading: false,
      error: null,
      singleEnum: {
         id: 0,
         description: "",
         hint: "",
         image: "",
         name: "",
         title: "",
         type: "",
      },
   } as SingleEnumState,

   reducers: {},
   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getSingleEnum.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleEnum.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.singleEnum = action.payload;

         console.log("enums", action.payload);
      });
      builder.addCase(getSingleEnum.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default singleEnum.reducer;
