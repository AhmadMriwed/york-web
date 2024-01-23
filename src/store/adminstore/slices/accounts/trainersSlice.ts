import { TrainersState } from "@/types/adminTypes/accounts/accountsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTrainers = createAsyncThunk(
   "trainers/getTrainers",
   async (page: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");

         const res = await Axios.get(
            `admin/trainerAccountRequests?page=${page}`
         );
         console.log(res, "trainers");
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta.per_page,
               total: res.data.meta.total,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getTrainersByType = createAsyncThunk(
   "trainers/getTrainersByType",
   async (type: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");
         const res = await Axios.get(
            `admin/trainerAccountRequests/byType?trainer_type_id=${type}`
         );
         console.log(res, "trainer");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getTrainersByStatus = createAsyncThunk(
   "trainers/getTrainersByStatus",
   async (status: string, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         console.log("try");
         const res = await Axios.get(
            `admin/trainerAccountRequests/byStatus?status=${status}`
         );
         console.log(res, "trainer");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const getSingleTrainers = createAsyncThunk(
   "trainers/getSingleTrainers",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(`admin/trainers/${id}`);
         console.log(res, "trainers get single");
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const createTrainer = createAsyncThunk(
   "trainers/createTrainer",

   async (data, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/trainers`, data);
         console.log(res, "trainers insert");
         // if (res.data.success) {
         //    return res.data.data.services;
         // }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const deleteTrainer = createAsyncThunk(
   "trainers/deleteTrainer",
   async (id: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/requestType/${id}`);
         console.log(res, "trainers delete");
         if (res.status === 200) {
            return { message: "success", id };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const changeTrainerStatus = createAsyncThunk(
   "trainers/changeTrainerStatus",
   async (data: any, thunkAPI) => {
      console.log("ids", data);

      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(
            `admin/trainerAccountRequests/changeStatus`,
            data
         );
         if (res.status === 200) {
            console.log(res, "trainers changle status");

            return { message: "success" };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const trainers = createSlice({
   name: "trainers",
   initialState: {
      isLoading: false,
      error: null,
      status: false,
      perPage: 10,
      total: 1,
      trainers: [],
      singleTrainer: "",
   } as TrainersState,

   reducers: {
      completedTrainerOperation: (state) => {
         state.status = false;
      },
   },
   extraReducers: (builder) => {
      // get all Roles
      builder.addCase(getTrainers.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getTrainers.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainers = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getTrainers.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get users by type
      builder.addCase(getTrainersByType.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getTrainersByType.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainers = action.payload;
         console.log("trainers by type", action.payload);
      });
      builder.addCase(getTrainersByType.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get users by status
      builder.addCase(getTrainersByStatus.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getTrainersByStatus.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainers = action.payload;
         console.log("trainers by status", action.payload);
      });
      builder.addCase(getTrainersByStatus.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get single trainer

      builder.addCase(getSingleTrainers.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getSingleTrainers.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         console.log(action.payload, "load");
         state.singleTrainer = action.payload;
      });
      builder.addCase(getSingleTrainers.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a role

      builder.addCase(createTrainer.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(createTrainer.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainers.push(action.payload);
      });
      builder.addCase(createTrainer.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
      // delete role
      builder.addCase(deleteTrainer.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(deleteTrainer.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.trainers = state.trainers.filter(
            (trainer) => trainer.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteTrainer.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export const { completedTrainerOperation } = trainers.actions;

export default trainers.reducer;
