import {
   RequestTypesState,
   EnumType3,
} from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRequestTypes = createAsyncThunk(
   "requestTypes/getRequestTypes",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `admin/requestType?page=${activePage}&term=${term}`
         );

         console.log("res request types", res);
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

export const getRequestTypesAsMenue = createAsyncThunk(
   "requestTypes/getRequestTypesAsMenue",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get("admin/requestType");

         console.log("res request types", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createRequestType = createAsyncThunk(
   "requestTypes/createRequestType",
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/requestType`, data);

         console.log("res req type created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const updateRequestType = createAsyncThunk(
   "requestTypes/updateRequestType",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`admin/requestType/${enumId}`, formData);

         console.log("res requestType updated", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteRequestType = createAsyncThunk(
   "requestTypes/deleteRequestType ",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/requestType/${enumId}`);

         console.log("res requestType delete", res);
         if (res.status === 200) {
            return { data: res.data, enumId };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const requestTypes = createSlice({
   name: "requestTypes",
   initialState: {
      isLoading: false,
      operationLoading: false,
      status: false,
      error: null,
      perPage: 10,
      total: 1,
      requestTypes: [],
      requestTypesAsMenue: [],
   } as RequestTypesState,

   reducers: {
      completedRequestTypeOperation: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getRequestTypes.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getRequestTypes.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.requestTypes = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getRequestTypes.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get all request types as menue
      builder.addCase(getRequestTypesAsMenue.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(
         getRequestTypesAsMenue.fulfilled,
         (state, action: any) => {
            state.error = null;
            state.isLoading = false;
            const types: EnumType3[] = action.payload;
            state.requestTypesAsMenue = types.map((type) => {
               return { label: type.name, value: type.id };
            });
         }
      );
      builder.addCase(getRequestTypesAsMenue.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a request type

      builder.addCase(createRequestType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createRequestType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.requestTypes.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createRequestType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // update a  request type
      builder.addCase(updateRequestType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateRequestType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         // state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(updateRequestType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete requestType
      builder.addCase(deleteRequestType.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteRequestType.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.requestTypes = state.requestTypes.filter(
            (requestType) => requestType.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteRequestType.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedRequestTypeOperation } = requestTypes.actions;

export default requestTypes.reducer;
