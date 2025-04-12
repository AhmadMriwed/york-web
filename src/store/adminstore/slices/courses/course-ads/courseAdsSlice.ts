import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  courseAdType,
  courseAdsState,
} from "@/types/adminTypes/courses/coursesTypes";

import Cookie from "universal-cookie";
import axios from "axios";
import { getAuthHeaders } from "../../enums/authHeaders";

 const cookie = new Cookie();

// get filtered course ads
export const getCourseAds = createAsyncThunk(
  "courseAds/getCourseAds",
  async (filterValues: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log(filterValues)
    try {

      console.log("Request Filters:", JSON.stringify(filterValues, null, 2));
      
      // Construct the full request details
      const requestConfig = {
        method: 'post',
        url: '/api/admin/course_ads/getAll?page=1',
        data: filterValues,
        headers: getAuthHeaders()
      };
      
      console.log("Full Request Details:", {
        method: requestConfig.method,
        url: requestConfig.url,
        headers: requestConfig.headers,
        data: requestConfig.data
      });



      console.log("sending filters", filterValues);
      const res = await axios.post(
        "/api/admin/course_ads/getAll",
        filterValues,
        getAuthHeaders()
      );
      console.log("response data", res.data);
    
      if (res.status === 200) {
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      console.error("error fetching course ads", error.response?.data || error.message);
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
      const res = await axios.get("/api/admin/course_ads/getMap/filterCourse",{
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
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

// get course ad info
export const getCourseAdInfo = createAsyncThunk(
  "courseAds/getCourseAdInfo",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/api/admin/course_ads/${id}`,getAuthHeaders());
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

// create new course ad
export const createCourseAd = createAsyncThunk(
  "courseAds/createCourseAd",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    console.log('hello')
    try {
      const res = await axios.post("/api/admin/course_ads", data,getAuthHeaders());
      if (res.status === 201) {
        return res.data.data;
      }
    } catch (error: any) {
if (error.response) {
  console.error("Server error:", error.response.data);
  return rejectWithValue(error.response.data.message || error.response.data);
} else if (error.request) {
  console.error("No response received:", error.request);
  return rejectWithValue("No response from server");
} else {
  console.error("Request setup error:", error.message);
  return rejectWithValue(error.message);
}
    }
  }
);

// update course ad
export const  updateCourseAd = createAsyncThunk(
  "courseAds/updateCourseAd",
  async (params: { data: FormData; id: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    
    try {
 
      const res = await axios.post(
        `/api/admin/course_ads/update/${params.id}`,
        params.data,
       getAuthHeaders()
      );

      if (res.status === 200) {
        return res.data; // Return the full response data
      }
      return rejectWithValue("Unexpected response from server");
    } catch (error: any) {
      // Handle Axios errors more specifically
      if (error.response) {
        // Server responded with a status code outside 2xx
        console.error("Server error:", error.response.data);
        return rejectWithValue(error.response.data.message || error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        return rejectWithValue("No response from server");
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete course ad
export const deleteCourseAd = createAsyncThunk(
  "courseAds/deleteCourseAd",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`/api/admin/course_ads/${id}`,getAuthHeaders());
      console.log(res);
      if (res.status === 200) {
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
      const res = await axios.post(`/api/admin/course_ads/replicate/${id}`,{},getAuthHeaders());
      if (res.status === 200) {
        return res.data.data;
      }
      console.log(res); 
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
    const token = cookie.get("admin_token");
    
    console.log("Raw token length:", token?.length);
    console.log("Full header:", `Bearer ${token}`);

    try {
      const res = await axios.post(
        `/api/admin/course_ads/operation/activity/${id}`,
        {},
      getAuthHeaders()
      );
      
      return { data: res.data.data, id };
      
    } catch (error: any) {
      console.error("Full error:", {
        message: error.message,
        response: error.response?.data,
        config: error.config
      });
      return rejectWithValue(error.response?.data || error.message);
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

        if (state.courseAdInfo) state.courseAdInfo = { ...action.payload.data };

        state.courseAds = state.courseAds.map((ad) => {
          return ad.id === action.payload.id ? { ...action.payload.data } : ad;
        });
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
