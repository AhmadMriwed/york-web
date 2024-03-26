import { QuestionTypesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getQuestionTypes = createAsyncThunk(
   "questionTypes/getQuestionTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res =
            await Axios.get(`admin/questiontype?page=${activePage}&term=${term}
         `);

         console.log("res question types", res);
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

export const createQuestionType = createAsyncThunk(
   "questionTypes/createQuestionType",
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/questiontype`, data);

         console.log("res question type created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const updateQuestionType = createAsyncThunk(
   "questionTypes/updateQuestionType",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`admin/questiontype/${enumId}`, formData);

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

export const deleteQuestionType = createAsyncThunk(
   "questionTypes/deleteQuestionType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/questiontype/${enumId}`);

         console.log("res questiontype delete", res);
         if (res.status === 200) {
            return { data: res.data, enumId };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const questionTypes = createSlice({
   name: "questionTypes",
   initialState: {
      isLoading: false,
      operationLoading: false,
      status: false,
      perPage: 10,
      total: 1,
      error: null,
      questionTypes: [],
   } as QuestionTypesState,

   reducers: {
      completedQuestionTypeOperation: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getQuestionTypes.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getQuestionTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.questionTypes = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getQuestionTypes.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // create an exam type

      builder.addCase(createQuestionType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createQuestionType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.questionTypes.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createQuestionType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // update a new question type
      builder.addCase(updateQuestionType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateQuestionType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         // state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(updateQuestionType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete questiontype
      builder.addCase(deleteQuestionType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteQuestionType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.questionTypes = state.questionTypes.filter(
            (questiontype) => questiontype.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteQuestionType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedQuestionTypeOperation } = questionTypes.actions;

export default questionTypes.reducer;
