import { RolesState } from "@/types/adminTypes/accounts/roles/rolesTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getRoles = createAsyncThunk(
   "roles/getRoles",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");

         const res = await Axios.get("admin/roles");
         console.log(res.data, "roles");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error: any) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

export const getSingleRole = createAsyncThunk(
   "roles/getSingleRole",
   async (id, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`admin/roles/${id}`);
         console.log(res, "roles get single");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

export const createRole = createAsyncThunk(
   "roles/createRole",
   async (
      { name, permissions_ids }: { name: string; permissions_ids: [] },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/roles`, { name, permissions_ids });
         console.log(res, "roles insert");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

export const deleteRole = createAsyncThunk(
   "roles/deleteRole",
   async ({ id }: { id: number }, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/roles${id}`);
         console.log(res, "roles delete");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
         // return { message: "success", id };
      } catch (error) {
         console.error("Error:", error);
         rejectWithValue(error);
      }
   }
);

const roles = createSlice({
   name: "roles",
   initialState: {
      isLoading: false,
      error: null,
      roles: [],
      singleRole: { name: "", id: null, role_permissions: [] },
   } as RolesState,

   reducers: {},

   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getRoles.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getRoles.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.roles = action.payload;
      });
      builder.addCase(getRoles.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get single role

      builder.addCase(getSingleRole.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.singleRole = action.payload;
      });
      builder.addCase(getSingleRole.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a role

      builder.addCase(createRole.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(createRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.roles.push(action.payload);
      });
      builder.addCase(createRole.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // delete role
      builder.addCase(deleteRole.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(deleteRole.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.roles = state.roles.filter(
            (role) => role.id !== action.payload.id
         );
      });
      builder.addCase(deleteRole.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default roles.reducer;
