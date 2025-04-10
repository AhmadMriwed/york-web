import {
   RolesState,
   RolesType,
} from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoles = createAsyncThunk(
   "roles/getRoles",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try to get all");

         const res = await Axios.get(
            `roles?page=${activePage}&term=${term}`
         );
         console.log(res, "roles");
         if (res.status === 200) {
            return {
               data: res.data.data,
               // perPage: res.data.meta.per_page,
               // total: res.data.meta.total,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const getRolesAsMenue = createAsyncThunk(
   "roles/getRolesAsMenue",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get("roles");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const createRole = createAsyncThunk(
   "roles/createRole",
   async (data: { name: string; permissions_ids: any[] }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/roles`, data);
         console.log(res, "roles insert");
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const updateRole = createAsyncThunk(
   "roles/updateRole",
   async (params: { data: {}; id?: number }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`admin/roles/${params.id}`, params.data);
         console.log(res, "roles insert");
         if (res.status === 200) {
            return { status: true };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteRole = createAsyncThunk(
   "roles/deleteRole",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/roles/${id}`);
         console.log(res, "roles delete");
         if (res.status === 200) {
            console.log("deleted");
            return { message: "success", id };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

const roles = createSlice({
   name: "roles",
   initialState: {
      isLoading: false,
      operationLoading: false,

      perPage: 10,
      total: 1,
      error: null,
      status: false,
      roles: [],
   } as RolesState,

   reducers: {
      completedRoleOperation: (state) => {
         state.status = false;
      },
   },

   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getRoles.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getRoles.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.roles = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getRoles.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get roles as menue
      builder.addCase(getRolesAsMenue.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getRolesAsMenue.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.roles = action.payload.map((item: RolesType) => ({
            label: item.name,
            value: item.id,
         }));
      });
      builder.addCase(getRolesAsMenue.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a role

      builder.addCase(createRole.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.roles.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createRole.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // create a role

      builder.addCase(updateRole.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.status = true;
      });
      builder.addCase(updateRole.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete role
      builder.addCase(deleteRole.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.roles = state.roles.filter(
            (role) => role.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteRole.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedRoleOperation } = roles.actions;
export default roles.reducer;
