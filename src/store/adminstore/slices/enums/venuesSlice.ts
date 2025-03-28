import { VenuesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import Cookie from "universal-cookie";

 const cookie = new Cookie();
 
export const getVenues = createAsyncThunk(
   "venues/getVenues",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `/venue?page=${activePage}&term=${term}`
         ,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`, 
             },
         });

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
   "venues/updateVenue",
   async ({ id, formData }: { id: number; formData: FormData }, thunkAPI) => {
     try {
       const res = await axios.post(`/api/admin/venue/update/${id}`, formData, {
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
           "Content-Type": "multipart/form-data",
         },
       });
 
       if (res.status === 200) {
         return {
           id,
           data: {
             title: {
               en: res.data.data["title.en"],
               ar: res.data.data["title.ar"]
             },
             description: {
               en: res.data.data["description.en"],
               ar: res.data.data["description.ar"]
             },
             image: res.data.data.image
           }
         };
       }
     } catch (error: any) {
       console.error('Update error:', error.response);
       return thunkAPI.rejectWithValue(error.response?.data);
     }
   }
 );

export const createVenue = createAsyncThunk(
   "venues/createVenue",
   async (formData: FormData, thunkAPI) => {
     try {
       const res = await axios.post(`/api/admin/venue`, formData, {
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
           "Content-Type": "multipart/form-data",
         },
       });
 
       if (res.status === 201) {
         return {
           title: {
             en: res.data.data["title.en"],
             ar: res.data.data["title.ar"]
           },
           description: {
             en: res.data.data["description.en"],
             ar: res.data.data["description.ar"]
           },
           image: res.data.data.image
         };
       }
     } catch (error: any) {
       console.error('Full error response:', error.response);
       return thunkAPI.rejectWithValue(error.response?.data);
     }
   }
 );


export const deleteVenue = createAsyncThunk(
   "venues/deleteVenue",
   async (id: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.delete(`/api/admin/venue/${id}`,{
            headers: {
               Authorization: `Bearer ${cookie.get("admin_token")}`,
               "Content-Type": "multipart/form-data",
             },
         });
         console.log('')

         console.log("res venu delete", res);
         if (res.status === 200) {
            return { data: res.data, id };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);

export const importFile = createAsyncThunk(
   "importAndExport/ImportFile",
   async ({ data, url }: { data: FormData, url: string }, thunkAPI) => {
     const { rejectWithValue } = thunkAPI;
     try {
       const res = await axios.post(url, data, {
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
           "Content-Type": "multipart/form-data",
         }
       });
       
       if (res.status === 200) {
         toast.success('The file has been imported successfully')
         return res.data.data;
       }
     } catch (error: any) {
       console.error("Error:", error);
       if (error.response) {
         // Return the server's error message if available
         return rejectWithValue(error.response.data.message || error.message);
       }
       return rejectWithValue(error.message);
     }
   }
 );
 export const exportFile = createAsyncThunk(
   "importAndExport/ExportFile", 
   async (
     { 
       url, 
       from, 
       to,
      //  fileName,
      //  fileType
     }: { 
       url: string, 
       from: number | undefined, 
       to: number | undefined,
      //  fileName: string,
      //  fileType: string
     }, 
     thunkAPI
   ) => {
     const { rejectWithValue } = thunkAPI;
     try {
       const res = await axios.get(url, {
         params: {
           from:1,
           to:2,
         //   file_name: fileName,
         //   file_type: fileType
         },
         headers: {
           Authorization: `Bearer ${cookie.get("admin_token")}`,
           "Accept": "application/json" 
         },
       });
 
       console.log("Export response", res);
       
       if (res.status === 200) {
         return res.data;
       }
     } catch (error: any) {
       console.error("Export Error:", error);
       return rejectWithValue(error.response?.data?.message || error.message);
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
            (venu) => venu.id !== action.payload.id
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
