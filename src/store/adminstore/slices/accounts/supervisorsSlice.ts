import { SupervisorsState } from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSupervisors = createAsyncThunk(
   "supervisors/getSupervisors",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");

         const res = await Axios.get(
            `superviosr?page=${activePage}&term=${term}`
         );
         console.log(res, "Supervisors");

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

export const getSingleSupervisor = createAsyncThunk(
   "supervisors/getSingleSupervisor",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`superviosr/${id}`);
         console.log(res, "supervisors get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createSupervisor = createAsyncThunk(
   "supervisors/createSupervisor",

   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`superviosr`, data);
         console.log(res, "supervisors insert");
         if (res.status === 201) {
            console.log("added successfully");
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message);
      }
   }
);

export const updateSupervisor = createAsyncThunk(
   "supervisors/updateSupervisor",

   async (params: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      console.log("updateSupervisor", params);
      try {
         const res = await Axios.put(
            `superviosr/${params.id}`,
            params.data
         );
         console.log(res, "supervisors edit");
         if (res.status === 200) {
            console.log("updated successfully");
            return params.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const deleteSupervisor = createAsyncThunk(
   "supervisors/deleteSupervisor",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`superviosr/${id}`);
         console.log(res, "supervisors delete");
         if (res.status === 200) {
            return { message: "success", id };
         }
         return { message: "success", id };
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const supervisors = createSlice({
   name: "supervisors",
   initialState: {
      isLoading: false,
      operationLoading: false,
      operationError: null,
      error: null,
      perPage: 10,
      total: 1,
      supervisors: [],
      status: false,
      singleSupervisor: {
         id: 0,
         account_status: "",
         first_name: "",
         last_name: "",
         account_type: "",
         email: "",
         image: null,
         is_verified: false,
         phone_number: "",
         role: null,
         status: null,
         user_id: 0,
         user_name: "",
      },
   } as SupervisorsState,

   reducers: {
      completedSupervisorOperation: (state) => {
         state.status = false;
         state.operationError = null;
         state.error= null;
      },
   },

   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getSupervisors.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSupervisors.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.supervisors = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getSupervisors.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;

      });

      // get single supervisors

      builder.addCase(getSingleSupervisor.pending, (state) => {
         state.error = null;
         state.operationError = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleSupervisor.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.operationError = null;
         console.log(action.payload, "load");
         state.singleSupervisor = action.payload;
      });
      builder.addCase(getSingleSupervisor.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
         state.operationError = action.payload;
      });

      // create a role

      builder.addCase(createSupervisor.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
         state.operationError = null;
      });
      builder.addCase(createSupervisor.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.status = true;
         state.operationError = null;

         // state.supervisors.push(action.payload);
      });
      builder.addCase(createSupervisor.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.operationError = action.payload; // Specific error for alerts
      });

      // update a role

      builder.addCase(updateSupervisor.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
         state.operationError = null;
      });
      builder.addCase(updateSupervisor.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationError = null;
         state.operationLoading = false;
         state.status = true;

         // state.supervisors.push(action.payload);
      });
      builder.addCase(updateSupervisor.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.operationError = action.payload;
      });

      // delete role
      builder.addCase(deleteSupervisor.pending, (state) => {
         state.error = null;
         state.operationError = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteSupervisor.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.operationError = null;
         state.status = true;
         state.supervisors = state.supervisors.filter(
            (supervisor) => supervisor.id !== action.payload.id
         );
      });
      builder.addCase(deleteSupervisor.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.operationError = action.payload;
      });
   },
});

export const { completedSupervisorOperation } = supervisors.actions;

export default supervisors.reducer;
