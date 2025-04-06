import { QuestionTypesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "universal-cookie";
import { getAuthHeaders } from "./authHeaders";

 const cookie = new Cookie();
 

export const getQuestionTypes = createAsyncThunk(
   "questionTypes/getQuestionTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res =
            await axios.get(`/api/admin/questiontype?page=${activePage}&term=${term}
         `,{
            headers:{
               Authorization: `Bearer ${cookie.get("admin_token")}`,
             },
         });

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
         const res = await axios.post(`/api/admin/questiontype`, data,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`, 
             }, 
         });

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
   async ({ formData, enumId }: { formData: any; enumId: number }, thunkAPI) => {
     const { rejectWithValue } = thunkAPI;
     try {
       const res = await axios.post(`/api/admin/questiontype/${enumId}`, formData, {
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
         },
       });
       if(res.status===201){

          return res.data.data;
       }
 
       if (res.status === 200) {
         // Ensure response has valid data structure
         if (!res.data?.data) {
           throw new Error('Invalid response format');
         }
         return res.data.data;
       }
       throw new Error('Update failed');
     } catch (error: any) {
       console.error("Error:", error);
       return rejectWithValue(
         error.response?.data?.message || 
         error.message || 
         "Network error occurred"
       );
     }
   }
 );

export const deleteQuestionType = createAsyncThunk(
   "questionTypes/deleteQuestionType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.delete(`/api/admin/questiontype/${enumId}`,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`, 
             }, 
    
         });

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

export const deleteQuestionTypes = createAsyncThunk(  
   "venues/deleteMultipleVenues",  
   async (ids: number[], thunkAPI) => {
     try {
       const res = await axios.delete(`/api/admin/questiontype/bulk-destroy`, {
         ...getAuthHeaders("application/json"),
         data: { ids }, 
 
       });
       console.log(res);
 
     } catch (error: any) {
       console.error("Error:", error);
       return thunkAPI.rejectWithValue(error.message);
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
  if (action.payload && action.payload.id) {
   const index = state.questionTypes.findIndex(
     (item) => item.id === action.payload.id
   );
   if (index !== -1) {
     state.questionTypes[index] = action.payload;
   }
 }
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
            (questiontype) => questiontype.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteQuestionType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
      
      // delete question types : 
      builder.addCase(deleteQuestionTypes.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteQuestionTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
        
         state.status = true;
      });
      builder.addCase(deleteQuestionTypes.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedQuestionTypeOperation } = questionTypes.actions;

export default questionTypes.reducer;
