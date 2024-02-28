import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import axios from "axios";
import { baseURL } from "@/utils/api";
export const trainerRegister = createAsyncThunk("trainerRegister", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data)
    let cookies = new Cookies();
    try {
        const res = await axios.post(`${baseURL}trainer/register`, data)
        if (res.status === 201) {
            console.log(res, "trainer register")
            let token = res.data.data.access_token
            cookies.set("trainerSignUp_token", token)
            return res.data.data
        }
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})
export const trainerLogin = createAsyncThunk("trainerLogin", async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("success", data)
    const cookies = new Cookies();
    try {
        const res = await axios.post(`${baseURL}trainer/login`, data)
        console.log(res, "trainer login")
        if (res.status === 200) {
            console.log("login success")
            let token = res.data.data.access_token
            cookies.set("trainer_token", token)
            return res.data.data
        }
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message)
    }
})
export const getTrainerProfile = createAsyncThunk("getProfile", async (token: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const res = await axios.get(`${baseURL}trainer`, {
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
export const trainerUpdatePassword = createAsyncThunk("updatePassword", async (params: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    console.log("data", params)
    try {
        const res = await axios.put(`${baseURL}trainer/updatePassword`,
            params.data, {
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
export const trainerLogOut = createAsyncThunk("trainerLogout", async (token, thunAPI) => {
    const { rejectWithValue } = thunAPI
    try {
        const res = await axios.delete(`${baseURL}trainer/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let cookie = new Cookies()
        cookie.remove("trainer_token")
        return res.data
    } catch (error: any) {
        console.log(error.message)
        return rejectWithValue(error.message)
    }
})
const initialState = {
    loading: false,
    error: null,
    loadingPass: false,
    errorPass: null,
    trainer: ""

}

export const trainerSlice = createSlice({
    name: "trainerSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //trainer login
            .addCase(trainerLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(trainerLogin.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.trainer = action.payload
            })
            .addCase(trainerLogin.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            //trainer register
            .addCase(trainerRegister.pending, (state) => {
                state.loading = true
            })
            .addCase(trainerRegister.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.trainer = action.payload
            })
            .addCase(trainerRegister.rejected, (state, action: any) => {
                state.error = action.payload
                state.loading = false
            })
            //get trainer profile
            .addCase(getTrainerProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getTrainerProfile.fulfilled, (state, action: any) => {
                state.loading = false
                state.error = null
                state.trainer = action.payload
            })
            .addCase(getTrainerProfile.rejected, (state, action: any) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(trainerUpdatePassword.pending, (state) => {
                state.loadingPass = true;
            })
            .addCase(trainerUpdatePassword.fulfilled, (state, action: any) => {
                state.loadingPass = false
                state.errorPass = null
                state.trainer = action.payload
            })
            .addCase(trainerUpdatePassword.rejected, (state, action: any) => {
                state.loadingPass = false
                state.errorPass = action.payload
            })
    }
})

export default trainerSlice.reducer