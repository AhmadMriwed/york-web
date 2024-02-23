import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("userLogin", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("success", data)
    try {
        const res = await axios.post(`${baseURL}user/login`, data)
        console.log(res, "user login")
        if (res.status === 200) {
            console.log("login success")
            return res.data.data
        }
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})

export const userRegister = createAsyncThunk("userRegister", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data)
    try {
        const res = await axios.post(`${baseURL}user/register`, data)
        console.log(res, "user register")
        return res.data.data
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})

export const updateUserProfile = createAsyncThunk("updateProfile", async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axios.put(`${baseURL}user/updateProfile`, params.data)
        console.log(res, "user edit");
        if (res.status === 200) {
            console.log("updated successfully");
            return params.data;
        }
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }

})

const initialState = {
    user: "",
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(userLogin.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(userRegister.pending, (state) => {
                state.loading = true
            })
            .addCase(userRegister.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload
            })
            .addCase(userRegister.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(updateUserProfile.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default userSlice.reducer