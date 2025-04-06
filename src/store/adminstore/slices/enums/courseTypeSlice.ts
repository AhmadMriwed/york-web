   import { CourseTypesState } from "@/types/adminTypes/enums/enumsTypes";
   import { Axios } from "@/utils/axios";
   import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
   import axios from "axios";

   import Cookie from "universal-cookie";
   import { getAuthHeaders } from "./authHeaders";

   const cookie = new Cookie();
   


   export const getCourseTypes = createAsyncThunk(
      "courseTypes/getCourseTypes",
      async (
         { activePage, term }: { activePage: number; term: string },
         thunkAPI
      ) => {
         const { rejectWithValue } = thunkAPI;
         try {
            const res = await axios.get(
               `/api/admin/course_type?page=${activePage}&term=${term}`,{
                  headers: {
                     Authorization: `Bearer ${cookie.get("admin_token")}`, 
                  },
               }
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

   export const createCourseType = createAsyncThunk(
      "courseTypes/createCourseType",
      async (data: any, thunkAPI) => {
         const { rejectWithValue } = thunkAPI;
         try {
            const formData = new FormData();
         
            // Append all fields to formData
            for (const key in data) {
            formData.append(key, data[key]);
            }

            const res = await axios.post(`/api/admin/course_type`, data,{
               headers: {
                  Authorization: `Bearer ${cookie.get("admin_token")}`, 
                  "Content-Type": "multipart/form-data", 
               },
            });

            console.log("res Course type created", res);
            if (res.status === 201) {
               return res.data.data;
            }
         } catch (error: any) {
            console.error("Error:", error);
            return rejectWithValue(error.response.data.message || "network error");
         }
      }
   );
   export const updateCourseType = createAsyncThunk(
      "courseTypes/updateCourseType",
      async (
         { formData, enumId }: { formData: any; enumId: number },
         thunkAPI
      ) => {
         const { rejectWithValue } = thunkAPI;
         try {
            // Convert to FormData if it's not already
            const data = new FormData();
            for (const key in formData) {
               if (formData[key] !== undefined) {
                  data.append(key, formData[key]);
               }
            }
   
            const res = await axios.post(`/api/admin/course_type/update/${enumId}`, data, {
               headers: {
                  Authorization: `Bearer ${cookie.get("admin_token")}`, 
                  "Content-Type": "multipart/form-data", 
               },
            });
   
            if (res.status === 200) {
               return { data: res.data.data, enumId };
            }
         } catch (error: any) {
            console.error("Error:", error);
            return rejectWithValue(error.response?.data?.message || "network error");
         }
      }
   );
   export const deleteCourseType = createAsyncThunk(
      "courseTypes/deleteCourseType",
      async (enumId: number, thunkAPI) => {
         const { rejectWithValue } = thunkAPI;
         try {
            const res = await axios.delete(`/api/admin/course_type/${enumId}`,{
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


   export const deleteCourseTypes = createAsyncThunk(  
      "venues/deleteMultipleVenues",  
      async (ids: number[], thunkAPI) => {
      try {
         const res = await axios.delete(`/api/admin/course_type/bulk-destroy`, {
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


   const courseTypes = createSlice({
      name: "courseTypes",
      initialState: {
         isLoading: false,
         operationLoading: false,
         status: false,
         error: null,
         perPage: 10,
         total: 1,
         courseTypes: [],
      } as CourseTypesState,

      reducers: {
         completedCourseTypeOperation: (state) => {
            state.status = false;
         },
      },

      extraReducers: (builder) => {
         // get all request types
         builder.addCase(getCourseTypes.pending, (state) => {
            state.error = null;
            state.isLoading = true;
         });
         builder.addCase(getCourseTypes.fulfilled, (state, action: any) => {
            state.error = null;
            state.isLoading = false;
            state.courseTypes = action.payload.data;
            state.perPage = action.payload.perPage;
            state.total = action.payload.total;
         });
         builder.addCase(getCourseTypes.rejected, (state, action: any) => {
            state.isLoading = false;
            state.error = action.payload;
         });
         // create an exam type

         builder.addCase(createCourseType.pending, (state) => {
            state.error = null;
            state.operationLoading = true;
         });
         builder.addCase(createCourseType.fulfilled, (state, action: any) => {
            state.error = null;
            state.operationLoading = false;
            state.courseTypes.unshift(action.payload);
            state.status = true;
         });
         builder.addCase(createCourseType.rejected, (state, action: any) => {
            state.operationLoading = false;
            state.error = action.payload;
            state.status = true;
         });

         // update a course type
   // update a course type
   builder.addCase(updateCourseType.pending, (state) => {
      state.error = null;
      state.operationLoading = true;
   });
   builder.addCase(updateCourseType.fulfilled, (state, action: any) => {
      state.error = null;
      state.operationLoading = false;
      // Update the specific course type in the array
      const index = state.courseTypes.findIndex(
         (type) => type.id === action.payload.enumId
      );
      if (index !== -1) {
         state.courseTypes[index] = action.payload.data;
      }
      state.status = true;
   });
   builder.addCase(updateCourseType.rejected, (state, action: any) => {
      state.operationLoading = false;
      state.error = action.payload;
      state.status = true;
   });

         // delete course_type
         builder.addCase(deleteCourseType.pending, (state) => {
            state.error = null;
            state.operationLoading = true;
         });
         builder.addCase(deleteCourseType.fulfilled, (state, action: any) => {
            state.error = null;
            state.operationLoading = false;
            state.courseTypes = state.courseTypes.filter(
               (couresType) => couresType.id !== action.payload.id
            );
            state.status = true;
         });
         builder.addCase(deleteCourseType.rejected, (state, action: any) => {
            state.operationLoading = false;
            state.error = action.payload;
            state.status = true;
         });
         //delte course types : 
         builder.addCase(deleteCourseTypes.pending, (state) => {
            state.error = null;
            state.operationLoading = true;
         });
         builder.addCase(deleteCourseTypes.fulfilled, (state, action: any) => {
            state.error = null;
            state.operationLoading = false;
            
            state.status = true;
         });
         builder.addCase(deleteCourseTypes.rejected, (state, action: any) => {
            state.operationLoading = false;
            state.error = action.payload;
            state.status = true;
         });
      },
   });

   export const { completedCourseTypeOperation } = courseTypes.actions;

   export default courseTypes.reducer;
