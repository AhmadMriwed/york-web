import { ImportExport } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const importFile = createAsyncThunk(
   "importAndExport/ImportFile",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue, dispatch } = thunkAPI;
      try {
         const res = await Axios.post("mailBox/request/uploadFile", data);

         console.log("upolad", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const exportFile = createAsyncThunk(
   "importAndExport/ImportFile",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue, dispatch } = thunkAPI;
      try {
         const res = await Axios.post("mailBox/request/uploadFile", data);

         console.log("upolad", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

const importAndExport = createSlice({
   name: "importAndExport",
   initialState: {
      isLoading: false,
      error: null,
      importedFile: {},
      exportedFile: {},
   } as ImportExport,

   reducers: {},
   extraReducers: (builder) => {
      // import file
      builder.addCase(importFile.pending, (state, action: any) => {
         state.error = null;
         state.isLoading = true;
      });

      builder.addCase(importFile.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.importedFile = {
            message: "imported",
            sataus: 200,
         };
      });
      builder.addCase(importFile.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // export file
      builder.addCase(exportFile.pending, (state, action: any) => {
         state.error = null;
         state.isLoading = true;
      });

      builder.addCase(exportFile.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.exportedFile = {
            message: "exported",
            sataus: 200,
         };
      });
      builder.addCase(exportFile.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export default importAndExport.reducer;
