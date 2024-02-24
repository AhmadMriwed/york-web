import Cookies from "universal-cookie";
import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
        console.log(res)
        return res.data.data
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})
export const adminForgotPassword = createAsyncThunk("forgotpassword", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const res = await axios.post(`${baseURL}admin/forgot-password`, data)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
export const adminValidateForgotPassword = createAsyncThunk("validatePassword", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    console.log("data", data)
    try {
        const res = await axios.post(`${baseURL}admin\validate-forgot-password-otp`,data)
        return res.data
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
const initialState = {
    loading: false,
    error: null,
    admin: "",
    msg: ""
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
            .addCase(adminValidateForgotPassword.pending,(state)=>{
                state.loading=true
            })
            .addCase(adminValidateForgotPassword.fulfilled,(state,action:any)=>{
                state.error=null
                state.loading=false
                state.msg=action.payload
            })
            .addCase(adminValidateForgotPassword.rejected,(state,action:any)=>{
                state.loading=false
                state.error=action.payload
            })
    }
});


export default authSlice.reducer


