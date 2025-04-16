import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminState } from "@/types/adminTypes/accounts/accountsTypes";
import Cookies from "universal-cookie";
import axios from "axios";
import Cookie from "universal-cookie";
import { toast } from "sonner";
import { getAuthHeaders } from "./enums/authHeaders";

 const cookie = new Cookie();


 export const loginAdmin = createAsyncThunk(
  "login",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();

    try {
      const res = await axios.post(`/api/admin/login`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
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
      const res = await axios.get(`/api/admin`,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
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
      const res = await axios.post(`/api/admin/forgot-password`,data,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
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
      const res = await axios.post(`/api/admin/validate-forgot-password-otp`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
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
      const res = await axios.post(`/api/admin/reset-password`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
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
      const res = await axios.put(
        `/api/admin/updatePassword?old_password=${data.old_password}&new_password=${data.new_password}&new_password_confirmation=${data.new_password_confirmation}`,
        {
          old_password: data.old_password,
          new_password: data.new_password,
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`, 
          },
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

export const editProfile = async (formData: FormData) => {
  try {
    const response = await axios.put(
      "/api/admin/updateProfile",
      formData,
      {
        ...getAuthHeaders('application/json')
      }
    );

    console.log("API Response:", response.data);

    if (response.data && response.data.message === "Updated successfully") {
      toast.success(response.data.message);
      return response.data.data;
    }

    throw new Error(response.data?.message || "فشل في تحديث الملف الشخصي");
  } catch (error: any) {
    console.error("API Error Details:", error);
    
    let errorMessage = "حدث خطأ غير متوقع";
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || 
                   error.response?.data?.error || 
                   error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

export const adminLogOut = createAsyncThunk(
  "adminLogout",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;

    try {
      const res = await axios.delete(`/api/admin/logout`);

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


