import Cookies from "universal-cookie";
import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookie } from "next/font/google";
export const loginAdmin = createAsyncThunk('login', async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data);
    const cookies = new Cookies();
    try {
        const res = await axios.post(`${baseURL}admin/login`, data)
        console.log(res.status)
        if (res.status === 200) {
            console.log("success")
            const token = res.data.data.access_token
            cookies.set("token", token)
            return res.data.data
        }

    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message);
    }
})

export const getAdminProfile = createAsyncThunk("getProfile", async (token: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(`${baseURL}admin`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (res.status === 200) {
            console.log(res)
            return res.data.data
        }

    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})
export const adminForgotPassword = createAsyncThunk("forgotpassword", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await axios.post(`${baseURL}admin/forgot-password`, data)
        if (res.status === 200) {
            console.log(res, "success")
            return res.data.data
        }
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
export const adminValidateForgotPassword = createAsyncThunk("validatePassword", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    console.log("data", data)
    try {
        const res = await axios.post(`${baseURL}admin/validate-forgot-password-otp`, data)
        console.log(res)
        return res.data.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
export const adminResetPassword = createAsyncThunk("resetPassword", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    console.log("data", data)
    try {
        const res = await axios.post(`${baseURL}admin/reset-password`, data)
        console.log(res)
        return res.data.data
    } catch (error: any) {
        console.log(error.message)
        return rejectWithValue(error.message)
    }
})
export const adminUpdatePassword = createAsyncThunk("updatePassword", async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    console.log("data", params)
    try {
        const res = await axios.put(`${baseURL}admin/updatePassword?old_password=${params.data.old_password}&new_password=${params.data.new_password}&new_password_confirmation=${params.data.new_password_confirmation}`, {
            old_password: params.data.old_password,
            new_password: params.data.new_password
        }, {
            headers: {
                Authorization: `Bearer ${params.token}`
            }
        })
        if (res.status === 200) {
            console.log(res, "password updated successfully")
            return res.data.data
        }

    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})

export const adminLogOut = createAsyncThunk("adminLogout", async (token, thunAPI) => {
    const { rejectWithValue } = thunAPI
    try {
        const res = await axios.delete(`${baseURL}admin/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let cookie = new Cookies()
        cookie.remove("token")
        return res.data
    } catch (error: any) {
        console.log(error.message)
        return rejectWithValue(error.message)
    }
})
const initialState = {
    loading: false,
    error: null,
    admin: "",
    msg: "",
    loadingPass: false,
    errorPass: null
}
const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null
                state.admin = action.payload
            })
            .addCase(loginAdmin.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAdminProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getAdminProfile.fulfilled, (state, action: any) => {
                state.loading = false;
                state.admin = action.payload;
                state.error = null
            })
            .addCase(getAdminProfile.rejected, (state, action: any) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(adminForgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(adminForgotPassword.fulfilled, (state, action: any) => {
                state.loading = false
                state.error = null
                state.msg = action.payload

            })
            .addCase(adminForgotPassword.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(adminValidateForgotPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(adminValidateForgotPassword.fulfilled, (state, action: any) => {
                state.error = null
                state.loading = false
                state.msg = action.payload
            })
            .addCase(adminValidateForgotPassword.rejected, (state, action: any) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(adminResetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminResetPassword.fulfilled, (state, action: any) => {
                state.loading = false
                state.error = null
                state.admin = action.payload
            })
            .addCase(adminResetPassword.rejected, (state, action: any) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(adminUpdatePassword.pending, (state) => {
                state.loadingPass = true;
            })
            .addCase(adminUpdatePassword.fulfilled, (state, action: any) => {
                state.loadingPass = false
                state.errorPass = null
                state.admin = action.payload
            })
            .addCase(adminUpdatePassword.rejected, (state, action: any) => {
                state.loadingPass = false
                state.errorPass = action.payload
            })
    }
});


export default authSlice.reducer


