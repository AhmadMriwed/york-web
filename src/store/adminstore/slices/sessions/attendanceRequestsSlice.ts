import {
  attendanceState,
  attendanceType,
} from "@/types/adminTypes/sessions/sessionsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get attendance requests by type
export const getAttendanceRequests = createAsyncThunk(
  "attendanceRequests/getAttendanceRequests",
  async (params: { type: string; id: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainingSession/attendanceSession/${params.type}?training_session_id=${params.id}`
      );
      if (res.status === 200) {
        return {
          data: res.data.data,
          type: params.type,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get unattendance users
export const getUnattendanceUsers = createAsyncThunk(
  "attendanceRequests/getUnattendanceUsers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainingSession/attendanceSession/get_unattendance_users`
      );
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// add attendant
export const addAttendant = createAsyncThunk(
  "attendanceRequests/addAttendant",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/trainingSession/attendanceSession`,
        data
      );
      if (res.status === 201) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update attendance
export const updateAttendance = createAsyncThunk(
  "attendanceRequests/updateAttendance",
  async (params: { data: any; id: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.put(
        `admin/trainingSession/attendanceSession/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceRequests = createSlice({
  name: "attendanceRequests",
  initialState: {
    isLoading: false,
    error: null,
    accepted: [],
    rejected: [],
    pending: [],
    attendUsers: [],
    usersLoading: false,
    /* operations */
    operationLoading: false,
    operationError: null,
    status: false,
  } as attendanceState,

  reducers: {
    attendanceOperationCompleted: (state: attendanceState) => {
      state.status = false;
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get attendance requests by type
    builder
      .addCase(getAttendanceRequests.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAttendanceRequests.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        switch (action.payload.type) {
          case "Accepted":
            state.accepted = action.payload.data;
            break;
          case "Rejected":
            state.rejected = action.payload.data;
            break;
          case "Pending":
            state.pending = action.payload.data;
            break;
          default:
            break;
        }
      })
      .addCase(getAttendanceRequests.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get unattendance users
    builder
      .addCase(getUnattendanceUsers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUnattendanceUsers.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.attendUsers = action.payload;
      })
      .addCase(getUnattendanceUsers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // add attendant
    builder
      .addCase(addAttendant.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addAttendant.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        switch (action.payload.status) {
          case "Accept":
            state.accepted.unshift(action.payload);
            break;
          case "Rejected":
            state.rejected.unshift(action.payload);
            break;
          case "Pending":
            state.pending.unshift(action.payload);
            break;
          default:
            break;
        }
        state.status = true;
      })
      .addCase(addAttendant.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });

    // update attendance
    builder
      .addCase(updateAttendance.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateAttendance.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.pending = state.pending.filter(
          (attend: attendanceType) => attend.id !== action.payload.data.id
        );
        switch (action.payload.data.status) {
          case "Accept":
            state.accepted.unshift(action.payload.data);
            break;
          case "Rejected":
            state.rejected.unshift(action.payload.data);
            break;
          default:
            break;
        }
      })
      .addCase(updateAttendance.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export default attendanceRequests.reducer;
export const { attendanceOperationCompleted } = attendanceRequests.actions;
