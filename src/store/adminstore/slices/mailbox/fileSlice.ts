import { FileState } from "@/types/adminTypes/mailbox/mailboxTypes";
import { storageURL } from "@/utils/api";
import { Axios } from "@/utils/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadFile = createAsyncThunk(
   "files/uploadFile",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue, dispatch } = thunkAPI;
      try {
         const res = await Axios.post("mailBox/request/uploadFile", data, {
            onUploadProgress(progressEvent) {
               console.log("event", progressEvent);
               console.log(
                  progressEvent.total
                     ? (
                          (progressEvent.loaded / progressEvent.total) *
                          100
                       ).toFixed() + "%"
                     : ""
               );
               progressEvent.total
                  ? dispatch(
                       updateUploadProgress(
                          +(
                             (progressEvent.loaded / progressEvent.total) *
                             100
                          ).toFixed()
                       )
                    )
                  : -1;
            },
         });

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

export const downloadFile = createAsyncThunk(
   "files/downloadFile",
   async (data: any, thunkAPI) => {
      console.log(data, "data");
      const { rejectWithValue } = thunkAPI;
      await axios
         .get(storageURL + data, {
            headers: {
               Authorization: `Bearer 2|Ny4IIA3LqYFV7KudK2v7yAIx8OhxkdmozKL52Hx49c973274`,
               Accept: "*/*",
            },
            responseType: "blob",

            onDownloadProgress(progressEvent) {
               console.log(
                  progressEvent.total
                     ? (
                          (progressEvent.loaded / progressEvent.total) *
                          100
                       ).toFixed() + "%"
                     : ""
               );
            },
         })
         .then((res) => {
            console.log(res, "res upload");
            const url = URL.createObjectURL(res.data);
            const a = document.createElement("a");
            a.href = url;
            a.style.display = "none";
            a.download = data.name ? data.name : "new file";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
         })
         .catch((error) => rejectWithValue(error.message));
   }
);

const files = createSlice({
   name: "files",
   initialState: {
      isLoading: false,
      error: null,
      uploadedFiles: [],
      uploadPercent: 0,
   } as unknown as FileState,

   reducers: {
      deleteFile: (state, action) => {
         state.uploadedFiles = state.uploadedFiles.filter(
            (file) => file.id !== action.payload
         );
      },
      updateUploadProgress: (state, action: PayloadAction<number>) => {
         state.uploadPercent = action.payload;
      },
      resetUploadedFiles: (state) => {
         state.uploadedFiles = [];
      },
   },
   extraReducers: (builder) => {
      // upload file
      builder
         .addCase(uploadFile.pending, (state) => {
            state.isLoading = true;
            state.uploadPercent = 0;
         })
         .addCase(
            updateUploadProgress,
            (state, action: PayloadAction<number>) => {
               state.uploadPercent = action.payload;
            }
         );
      builder.addCase(uploadFile.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.uploadedFiles.push(action.payload[0]);
      });
      builder.addCase(uploadFile.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   },
});

export const { deleteFile, updateUploadProgress, resetUploadedFiles } =
   files.actions;
export default files.reducer;
