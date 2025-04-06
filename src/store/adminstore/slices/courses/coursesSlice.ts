import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  courseType,
  coursesState,
} from "@/types/adminTypes/courses/coursesTypes";
import axios from "axios";
import Cookie from "universal-cookie";
import { getAuthHeaders } from "../enums/authHeaders";

 const cookie = new Cookie();


// get all courses
export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (filterValues: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("/api/admin/course/getAll?page=1", filterValues, getAuthHeaders());
      
      console.log(res.data.data);
      if (res.status === 200) {
        return {
          data: res.data.data 
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
// get courses by trainer id
export const getCoursesById = createAsyncThunk(
  "courses/getCoursesById",
  async (params: { id: number; status: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `/api/admin/course/getCoursesById?user_id=${params.id}&status=${params.status}`,getAuthHeaders()
      );
      console.log(res.data.data);
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

// get course by id
export const getCourseInfo = createAsyncThunk(
  "courses/getCourseInfo",
  async (id: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/api/admin/course/${id}`,getAuthHeaders());
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

// get filter data
export const getFilterData = createAsyncThunk(
  "courses/getFilterData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get("/api/admin/course/getMap/filterCourse",getAuthHeaders());
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

// create course
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post("admin/course", data,{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`, 
        },
      });
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update course
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async (params: { data: {}; id?: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(
        `/api/admin/course/update/${params.id}`,
        params.data,getAuthHeaders()
        
      );
      if (res.status === 200) {
        return { data: res.data.data, id: params.id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// delete course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/api/admin/course/${id}`,getAuthHeaders());
      if (res.status === 200) {
        return { id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// duplicate course
export const duplicateCourse = createAsyncThunk(
  "courses/duplicateCourse",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/admin/course/replicate/${id}`,getAuthHeaders());
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const filterDeletedCourse = (courses: courseType[], id: number) => {
  return courses.filter((c) => c.id !== id);
};

const addElementToArr = (e: any, arr: any) => {
  arr.unshift(e);
};

const courses = createSlice({
  name: "courses",

  initialState: {
    isLoading: false,
    error: null,
    allCourses: [],
    filterData: {},
    courseInfo: null,
    courseId: null,
    /* operations */
    operationLoading: false,
    operationError: null,
    status: false,
  } as coursesState,

  reducers: {
    courseOperationCompleted: (state: coursesState) => {
      state.operationError = null;
      state.status = false;
    },
    updateCourseId: (state: coursesState, action) => {
      state.courseId = action.payload;
    },
  },

  extraReducers: (builder) => {
    // get all courses
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.allCourses = action.payload.data;
      })
      .addCase(getAllCourses.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get courses by trainer Id
    builder
      .addCase(getCoursesById.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCoursesById.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.allCourses = action.payload.data;
      })
      .addCase(getCoursesById.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get filter data
    builder
      .addCase(getFilterData.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFilterData.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.filterData = action.payload.data;
      })
      .addCase(getFilterData.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get single course
    builder
      .addCase(getCourseInfo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseInfo.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseInfo = action.payload.data;
        if (state.courseInfo) state.courseId = state.courseInfo.id;
      })
      .addCase(getCourseInfo.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create new course
    builder
      .addCase(createCourse.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(createCourse.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(createCourse.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // update course
    builder
      .addCase(updateCourse.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;

        if (state.courseInfo) state.courseInfo = { ...action.payload.data };

        state.allCourses = state.allCourses.map((course) =>
          course.id === action.payload.id ? { ...action.payload.data } : course
        );
      })
      .addCase(updateCourse.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // delete course
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action: any) => {
        state.error = null;
        state.operationLoading = false;
        state.allCourses = filterDeletedCourse(
          state.allCourses,
          action.payload.id
        );
        state.status = true;
      })
      .addCase(deleteCourse.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // duplicate course
    builder
      .addCase(duplicateCourse.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(duplicateCourse.fulfilled, (state, action: any) => {
        state.error = null;
        state.operationLoading = false;
        addElementToArr(action.payload, state.allCourses);
        state.status = true;
      })
      .addCase(duplicateCourse.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default courses.reducer;
export const { courseOperationCompleted, updateCourseId } = courses.actions;
