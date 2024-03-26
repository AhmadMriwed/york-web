import { TrainerTypesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTrainerTypes = createAsyncThunk(
   "trainerTypes/getTrainerTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `admin/training_sessions_type?page=${activePage}&term=${term}`
         );

         console.log("res trainer types", res);
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta?.per_page || 10,
               total: res.data.meta?.total || 0,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createTrainerType = createAsyncThunk(
   "trainerTypes/createTrainerType",
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/training_sessions_type`, data);

         console.log("res trainer type created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const updateTrainerType = createAsyncThunk(
   "trainerTypes/updateTrainerType",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(
            `admin/training_sessions_type/${enumId}`,
            formData
         );

         console.log("res categ updated", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteTrainerType = createAsyncThunk(
   "trainerTypes/deleteTrainerType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(
            `admin/training_sessions_type/${enumId}`
         );

         console.log("res venu delete", res);
         if (res.status === 200) {
            return { data: res.data, enumId };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const trainerTypes = createSlice({
   name: "trainerTypes",
   initialState: {
      isLoading: false,
      operationLoading: false,
      status: false,
      error: null,
      perPage: 10,
      total: 1,
      trainerTypes: [],
   } as TrainerTypesState,

   reducers: {
      completedTrainerTypeOperation: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getTrainerTypes.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getTrainerTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainerTypes = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getTrainerTypes.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // create an exam type

      builder.addCase(createTrainerType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createTrainerType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.trainerTypes.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createTrainerType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // update a trainer type
      builder.addCase(updateTrainerType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateTrainerType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         // state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(updateTrainerType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete category
      builder.addCase(deleteTrainerType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteTrainerType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         console.log("delete", action.payload.enumId);
         state.trainerTypes = state.trainerTypes.filter(
            (trainerType) => trainerType.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteTrainerType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedTrainerTypeOperation } = trainerTypes.actions;

export default trainerTypes.reducer;
