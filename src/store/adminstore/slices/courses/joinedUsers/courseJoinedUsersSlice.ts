import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courseJoinedUsersState } from "@/types/adminTypes/courses/coursesTypes";

// get course trainers
export const getCourseTrainers = createAsyncThunk(
  "courseJoinedUsers/getCourseTrainers",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainer_course/getByCourseId?course_id=${id}`
      );
      if (res.status === 200) {
        console.log("success course trainers");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
// get course trainees
export const getCourseTrainees = createAsyncThunk(
  "courseJoinedUsers/getCourseTrainees",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/trainee_course/getByCourseId?course_id=${id}`
      );
      if (res.status === 200) {
        console.log("success course trainees");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
// get course clients
export const getCourseClients = createAsyncThunk(
  "courseJoinedUsers/getCourseClients",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/clientcourse/getByCourseId?course_id=${id}`
      );
      if (res.status === 200) {
        console.log("success course clients");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// update joined user
export const updateJoinedUser = createAsyncThunk(
  "courseJoinedUsers/updateJoinedUser",
  async (params: { id: number; type: string; data: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.put(
        `admin/${params.type}/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        console.log("success update user");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// delete joined trainer
export const deleteTrainer = createAsyncThunk(
  "courseJoinedUsers/deleteTrainer",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.delete(`admin/trainer_course/${id}`);
      if (res.status === 200) {
        console.log("success delete trainer");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
// delete joined trainee
export const deleteTrainee = createAsyncThunk(
  "courseJoinedUsers/deleteTrainee",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.delete(`admin/trainee_course/${id}`);
      if (res.status === 200) {
        console.log("success delete trainee");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
// delete joined client
export const deleteClient = createAsyncThunk(
  "courseJoinedUsers/deleteClient",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.delete(`admin/clientcourse/${id}`);
      if (res.status === 200) {
        console.log("success delete client");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const courseJoinedUsers = createSlice({
  name: "courseJoinedUsers",

  initialState: {
    isLoading: false,
    error: null,
    courseClients: [],
    courseTrainers: [],
    courseTrainees: [],
    /* operations */
    operationError: null,
    operationLoading: false,
    status: false,
  } as courseJoinedUsersState,

  reducers: {
    courseUserOperationCopmleted: (state: courseJoinedUsersState) => {
      state.operationError = null;
      state.status = false;
    },
  },

  extraReducers: (builder) => {
    // get course trainers
    builder
      .addCase(getCourseTrainers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseTrainers.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseTrainers = action.payload.data;
      })
      .addCase(getCourseTrainers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // get course trainees
    builder
      .addCase(getCourseTrainees.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseTrainees.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseTrainees = action.payload.data;
      })
      .addCase(getCourseTrainees.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // get course clients
    builder
      .addCase(getCourseClients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseClients.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseClients = action.payload.data;
      })
      .addCase(getCourseClients.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // update course user
    builder
      .addCase(updateJoinedUser.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateJoinedUser.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(updateJoinedUser.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // delete trainer
    builder
      .addCase(deleteTrainer.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteTrainer.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(deleteTrainer.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // delete trainee
    builder
      .addCase(deleteTrainee.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteTrainee.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(deleteTrainee.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
    // delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteClient.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(deleteClient.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default courseJoinedUsers.reducer;
export const { courseUserOperationCopmleted } = courseJoinedUsers.actions;
