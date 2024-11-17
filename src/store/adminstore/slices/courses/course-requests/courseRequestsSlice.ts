import { courseRequestsState } from "@/types/adminTypes/courses/coursesTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// get course requests
export const getCourseRequests = createAsyncThunk(
  "courseRequests/getCourseRequests",
  async (type: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/course/course_repuest/get?type=${type}`
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

// accept course requests
export const acceptCourseRequest = createAsyncThunk(
  "courseRequests/acceptCourseRequest",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(`admin/course/course_repuest/accept/${id}`);
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

// reject course requests
export const rejectCourseRequest = createAsyncThunk(
  "courseRequests/rejectCourseRequest",
  async (params: { id: number; cause: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/course/course_repuest/reject/${params.id}?cause=${params.cause}`
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

const courseRequests = createSlice({
  name: "courseRequests",

  initialState: {
    isLoading: false,
    error: null,
    courseRequests: [],
    /* operations */
    operationLoading: false,
    operationError: null,
    status: false,
  } as courseRequestsState,

  reducers: {
    courseRequestOperationCompleted: (state: courseRequestsState) => {
      state.status = false;
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get course requests
    builder
      .addCase(getCourseRequests.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseRequests.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseRequests = action.payload.data;
      })
      .addCase(getCourseRequests.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // accept course request
    builder
      .addCase(acceptCourseRequest.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(acceptCourseRequest.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.courseRequests = state.courseRequests.map((req) => {
          return req.id === action.payload.id
            ? { ...action.payload.data }
            : req;
        });
      })
      .addCase(acceptCourseRequest.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // reject course request
    builder
      .addCase(rejectCourseRequest.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(rejectCourseRequest.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        state.courseRequests = state.courseRequests.map((req) => {
          return req.id === action.payload.id
            ? { ...action.payload.data }
            : req;
        });
      })
      .addCase(rejectCourseRequest.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default courseRequests.reducer;
export const { courseRequestOperationCompleted } = courseRequests.actions;
