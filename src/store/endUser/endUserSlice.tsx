import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endUserState } from "@/types/endUserTypes/endUserTypes";
import axios from "axios";
import { getAuthHeaders } from "../adminstore/slices/enums/authHeaders";

// get venues
export const getVenues = createAsyncThunk(
  "endUser/getVenues",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`venue?term=${term}`);
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

// get categories
export const getCategories = createAsyncThunk(
  "endUser/getCategories",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`category?term=${term}`);
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

// get course ads
export const getCourseads = createAsyncThunk(
  "endUser/getCourseads",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `/api/course_ad?term=${term}`,
        getAuthHeaders()
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

// get currencies
export const getCurrencies = createAsyncThunk(
  "endUser/getCurrencies",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`currency?term=${term}`);
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

// get trainers
export const getTrainers = createAsyncThunk(
  "endUser/getTrainers",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`trainers?term=${term}`);
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

// get trainees
export const getTrainees = createAsyncThunk(
  "endUser/getTrainees",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`trainees?term=${term}`);
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

// get clients
export const getClients = createAsyncThunk(
  "endUser/getClients",
  async (term: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get(`clients?term=${term}`);
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

// get permissions
export const getCoursePermissions = createAsyncThunk(
  "endUser/getCoursePermissions",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.get("admin/permissionCourse");
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

const endUser = createSlice({
  name: "endUser",
  initialState: {
    isLoading: false,
    error: null,
    venues: [],
    categories: [],
    courseads: [],
    currencies: [],
    trainers: [],
    trainees: [],
    clients: [],
    coursePermissions: [],
  } as endUserState,

  reducers: {},

  extraReducers: (builder) => {
    // get venues
    builder
      .addCase(getVenues.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getVenues.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.venues = action.payload.data;
      })
      .addCase(getVenues.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get categories
    builder
      .addCase(getCategories.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.categories = action.payload.data;
      })
      .addCase(getCategories.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get course ads
    builder
      .addCase(getCourseads.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCourseads.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.courseads = action.payload.data;
      })
      .addCase(getCourseads.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get currencies
    builder
      .addCase(getCurrencies.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.currencies = action.payload.data;
      })
      .addCase(getCurrencies.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get trainers
    builder
      .addCase(getTrainers.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getTrainers.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.trainers = action.payload.data;
      })
      .addCase(getTrainers.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get trainees
    builder
      .addCase(getTrainees.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getTrainees.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.trainees = action.payload.data;
      })
      .addCase(getTrainees.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get clients
    builder
      .addCase(getClients.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getClients.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.clients = action.payload.data;
      })
      .addCase(getClients.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get course permissions
    builder
      .addCase(getCoursePermissions.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getCoursePermissions.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.coursePermissions = action.payload.data;
      })
      .addCase(getCoursePermissions.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default endUser.reducer;
