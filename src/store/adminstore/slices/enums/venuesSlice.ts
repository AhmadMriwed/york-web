import { VenuesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getVenues = createAsyncThunk(
   "venues/getVenues",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `admin/venue?page=${activePage}&term=${term}`
         );

         console.log("res venu", res);
         if (res.status === 200) {
            return {
               data: res.data.data,
               perPage: res.data.meta?.per_page || 10,
               total: res.data.meta?.total || 0,
            };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const updateVenue = createAsyncThunk(
   "venues/updatevenue",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`}admin/venue/${enumId}`, formData);

         console.log("res venue updated", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const createVenue = createAsyncThunk(
   "venues/createVenue",
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/venue`, data);

         console.log("res venu created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteVenue = createAsyncThunk(
   "venues/deleteVenue",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/venue/${enumId}`);

         console.log("res venu delete", res);
         if (res.status === 200) {
            return { data: res.data, enumId };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const venues = createSlice({
   name: "venues",
   initialState: {
      isLoading: false,
      operationLoading: false,
      error: null,
      status: false,
      perPage: 10,
      total: 1,
      venues: [],
   } as VenuesState,

   reducers: {
      completedVenueOperation: (state) => {
         state.status = false;
      },
   },
   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getVenues.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getVenues.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.venues = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getVenues.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a venue

      builder.addCase(createVenue.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createVenue.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.venues.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createVenue.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
      });

      // update a venue

      builder.addCase(updateVenue.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateVenue.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.status = true;
      });
      builder.addCase(updateVenue.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete venue
      builder.addCase(deleteVenue.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteVenue.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.venues = state.venues.filter(
            (venu) => venu.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteVenue.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
   },
});

export const { completedVenueOperation } = venues.actions;

export default venues.reducer;
