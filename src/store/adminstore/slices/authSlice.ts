import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "@/types/adminTypes/accounts/accountsTypes";
import Cookies from "universal-cookie";
import { Axios } from "@/utils/axios";

export const loginAdmin = createAsyncThunk(
  "login",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();

    try {
      const res = await Axios.post(`admin/login`, data);
      if (res?.status === 200) {
        let token = res.data.data.access_token;

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("admin_token", token, {
          path: "/admin",
          expires: expiryDate,
        });

        return res.data.data;
      }
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.message);
      } else if (error?.response?.status === 403) {
        return rejectWithValue(error.response.data.general);
      } else return rejectWithValue("There was an Error");
    }
  }
);

export const getAdminProfile = createAsyncThunk(
  "getProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await Axios.get(`admin`);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const adminForgotPassword = createAsyncThunk(
  "forgotpassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await Axios.post(`admin/forgot-password`, data);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("There was an Error");
      }
    }
  }
);

export const adminValidateForgotPassword = createAsyncThunk(
  "validatePassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await Axios.post(`admin/validate-forgot-password-otp`, data);
      return res.data.data;
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("There was an Error");
      }
    }
  }
);

export const adminResetPassword = createAsyncThunk(
  "resetPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await Axios.post(`admin/reset-password`, data);
      return res.data.data;
    } catch (error: any) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("There was an Error");
      }
    }
  }
);

export const adminUpdatePassword = createAsyncThunk(
  "updateAdminPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      // REVIEW
      const res = await Axios.put(
        `admin/updatePassword?old_password=${data.old_password}&new_password=${data.new_password}&new_password_confirmation=${data.new_password_confirmation}`,
        {
          old_password: data.old_password,
          new_password: data.new_password,
        }
      );
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const adminLogOut = createAsyncThunk(
  "adminLogout",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;

    try {
      const res = await Axios.delete(`admin/logout`);

      let cookie = new Cookies();
      cookie.remove("admin_token");

      return res.data;
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
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
        state.adminProfile = action.payload;
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
        state.adminProfile = action.payload;
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
        state.adminProfile = null;
      })
      .addCase(adminLogOut.rejected, (state, action: any) => {
        state.loadingPass = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
