import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trainingPlanState } from "@/types/adminTypes/courses/coursesTypes";
import { storageURL } from "@/utils/api";
import axios from "axios";
import { getAuthHeaders } from "../../enums/authHeaders";
import { toast } from "sonner";

// get training plan
export const getTrainingPlan = createAsyncThunk(
  "trainingPlan/getTrainingPlan",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get("/api/admin/training_plan/get_last",getAuthHeaders());
      console.log(res); 
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

// get training plan by id
export const getPlanInfo = createAsyncThunk(
  "trainingPlan/getPlanInfo",
  async (id: number, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`/api/admin/training_plan/${id}`,getAuthHeaders());
      console.log(res); 

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

// update training plan
export const updatePlan = createAsyncThunk(
  "trainingPlan/updatePlan",
  async (params: { id: number; data: any }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await Axios.post(
        `/training_plan/update/${params.id}`,
        params.data
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

// add training plan
export const addPlan = createAsyncThunk(
  "trainingPlan/addPlan",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/admin/training_plan`, data,getAuthHeaders());
      console.log(res);   
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

// download file
export const downloadTrainingPlan = createAsyncThunk(
  "trainingPlan/downloadTrainingPlan",
  async (path: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await Axios.get(storageURL + path, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.style.display = "none";
      link.setAttribute("download", "downloaded-file.pdf");
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) link.parentNode.removeChild(link);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// upload training plain file : 
export const uploadTrainingPlain = createAsyncThunk(
  "trainingPlan/uploadFile",
  async (formData: FormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`/api/admin/training_plan/upload_file`, formData, getAuthHeaders());
      if (res.status === 201) {
        return { data: res.data.data };
      }
      return rejectWithValue("Upload failed");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Upload failed");
    }
  }
);

const trainingPlan = createSlice({
  name: "trainingPlan",

  initialState: {
    isLoading: false,
    error: null,
    trainingPlan: null,
    planInfo: null,
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
      //upload file : 
      builder
  .addCase(uploadTrainingPlain.pending, (state) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(uploadTrainingPlain.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    // You can store the uploaded file info if needed
  })
  .addCase(uploadTrainingPlain.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload as string;
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

    // add training plan
    builder
      .addCase(addPlan.pending, (state) => {
        state.operationError = null;
        state.operationLoading = true;
      })
      .addCase(addPlan.fulfilled, (state, action: any) => {
        state.operationError = null;
        state.operationLoading = false;
        state.status = true;
      })
      .addCase(addPlan.rejected, (state, action: any) => {
        state.operationError = false;
        state.operationLoading = false;
        state.operationError = action.payload;
        state.status = true;
      });
  },
});

export default trainingPlan.reducer;
export const { planOperationCompleted } = trainingPlan.actions;
