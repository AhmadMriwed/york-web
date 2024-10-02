import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "@/types/adminTypes/accounts/accountsTypes";
import { baseURL } from "@/utils/api";
import Cookies from "universal-cookie";
import axios from "axios";

export const loginAdmin = createAsyncThunk(
  "login",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();

    try {
      const res = await axios.post(`${baseURL}admin/login`, data);
      if (res.status === 200) {
        let token = res.data.data.access_token;

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("admin_token", token, { path: "/", expires: expiryDate });

        return res.data.data;
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        return rejectWithValue("Invalid Email or Password");
      } else {
        return rejectWithValue("Internal Server Error");
      }
    }
  }
);

export const getAdminProfile = createAsyncThunk(
  "getProfile",
  async (token: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.get(`${baseURL}admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const adminForgotPassword = createAsyncThunk(
  "forgotpassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(`${baseURL}admin/forgot-password`, data);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        return rejectWithValue("Invalid Email");
      } else {
        return rejectWithValue("Internel Server Error");
      }
    }
  }
);

export const adminValidateForgotPassword = createAsyncThunk(
  "validatePassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(
        `${baseURL}admin/validate-forgot-password-otp`,
        data
      );
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const adminResetPassword = createAsyncThunk(
  "resetPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(`${baseURL}admin/reset-password`, data);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const adminUpdatePassword = createAsyncThunk(
  "updateAdminPassword",
  async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.put(
        `${baseURL}admin/updatePassword?old_password=${params.data.old_password}&new_password=${params.data.new_password}&new_password_confirmation=${params.data.new_password_confirmation}`,
        {
          old_password: params.data.old_password,
          new_password: params.data.new_password,
        },
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const adminLogOut = createAsyncThunk(
  "adminLogout",
  async (token: String, thunAPI) => {
    const { rejectWithValue } = thunAPI;

    try {
      const res = await axios.delete(`${baseURL}admin/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let cookie = new Cookies();
      cookie.remove("admin_token");

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    loading: false,
    error: null,
    adminProfile: null,
    profileLoading: false,
    profileError: null,
    admin: null,
    msg: "",
    loadingPass: false,
    errorPass: null,
  } as AdminState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.admin = action.payload;
      })
      .addCase(loginAdmin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAdminProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getAdminProfile.fulfilled, (state, action: any) => {
        state.profileLoading = false;
        state.adminProfile = action.payload;
        state.profileError = null;
      })
      .addCase(getAdminProfile.rejected, (state, action: any) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      })

      .addCase(adminForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminForgotPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload;
      })
      .addCase(adminForgotPassword.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(adminValidateForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminValidateForgotPassword.fulfilled, (state, action: any) => {
        state.error = null;
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(adminValidateForgotPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(adminResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminResetPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload;
      })
      .addCase(adminResetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(adminUpdatePassword.pending, (state) => {
        state.loadingPass = true;
        state.errorPass = null;
      })
      .addCase(adminUpdatePassword.fulfilled, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = null;
        state.admin = action.payload;
      })
      .addCase(adminUpdatePassword.rejected, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = action.payload;
      })

      .addCase(adminLogOut.pending, (state) => {
        state.loadingPass = true;
        state.error = null;
      })
      .addCase(adminLogOut.fulfilled, (state, action: any) => {
        state.loadingPass = false;
        state.error = null;
        state.admin = null;
      })
      .addCase(adminLogOut.rejected, (state, action: any) => {
        state.loadingPass = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
