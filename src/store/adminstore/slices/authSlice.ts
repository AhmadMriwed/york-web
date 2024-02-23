import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const loginAdmin = createAsyncThunk('login', async (data: any,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log("data", data);
    try {
        const res = await axios.post(`${baseURL}admin/login`, data)
        console.log(res.status)
        if (res.status === 200) {
            console.log("success")
            return res.data.data
        }

    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error.message);
    }
})


const initialState = {
    loading: false,
    error: null,
    admin: "",
    token: ""
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

    }
});


export default authSlice.reducer


