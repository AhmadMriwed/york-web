import { ExamTypesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getExamTypes = createAsyncThunk(
   "examTypes/getExamTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `admin/examtype?page=${activePage}&term=${term}`
         );

         console.log("res exam types", res);
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

export const createExamType = createAsyncThunk(
   "examTypes/createExamType",
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/examtype`, data);

         console.log("res exam type created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return error.response
            ? rejectWithValue(error.response.data.message)
            : rejectWithValue(error.message);
      }
   }
);

export const updateExamType = createAsyncThunk(
   "examTypes/updateExamType",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`admin/examtype/${enumId}`, formData);

         console.log("res exam updated", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteExamType = createAsyncThunk(
   "examTypes/deleteExamType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/examtype/${enumId}`);

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

const examTypes = createSlice({
   name: "examTypes",
   initialState: {
      isLoading: false,
      operationLoading: false,
      status: false,
      perPage: 10,
      total: 1,
      error: null,
      examTypes: [],
   } as ExamTypesState,

   reducers: {
      completedExamTypeOperation: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getExamTypes.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getExamTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.examTypes = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getExamTypes.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // create an exam type

      builder.addCase(createExamType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createExamType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.examTypes.unshift(action.payload);
         console.log("fulfilled", action.payload);
         state.status = true;
      });
      builder.addCase(createExamType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
         console.log("rejec", action.payload);
      });

      // update an exam type
      builder.addCase(updateExamType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateExamType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         // state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(updateExamType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete category
      builder.addCase(deleteExamType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteExamType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.examTypes = state.examTypes.filter(
            (examType) => examType.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteExamType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedExamTypeOperation } = examTypes.actions;

export default examTypes.reducer;
