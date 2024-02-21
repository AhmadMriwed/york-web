import { baseURL } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminState } from "@/types/adminTypes/accounts/accountsTypes";
export const loginAdmin = createAsyncThunk('login', async (data: any, { rejectWithValue }) => {
    console.log("data", data);
    try {
        const res = await axios.post(`${baseURL}admin/login`, data)
        // console.log(res, "admin login");
        // if (res.status === 200) {
        //     console.log(data, "logged in  successfully");
        //     return data;
        // }
        return res
    } catch (error: any) {
        console.log("Error", error.message)
        return rejectWithValue(error);
    }
})


const initialState = {
    loading: false,
    admin: "",
    error: null,
    token: ""
}
const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        // addToken: (state, sction) => {
        //     state.token = localStorage.getItem("token")
        // },
        // logout: (state, action) => {
        //     state.token = null
        //     localStorage.clear()
        // }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action: any) => {
                state.loading = false;
                state.admin = action.payload
                // state.users.push(action.payload);
            })
            .addCase(loginAdmin.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload.message;
            })

    }
});

// export const { addToken, logout } = authSlice.actions
export default authSlice.reducer

// builder
// .addCase(loginAdmin.pending, (state) => {
//     state.loading = true;
//     state.error = null;

// })
// .addCase(loginAdmin.fulfilled, (state, action: any) => {
//     state.loading = false;
//     state.error = null;
//     state.admin = action.payload;
//     // state.token=action.payload.token
//     // localStorage.setItem("adminInfo", JSON.stringify(res))
// })
// .addCase(loginAdmin.rejected, (state, action: any) => {
//     state.loading = false;
//     state.error = action.payload

