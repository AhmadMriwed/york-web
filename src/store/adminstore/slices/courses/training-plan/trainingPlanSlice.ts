import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trainingPlanState } from "@/types/adminTypes/courses/coursesTypes";

// get training plan
export const getTrainingPlan = createAsyncThunk(
  "trainingPlan/getTrainingPlan",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("fetching training plan");
      const res = await Axios.get("admin/training_plan/get_last");
      if (res.status === 200) {
        console.log("success training plan");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// get training plan by id
export const getPlanInfo = createAsyncThunk(
  "trainingPlan/getPlanInfo",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("fetching training plan info");
      const res = await Axios.get(`admin/training_plan/${id}`);
      if (res.status === 200) {
        console.log("success training plan info");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// update training plan
export const updatePlan = createAsyncThunk(
  "trainingPlan/updatePlan",
  async (params: { id: number; data: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("updating training plan info");
      const res = await Axios.post(
        `admin/training_plan/update/${params.id}`,
        params.data
      );
      if (res.status === 200) {
        console.log("success update training plan info");
        return {
          data: res.data.data,
        };
      }
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const trainingPlan = createSlice({
  name: "trainingPlan",

  initialState: {
    isLoading: false,
    error: null,
    trainingPlan: {},
    planInfo: {},
    /* plan operation */
    status: false,
    operationLoading: false,
    operationError: null,
  } as trainingPlanState,

  reducers: {
    planOperationCompleted: (state: trainingPlanState) => {
      state.status = false;
      state.operationError = null;
    },
  },

  extraReducers: (builder) => {
    // get training plan
    builder
      .addCase(getTrainingPlan.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getTrainingPlan.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.trainingPlan = action.payload.data;
      })
      .addCase(getTrainingPlan.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // get training plan by id
    builder
      .addCase(getPlanInfo.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getPlanInfo.fulfilled, (state, action: any) => {
        state.error = null;
        state.isLoading = false;
        state.planInfo = action.payload.data;
      })
      .addCase(getPlanInfo.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // update training plan
    builder
      .addCase(updatePlan.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(updatePlan.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(updatePlan.rejected, (state, action: any) => {
        state.operationError = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default trainingPlan.reducer;
export const { planOperationCompleted } = trainingPlan.actions;
