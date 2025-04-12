import { TraineesState } from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTrainees = createAsyncThunk(
   "trainees/getTrainees",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");

         const res = await Axios.get(
            "/accounts/byType?account_type=Trainee"
         );
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta.per_page,
               total: res.data.meta.total,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getSingleTrainees = createAsyncThunk(
   "trainees/getSingleTrainees",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`admin/trainees/${id}`);
         console.log(res, "trainees get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createTrainee = createAsyncThunk(
   "trainees/createTrainee",

   async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/trainees`, data);
         console.log(res, "trainees insert");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const deleteTrainee = createAsyncThunk(
   "trainees/deleteTrainee",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/trainees/${id}`);
         console.log(res, "trainees delete");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
         // return { message: "success", id };
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const trainees = createSlice({
   name: "trainees",
   initialState: {
      isLoading: false,
      operationLoading: false,
      error: null,
      perPage: 10,
      total: 1,
      trainees: [],
      singleTrainee: "",
   } as TraineesState,

   reducers: {},

   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getTrainees.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getTrainees.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainees = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getTrainees.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get single role

      builder.addCase(getSingleTrainees.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleTrainees.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         console.log(action.payload, "load");
         state.singleTrainee = action.payload;
      });
      builder.addCase(getSingleTrainees.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a role

      builder.addCase(createTrainee.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createTrainee.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.trainees.push(action.payload);
      });
      builder.addCase(createTrainee.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
      });
      // delete role
      builder.addCase(deleteTrainee.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteTrainee.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.trainees = state.trainees.filter(
            (trainee) => trainee.id !== action.payload.id
         );
      });
      builder.addCase(deleteTrainee.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
      });
   },
});

export default trainees.reducer;
