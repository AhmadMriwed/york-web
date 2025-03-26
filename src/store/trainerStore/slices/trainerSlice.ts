import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { TrainerState } from "@/types/trainerTypes/auth/authTypes";
import axios from "axios";
import Cookie from "universal-cookie";
const cookie = new Cookie();

export const trainerRegister = createAsyncThunk(
  "trainerRegister",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    let cookies = new Cookies();
    try {
      const res = await axios.post(`/api/trainer/register`, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },
      });
      if (res.status === 201) {
        let token = res.data.data.access_token;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("trainer_token", token, { path: "/", expires: expiryDate });
        return res.data.data;
      }
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const trainerLogin = createAsyncThunk(
  "trainerLogin",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const cookies = new Cookies();
    try {
      const res = await axios.post(`/api/trainer/login`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        let token = res.data.data.access_token;
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 10);
        cookies.set("trainer_token", token, { path: "/", expires: expiryDate });
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

export const getTrainerProfile = createAsyncThunk(
  "getProfile",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/api/trainer`,{
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },});
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

export const trainerUpdateProfile = createAsyncThunk(
  "trainerUpdateProfile",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put("/api/trainer/updateProfile", data,{
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },});
      return res.data.data;
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const trainerUpdatePassword = createAsyncThunk(
  "updateTrainerPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`/api/trainer/updatePassword`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },});
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

export const trainerForgotPassword = createAsyncThunk(
  "forgotpassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post(`/api/trainer/forgot-password`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },});
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

export const trainerValidateForgotPassword = createAsyncThunk(
  "validatePassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `/api/trainer/validate-forgot-password-otp`,
        data,{
          headers: {
            Authorization: `Bearer ${cookie.get("trainer_token")}`, 
          },}
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

export const trainerResetPassword = createAsyncThunk(
  "resetPassword",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/trainer/reset-password`, data,{
        headers: {
          Authorization: `Bearer ${cookie.get("trainer_token")}`, 
        },});
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

export const trainerLogOut = createAsyncThunk(
  "trainerLogout",
  async (_, thunAPI) => {
    const { rejectWithValue } = thunAPI;
    try {
      const res = await axios.delete(`/api/trainer/logout`);
      let cookie = new Cookies();
      cookie.remove("trainer_token");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data?.message)
        return rejectWithValue(error.response.data.message);
      else return rejectWithValue("There was an Error");
    }
  }
);

export const trainerSlice = createSlice({
  name: "trainerSlice",
  initialState: {
    loading: false,
    error: null,
    loadingPass: false,
    errorPass: null,
    trainer: {},
    msg: "",
    location: "",
    status: false,
  } as TrainerState,
  reducers: {
    trainerAuthCompletedOperation: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(trainerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerLogin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.trainer = action.payload;
      })
      .addCase(trainerLogin.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(trainerRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerRegister.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.trainer = action.payload;
        state.status = true;
      })
      .addCase(trainerRegister.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
        state.status = true;
      })
      .addCase(getTrainerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainerProfile.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.trainer = action.payload;
      })
      .addCase(getTrainerProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(trainerUpdatePassword.pending, (state) => {
        state.loadingPass = true;
        state.errorPass = null;
      })
      .addCase(trainerUpdatePassword.fulfilled, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = null;
        state.trainer = action.payload;
      })
      .addCase(trainerUpdatePassword.rejected, (state, action: any) => {
        state.loadingPass = false;
        state.errorPass = action.payload;
      })
      .addCase(trainerLogOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerLogOut.fulfilled, (state, action: any) => {
        state.error = null;
        state.loading = false;
        state.trainer = null;
      })
      .addCase(trainerLogOut.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(trainerForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerForgotPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload;
      })
      .addCase(trainerForgotPassword.rejected, (state, action: any) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(trainerValidateForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        trainerValidateForgotPassword.fulfilled,
        (state, action: any) => {
          state.error = null;
          state.loading = false;
          state.msg = action.payload;
        }
      )
      .addCase(trainerValidateForgotPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(trainerResetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerResetPassword.fulfilled, (state, action: any) => {
        state.loading = false;
        state.error = null;
        state.msg = action.payload;
      })
      .addCase(trainerResetPassword.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(trainerUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainerUpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.trainer = action.payload;
      })
      .addCase(trainerUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { trainerAuthCompletedOperation } = trainerSlice.actions;
export default trainerSlice.reducer;
