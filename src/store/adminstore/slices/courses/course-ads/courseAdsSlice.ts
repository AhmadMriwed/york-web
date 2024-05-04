import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  courseAdType,
  courseAdsState,
} from "@/types/adminTypes/courses/coursesTypes";

// get filtered course ads
export const getCourseAds = createAsyncThunk(
  "courseAds/getCourseAds",
  async (filterValues: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        "admin/course_ads/getAll?page=1",
        filterValues
      );
      if (res.status === 200) {
        console.log("success course ads");
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
  "courseAds/getFilterData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get("admin/course_ads/getMap/filterCourse");
      if (res.status === 200) {
        console.log("success filter data");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get course ad info
export const getCourseAdInfo = createAsyncThunk(
  "courseAds/getCourseAdInfo",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`admin/course_ads/${id}`);
      if (res.status === 200) {
        console.log("success course ad info");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// create new course ad
export const createCourseAd = createAsyncThunk(
  "courseAds/createCourseAd",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post("admin/course_ads", data);
      if (res.status === 201) {
        console.log("success ad created");
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// update course ad
export const updateCourseAd = createAsyncThunk(
  "courseAds/updateCourseAd",
  async (params: { data: {}; id?: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `admin/course_ads/update/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        console.log("success ad updated");
        return { status: true };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// delete course ad
export const deleteCourseAd = createAsyncThunk(
  "courseAds/deleteCourseAd",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.delete(`admin/course_ads/${id}`);
      if (res.status === 200) {
        console.log("success ad deleted");
        return { id };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// duplicate course ad
export const duplicateCourseAd = createAsyncThunk(
  "courseAds/duplicateCourseAd",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(`admin/course_ads/replicate/${id}`);
      if (res.status === 200) {
        console.log("success ad duplicated");
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// activation operation
export const changeAdStatus = createAsyncThunk(
  "courseAds/changeAdStatus",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(`admin/course_ads/operation/activity/${id}`);
      if (res.status === 200) {
        console.log("success ad status changed");
        return res.data.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const filterDeletedCourseAd = (ads: courseAdType[], id: number) => {
  return ads.filter((ad) => ad.id !== id);
};
const addElementToArr = (e: any, arr: any) => {
  arr.unshift(e);
};

const courseAds = createSlice({
  name: "courseAds",
  initialState: {
    isLoading: false,
    error: null,
    // allCourseAds: [],
    courseAds: [],
    filterData: {},
    courseAdInfo: {},
    /* operations */
    operationLoading: false,
    operationError: null,
    status: false,
  } as courseAdsState,
  reducers: {
    courseAdOperationCompleted: (state: courseAdsState) => {
      state.status = false;
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get filtered course ads
    builder
      .addCase(getCourseAds.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseAds.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseAds = action.payload.data;
      })
      .addCase(getCourseAds.rejected, (state, action: any) => {
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

    // get course ad info
    builder
      .addCase(getCourseAdInfo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseAdInfo.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseAdInfo = action.payload.data;
      })
      .addCase(getCourseAdInfo.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // create new course ad
    builder
      .addCase(createCourseAd.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(createCourseAd.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(createCourseAd.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // update course ad
    builder
      .addCase(updateCourseAd.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updateCourseAd.fulfilled, (state) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(updateCourseAd.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // delete course ad
    builder
      .addCase(deleteCourseAd.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(deleteCourseAd.fulfilled, (state, action: any) => {
        state.error = null;
        state.operationLoading = false;
        state.courseAds = filterDeletedCourseAd(
          state.courseAds,
          action.payload.id
        );
        state.status = true;
      })
      .addCase(deleteCourseAd.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // duplicate course ad
    builder
      .addCase(duplicateCourseAd.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(duplicateCourseAd.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        addElementToArr(action.payload, state.courseAds);
        state.status = true;
      })
      .addCase(duplicateCourseAd.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });

    // activate/deactivate course ad
    builder
      .addCase(changeAdStatus.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(changeAdStatus.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
        // updateStatusForAllArrays(
        //   state,
        //   action.payload.ids,
        //   action.payload.status,
        //   action.payload.classification
        // );
        // if (state.courseAdInfo) state.courseAdInfo.status = action.payload.status;
      })
      .addCase(changeAdStatus.rejected, (state, action: any) => {
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default courseAds.reducer;
export const { courseAdOperationCompleted } = courseAds.actions;
