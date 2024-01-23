import { PermissionsState } from "@/types/adminTypes/accounts/roles/rolesTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getPermissions = createAsyncThunk(
   "permissions/getPermissions",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get("admin/permissions");
         console.log(res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const permissions = createSlice({
   name: "permissions",
   initialState: {
      isLoading: false,
      error: null,
      permissions: [],
   } as PermissionsState,

   reducers: {},

   extraReducers: (builder) => {
      // get all permissions
      builder.addCase(getPermissions.pending, (state) => {
         state.error = null;
         state.isLoading = true;
         console.log("loading");
      });
      builder.addCase(getPermissions.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.permissions = action.payload;
         console.log("fullfiled");
      });
      builder.addCase(getPermissions.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default permissions.reducer;
