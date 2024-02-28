import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  joinedUserType,
  joinedUsersState,
} from "@/types/adminTypes/sessions/sessionsTypes";

// get users by type
export const getUsersByType = createAsyncThunk(
  "joinedUsers/getUsersByType",
  async (params: { type: string; id: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainingSession/jointUser/${params.type}?training_session=${params.id}`
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

// change user status
export const changeUserStatus = createAsyncThunk(
  "joinedUsers/changeUserStatus",
  async (
    data: {
      id: number;
      ids: number[];
      status: string;
      userType: string;
    },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/trainingSession/jointUser/change_status?training_session=${data.id}`,
        { ids: data.ids, status: data.status }
      );
      if (res.status === 200) {
        return {
          ids: data.ids,
          status: data.status,
          userType: data.userType,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const updateUserStatus = (
  users: joinedUserType[],
  status: string,
  userId: number
) => {
  return users.map((user) =>
    user.user.user_id === userId ? { ...user, status: status } : user
  );
};
const updateStatusForAllArrays = (
  state: joinedUsersState,
  ids: number[],
  status: string,
  userType: "Trainer" | "Trainee" | "User"
) => {
  ids.forEach((userId) => {
    switch (userType) {
      case "Trainer":
        state.trainers = updateUserStatus(state.trainers, status, userId);
        break;
      case "Trainee":
        state.trainees = updateUserStatus(state.trainees, status, userId);
        break;
      case "User":
        state.clients = updateUserStatus(state.clients, status, userId);
        break;
      default:
        break;
    }
  });
};

const joinedUsers = createSlice({
  name: "joinedUsers",
  initialState: {
    isLoading: false,
    error: null,
    trainers: [],
    trainees: [],
    clients: [],
    /* operations */
    operationLoading: false,
    operationError: null,
  } as joinedUsersState,

  reducers: {
    joinedUsersCompleted: (state: joinedUsersState) => {
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get users by type
    builder
      .addCase(getUsersByType.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getUsersByType.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        switch (action.payload.type) {
          case "Trainers":
            state.trainers = action.payload.data;
            break;
          case "Trainees":
            state.trainees = action.payload.data;
            break;
          case "Clients":
            state.clients = action.payload.data;
            break;
          default:
            break;
        }
      })
      .addCase(getUsersByType.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // change user status
    builder
      .addCase(changeUserStatus.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(changeUserStatus.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        updateStatusForAllArrays(
          state,
          action.payload.ids,
          action.payload.status,
          action.payload.userType
        );
      })
      .addCase(changeUserStatus.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export default joinedUsers.reducer;
export const { joinedUsersCompleted } = joinedUsers.actions;
