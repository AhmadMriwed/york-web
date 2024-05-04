import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitCourseState } from "@/types/adminTypes/courses/coursesTypes";

// get submit courses by type
export const getSubmitCoursesByType = createAsyncThunk(
  "submitCourses/getSubmitCoursesByType",
  async (type: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/submit_courses/get${type}SubmitCourse`
      );
      if (res.status === 200) {
        console.log("success submit courses");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get submit course details
export const getSubmitDetails = createAsyncThunk(
  "submitCourses/getSubmitDetails",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/submit_courses/${id}`);
      if (res.status === 200) {
        console.log("success submit details");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get course ad submits
export const getAdSubmitCourses = createAsyncThunk(
  "courseAds/getAdSubmitCourses",
  async (params: { id: number; type: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(
        `admin/course_ads/${params.id}/submitCourses?status=${params.type}`
      );
      if (res.status === 200) {
        console.log("success course ad submits");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// reject/accept submit course
export const replySubmitCourse = createAsyncThunk(
  "submitCourses/replySubmitCourse",
  async (
    params: { id: number; type: "accept" | "rejected"; cause: string },
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/submit_courses/${params.type}SubmitCourseById/${params.id}`,
        { cause: params.cause }
      );
      console.log(res);
      if (res.status === 200) {
        console.log("success accept/reject");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// create invoice
export const createInvoice = createAsyncThunk(
  "submitCourses/createInvoice",
  async (invoiceData: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/invoice", invoiceData);
      console.log(res);
      if (res.status === 201) {
        console.log("success create invoice");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const submitCourses = createSlice({
  name: "submitCourses",
  initialState: {
    isLoading: false,
    error: null,
    submitCourses: [],
    adSubmitCourses: [],
    submitDetails: null,
    /* operations */
    operationLoading: false,
    operationError: null,
    status: false,
  } as submitCourseState,
  reducers: {
    submitCourseOperationCompleted: (state: any) => {
      state.status = false;
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get submit courses by type
    builder
      .addCase(getSubmitCoursesByType.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSubmitCoursesByType.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.submitCourses = action.payload.data;
      })
      .addCase(getSubmitCoursesByType.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get submit course details
    builder
      .addCase(getSubmitDetails.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSubmitDetails.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.submitDetails = action.payload.data;
      })
      .addCase(getSubmitDetails.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get course ad submit courses
    builder
      .addCase(getAdSubmitCourses.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAdSubmitCourses.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.adSubmitCourses = action.payload.data;
      })
      .addCase(getAdSubmitCourses.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // reply submit course
    builder
      .addCase(replySubmitCourse.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(replySubmitCourse.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(replySubmitCourse.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // create invoice
    builder
      .addCase(createInvoice.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(createInvoice.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default submitCourses.reducer;
export const { submitCourseOperationCompleted } = submitCourses.actions;
