import { UserState } from "@/types/userTypes/auth/authTypes";
import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserAxios } from "@/utils/axios";
import Cookies from "universal-cookie";
export const userLogin = createAsyncThunk(
  "userLogin",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("success", data);
    const cookies = new Cookies();
    try {
      const res = await UserAxios.post(`user/login`, data);
      console.log(res, "user login");
      if (res.status === 200) {
        console.log("login success");
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        let token = res.data.data.access_token;
        cookies.set("user_token", token, { path: "/", expires: expiryDate });
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error", error.message);
      if (error.response.status === 403) {
        return rejectWithValue("Invalid email or password");
      } else {
        return rejectWithValue("Internel server error");
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  "userRegister",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data);
    const cookies = new Cookies();
    try {
      const res = await axios.post(`${baseURL}user/register`, data);
      if (res.status === 201) {
        console.log(res, "user register");
        let token = res.data.data.access_token;
        cookies.set("user_token", token);
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error", error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const getUserProfile = createAsyncThunk(
  "getProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await UserAxios.get(`user`);
      if (res.status === 200) {
        console.log(res);
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const CompleteUserProfile = createAsyncThunk(
  "updateProfile",
  async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", params.data);
    try {
      const res = await axios.post(
        `${baseURL}user/updateProfile`,
        params.data,
        { headers: { Authorization: `Bearer ${params.token}` } }
      );
      console.log(res, "user edit");
      if (res.status === 200) {
        console.log("updated successfully");
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error", error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const userForgotPassword = createAsyncThunk(
  "forgotpassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(`${baseURL}user/forgot-password`, data);
      if (res.status === 200) {
        console.log(res, "success");
        return res.data;
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        return rejectWithValue("invalid email");
      } else {
        return rejectWithValue("internel server error");
      }
    }
  }
);
export const userValidateForgotPassword = createAsyncThunk(
  "validatePassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data);
    try {
      const res = await axios.post(
        `${baseURL}user/validate-forgot-password-otp`,
        data
      );
      console.log(res);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const userResetPassword = createAsyncThunk(
  "resetPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data);
    try {
      const res = await axios.post(`${baseURL}user/reset-password`, data);
      console.log(res);
      return res.data.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);
export const userUpdatePassword = createAsyncThunk(
  "updateUserPassword",
  async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", params);
    try {
      const res = await axios.put(
        `${baseURL}user/updatePassword`,
        params.data,
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res, "password updated successfully");
        return res.data.data;
      }
    } catch (error: any) {
      console.log("Error", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const userLogOut = createAsyncThunk(
  "userLogout",
  async (token: string, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      const res = await axios.delete(`${baseURL}user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let cookie = new Cookies();
      cookie.remove("user_token");
      return res.data;
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
    error: null,
    loading: false,
    msg: "",
    loadingPass: false,
    errorPass: null,
    location: "",
  } as UserState,
  reducers: {
    getLocation: (state, action) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    //user login
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(userRegister.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(userRegister.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      //update user profile
      .addCase(CompleteUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(CompleteUserProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(CompleteUserProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get singleUserProfile
      .addCase(getUserProfile.pending, (state) => {
        // state.loading = true
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

export const { getLocation } = userSlice.actions;
export default userSlice.reducer;
