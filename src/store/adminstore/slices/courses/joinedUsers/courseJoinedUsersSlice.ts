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
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// get course requests to join
export const getRequestsToJoin = createAsyncThunk(
  "courseJoinedUsers/getRequestsToJoin",
  async (
    params: { id: number; type: "Accepted" | "Rejected" | "Current" },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/request_join_course/get${params.type}RequestJoinCourse?course_id=${params.id}`
      );
      if (res.status === 200) {
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
        return {
          data: res.data.data,
          id: params.id,
          type: params.type,
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
        return {
          data: res.data.data,
          id: id,
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
        return {
          data: res.data.data,
          id: id,
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
        return {
          data: res.data.data,
          id: id,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// accept request to join
export const acceptRequest = createAsyncThunk(
  "courseJoinedUsers/acceptRequest",
  async (params: { id: number; permission: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/request_join_course/acceptRequestJoinCourse/${params.id}`,
        { permission_courses_id: params.permission }
      );
      if (res.status === 200) {
        return {
          data: res.data.data,
          id: params.id,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// reject request to join
export const rejectRequest = createAsyncThunk(
  "courseJoinedUsers/rejectRequest",
  async (params: { id: number; cause: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/request_join_course/rejectedRequestJoinCourse/${params.id}?cause=${params.cause}`
      );
      if (res.status === 200) {
        return {
          data: res.data.data,
          id: params.id,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// add client
export const addClient = createAsyncThunk(
  "courseJoinedUsers/addClient",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/clientcourse", data);
      if (res.status === 201) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// add trainer
export const addTrainer = createAsyncThunk(
  "courseJoinedUsers/addTrainer",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/trainer_course", data);
      if (res.status === 201) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// add trainee
export const addTrainee = createAsyncThunk(
  "courseJoinedUsers/addTrainee",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/trainee_course", data);
      if (res.status === 201) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const addElementToArr = (e: any, arr: any) => arr.unshift(e);

const courseJoinedUsers = createSlice({
  name: "courseJoinedUsers",

  initialState: {
    isLoading: false,
    error: null,
    courseClients: [],
    courseTrainers: [],
    courseTrainees: [],
    requestsToJoin: [],
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

    // get course requests to join
    builder
      .addCase(getRequestsToJoin.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getRequestsToJoin.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.requestsToJoin = action.payload.data;
      })
      .addCase(getRequestsToJoin.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update course joined user
    builder
      .addCase(updateJoinedUser.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateJoinedUser.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        if (action.payload.type.includes("client")) {
          state.courseClients = state.courseClients.map((client) =>
            client.id === action.payload.id
              ? { ...action.payload.data }
              : client
          );
        }
        if (action.payload.type.includes("trainer")) {
          state.courseTrainers = state.courseTrainers.map((trainer) =>
            trainer.id === action.payload.id
              ? { ...action.payload.data }
              : trainer
          );
        }
        if (action.payload.type.includes("trainee")) {
          state.courseTrainees = state.courseTrainees.map((trainee) =>
            trainee.id === action.payload.id
              ? { ...action.payload.data }
              : trainee
          );
        }
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

        state.courseTrainers = state.courseTrainers.filter(
          (trainer) => trainer.id !== action.payload.id
        );
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

        state.courseTrainees = state.courseTrainees.filter(
          (trainee) => trainee.id !== action.payload.id
        );
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

        state.courseClients = state.courseClients.filter(
          (client) => client.id !== action.payload.id
        );
      })
      .addCase(deleteClient.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // accept course request to join
    builder
      .addCase(acceptRequest.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(acceptRequest.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.requestsToJoin = state.requestsToJoin.map((req) =>
          req.id === action.payload.id ? { ...action.payload.data } : req
        );
      })
      .addCase(acceptRequest.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // reject course request to join
    builder
      .addCase(rejectRequest.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(rejectRequest.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.requestsToJoin = state.requestsToJoin.map((req) =>
          req.id === action.payload.id ? { ...action.payload.data } : req
        );
      })
      .addCase(rejectRequest.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // add client
    builder
      .addCase(addClient.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addClient.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        addElementToArr(action.payload.data, state.courseClients);
      })
      .addCase(addClient.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // add trainer
    builder
      .addCase(addTrainer.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addTrainer.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        addElementToArr(action.payload.data, state.courseTrainers);
      })
      .addCase(addTrainer.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // add trainee
    builder
      .addCase(addTrainee.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addTrainee.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        addElementToArr(action.payload.data, state.courseTrainees);
      })
      .addCase(addTrainee.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default courseJoinedUsers.reducer;
export const { courseUserOperationCopmleted } = courseJoinedUsers.actions;
