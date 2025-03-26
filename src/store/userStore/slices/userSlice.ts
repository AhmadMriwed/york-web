import { UserState } from "@/types/userTypes/auth/authTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import Cookie from "universal-cookie";

import axios from "axios";
const cookie = new Cookie();


export const userLogin = createAsyncThunk(
  "userLogin",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();
    try {
      const res = await axios.post(
        `/api/user/login`,
        data
      );
      if (res.status === 200) {
        let token = res.data.data.access_token;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("user_token", token, { path: "/", expires: expiryDate });
        return res.data.data;
      }
    } catch (error: any) {
      console.log(error);
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.message);
      } else if (error?.response?.status === 403) {
        return rejectWithValue(error.response.data.general);
      } else return rejectWithValue("There was an Error");
    }
  }
);

export const userRegister = createAsyncThunk(
  "userRegister",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();
    try {
      const res = await axios.post(`/api/user/register`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
        },
      });
      if (res.status === 201) {
        let token = res.data.data.access_token;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("user_token", token, { path: "/", expires: expiryDate });
        return res.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "getProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/api/user`, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
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

export const CompleteUserProfile = createAsyncThunk(
  "updateProfile",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/user/updateProfile`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
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

export const userForgotPassword = createAsyncThunk(
  "forgotpassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(`/api/user/forgot-password`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
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

export const userValidateForgotPassword = createAsyncThunk(
  "validatePassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `user/validate-forgot-password-otp`,
        data, {
          headers: {
            Authorization: `Bearer ${cookie.get("user_token")}`, 
          },
        }
      );
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

export const userResetPassword = createAsyncThunk(
  "resetPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/user/reset-password`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
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

export const userUpdatePassword = createAsyncThunk(
  "updateUserPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/api/user/updatePassword`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("user_token")}`, 
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

export const userLogOut = createAsyncThunk("userLogout", async (_, thunAPI) => {
  const { rejectWithValue } = thunAPI;
  try {
    const res = await axios.delete(`/api/user/logout`);
    let cookie = new Cookies();
    cookie.remove("user_token");
    return res.data;
  } catch (error: any) {
    if (error?.response?.data?.message)
      return rejectWithValue(error.response.data.message);
    else return rejectWithValue("There was an Error");
  }
});

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    error: null,
    loadingPass: false,
    errorPass: null,
    user: {},
    msg: "",
    location: "",
    status: false,
  } as UserState,

  reducers: {
    getLocation: (state, action) => {
      state.location = action.payload;
    },
    userAuthOperationCompleted: (state) => {
      state.status = false;
    },
  },

  extraReducers: (builder) => {
    //user login
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      //user register
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.status = true;
      })
      .addCase(userRegister.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
        state.status = true;
      })
      //update user profile
      .addCase(CompleteUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CompleteUserProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.status = true;
      })
      .addCase(CompleteUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
        state.status = true;
      })
      //get singleUserProfile
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      //user forgot password
      .addCase(userForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userForgotPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload;
      })
      .addCase(userForgotPassword.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      //user validatePassword
      .addCase(userValidateForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userValidateForgotPassword.fulfilled, (state, action: any) => {
        state.error = null;
        state.loading = false;
        state.msg = action.payload;
      })
      .addCase(userValidateForgotPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      //user reset password
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userResetPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userResetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      //userUpdatePassword
      .addCase(userUpdatePassword.pending, (state) => {
        state.loadingPass = true;
        state.errorPass = null;
      })
      .addCase(userUpdatePassword.fulfilled, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = null;
        state.user = action.payload;
      })
      .addCase(userUpdatePassword.rejected, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = action.payload;
      })
      //userLogOut
      .addCase(userLogOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogOut.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = null;
      })
      .addCase(userLogOut.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { getLocation, userAuthOperationCompleted } = userSlice.actions;
export default userSlice.reducer;
