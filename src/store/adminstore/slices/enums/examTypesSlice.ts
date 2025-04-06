import { ExamTypesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "universal-cookie";
import { getAuthHeaders } from "./authHeaders";

 const cookie = new Cookie();
 


export const getExamTypes = createAsyncThunk(
   "examTypes/getExamTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.get(
            `/api/admin/examtype?page=${activePage}&term=${term}`
            ,{
               headers: {
                  Authorization: `Bearer ${cookie.get("admin_token")}`, 
                }, 
       
            }
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
         const res = await axios.post(`/api/admin/examtype`, data,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`, 
             }, 
         });

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
       const res = await axios.post(`/api/admin/examtype/2`, formData, {
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
           "Content-Type": "multipart/form-data", 
         },
       });
 
       console.log("Update exam type response:", res);
 
       if (res.status === 200) {
         // Validate the response structure
         if (!res.data || !res.data.data) {
           throw new Error("Invalid response structure from server");
         }
         return { id: enumId, data: res.data.data }; // Return both id and data
       }
       throw new Error("Failed to update exam type");
     } catch (error: any) {
       console.error("Update exam type error:", error);
       
       // More robust error handling
       const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Network error";
       return rejectWithValue(errorMessage);
     }
   }
 );

export const deleteExamType = createAsyncThunk(
   "examTypes/deleteExamType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.delete(`/api/admin/examtype/${enumId}`,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`, 
             }, 
         });

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

export const deleteExamTypes = createAsyncThunk(  
   "venues/deleteMultipleVenues",  
   async (ids: number[], thunkAPI) => {
     try {
       const res = await axios.delete(`/api/admin/examtype/bulk-destroy`, {
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
            (examType) => examType.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteExamType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
      
      // delete categories : 
      builder.addCase(deleteExamTypes.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteExamTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
      
         state.status = true;
      });
      builder.addCase(deleteExamTypes.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedExamTypeOperation } = examTypes.actions;

export default examTypes.reducer;
