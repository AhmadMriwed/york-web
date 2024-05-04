import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  courseType,
  coursesState,
} from "@/types/adminTypes/courses/coursesTypes";

// get filtered courses
export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (filterValues: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/course/getAll?page=1", filterValues);
      if (res.status === 200) {
        console.log("success filtered courses");
        return {
          data: res.data.data,
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
      const res = await Axios.get(
        `admin/course/getCoursesById?user_id=${params.id}&status=${params.status}`
      );
      if (res.status === 200) {
        console.log("success courses by id");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get filter data
export const getFilterData = createAsyncThunk(
  "courses/getFilterData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get("admin/course/getMap/filterCourse");
      if (res.status === 200) {
        console.log("success course filtering data");
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
      const res = await Axios.get(`admin/course/${id}`);
      if (res.status === 200) {
        console.log("success course info");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// create course
export const createCourse = createAsyncThunk(
  "courses/createCourse",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("creating course");
      const res = await Axios.post("admin/course", data);
      if (res.status === 200) {
        console.log("course created");
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
      console.log("updating course");
      const res = await Axios.post(
        `admin/course/update/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        console.log("course updated");
        return { status: true };
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
      console.log("deleting course");
      const res = await Axios.delete(`admin/course/${id}`);
      if (res.status === 200) {
        console.log("course deleted");
        return { id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// // duplicate course
// export const duplicateCourse = createAsyncThunk(
//   "courses/duplicateCourse",
//   async (id: number, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await Axios.post(`admin/course/replicate/${id}`);
//       if (res.status === 200) {
//         return res.data.data;
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // activation operation
// export const changeCourseStatus = createAsyncThunk(
//   "courses/changeCourseStatus",
//   async (id: number, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await Axios.post(`admin/course/operation/activity/${id}`);
//       if (res.status === 200) {
//         return res.data.data;
//       }
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

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
  },

  extraReducers: (builder) => {
    // get filtered courses
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
      .addCase(updateCourse.fulfilled, (state) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
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
  },
});

export default courses.reducer;
export const { courseOperationCompleted } = courses.actions;
