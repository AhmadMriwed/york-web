import { login } from "../actions/auth.action";

const { createSlice } = require("@reduxjs/toolkit");

const authReducer= createSlice({
    name: 'login',
    initialState : {
        user: [],
        isLoading: false,
        isAuth: false,
    },
    // reducers: {
    //     logout(state) {
    //         state.isAuth = false;
    //         state.user = null;
    //     }
    // },
    extraReducers: (builder: any) => {
        builder
            .addCase(login.pending, (state: any) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.isAuth = true,
                state.user = action.payload;
            })
            .addCase(login.rejected, (state: any, action: any) => {
                state.isLoading = false;
                state.isAuth = false;
            });
    }
});
// export const { logout } = authReducer.actions;
export default authReducer.reducer;

// const coursesReducer = createSlice({
//     name: "courses",
//     initialState: {
//       data: [],
//       courseById: {},
//       isLoading: false,
//     },
  
//     reducers: {},
  
//     extraReducers: (builder) => {
//       builder
//           .addCase(get.pending, (state) => {
//               state.isLoading = true;
//           })
//           .addCase(get.fulfilled, (state, action) => {
//               state.isLoading = false;
//               state.data = action.payload;
//           })
//           .addCase(get.rejected, (state) => {
//               state.isLoading = false;
//           });
  
//       builder
//           .addCase(getById.fulfilled, (state, action) => {
//               state.courseById = action.payload;
//           });
//     },
//   });
  
//   export default coursesReducer.reducer;
