import { UsersState } from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
   "users/getUsers",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");
         const res = await Axios.get(
            `accounts?page=${activePage}&term=${term}`
         );
         console.log(res, "users");
         if (res.status === 200) {
            return {
               data: [
                  ...res.data.admins.data,
                  ...res.data.trainers.data,
                  ...res.data.users.data,
               ],
               count:
                  res.data.admins.meta.total +
                  res.data.trainers.meta.total +
                  res.data.users.meta.total,
               perPage:
                  res.data.admins.meta.per_page +
                  res.data.trainers.meta.per_page +
                  res.data.users.meta.per_page,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

// get users by type

export const getUsersByType = createAsyncThunk(
   "users/getUsersByType",
   async (type: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");
         console.log(type);
         const res = await Axios.get(
            `accounts/byType?account_type=${type}`
         );
         console.log(res.data.data, "users");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message);
      }
   }
);
export const getUsersByStatus = createAsyncThunk(
   "users/getUsersByStatus",
   async (status: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");
         console.log(status);
         const res = await Axios.get(
            `accounts/byStatus?status=${status}`
         );
         console.log(res.data.data, "users");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message);

      }
   }
);

export const createUser = createAsyncThunk(
   "users/createUser",

   async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`users`, data);
         console.log(res, "users insert");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const deleteUser = createAsyncThunk(
   "users/deleteUser",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`accounts/${id}`);
         console.log(res, "users delete");
         if (res.status === 200) {
            return { message: "success", id };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);
export const updateUser = createAsyncThunk(
   "users/updateUser",
   async (params: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      console.log("updateUser", params);
      try {
         const res = await Axios.put(`accounts/${params.id}`,   params.data);
         console.log(res, "users delete");
         if (res.status === 200) {
            console.log("updated successfully");
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message);
      }
   }
);



const users = createSlice({
   name: "users",
   initialState: {
      isLoading: false,
      operationLoading: false,
      operationError: null,
      error: null,
      status: false,
      perPage: 10,
      total: 1,
      users: [],
   } as UsersState,

   reducers: {
      completedUserOperation: (state) => {
         state.status = false;
         state.operationError= null;
      },
   },

   extraReducers: (builder) => {
      // get all Users
      builder.addCase(getUsers.pending, (state) => {
         state.error = null;
         state.isLoading = true;
         state.operationError= null
      });
      builder.addCase(getUsers.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.users = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.count;
      });
      builder.addCase(getUsers.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get users by type
      builder.addCase(getUsersByType.pending, (state) => {
         state.error = null;
         state.operationError = null;
         state.isLoading = true;
         state.operationError= null;
      });
      builder.addCase(getUsersByType.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.status= true;
         state.users = action.payload;
         console.log("users by type", action.payload);
         state.operationError= null
      });
      builder.addCase(getUsersByType.rejected, (state, action: any) => {
         state.isLoading = false;
         state.status = false;
         state.error = action.payload;
         state.operationError= action.payload
      });


      // get users by status
      builder.addCase(getUsersByStatus.pending, (state) => {
         state.error = null;
         state.operationError = null;
         state.isLoading = true;
         state.operationError= null;
      });
      builder.addCase(getUsersByStatus.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.users = action.payload;
         console.log("users by staus", action.payload);
         state.operationError= null
      });
      builder.addCase(getUsersByStatus.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
         state.operationError= action.payload
      });

      // create a role

      builder.addCase(createUser.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createUser.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.users.push(action.payload);
      });
      builder.addCase(createUser.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
      });

      
            // update a role
      
      builder.addCase(updateUser.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
         state.operationError = null;
      });
      builder.addCase(updateUser.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationError = null;
         state.operationLoading = false;
         state.status = true;

         // state.supervisors.push(action.payload);
      });
      builder.addCase(updateUser.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.operationError = action.payload;
      });


      // delete role
      builder.addCase(deleteUser.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteUser.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.users = state.users.filter(
            (user) => user.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteUser.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
      });
   },
});

export const { completedUserOperation } = users.actions;

export default users.reducer;
