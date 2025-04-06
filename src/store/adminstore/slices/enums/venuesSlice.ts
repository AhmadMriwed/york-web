import { VenuesState } from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import Cookie from "universal-cookie";
import { getAuthHeaders } from "./authHeaders";

 const cookie = new Cookie();
 
export const getVenues = createAsyncThunk(
  "venues/getVenues",
  async ({ activePage, term }: { activePage: number; term: string }, thunkAPI) => {
    try {
      const res = await axios.get(`/api/admin/venue?page=${activePage}&term=${term}`, getAuthHeaders());
      
      if (res.status === 200) {
        return {
          data: res.data.data,
          perPage: res.data.meta?.per_page || 10,
          total: res.data.meta?.total || 0,
        };
      }
    } catch (error: any) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateVenue = createAsyncThunk(
   "venues/updateVenue",
   async ({ id, formData }: { id: number; formData: FormData }, thunkAPI) => {
     try {
       const res = await axios.post(`/api/admin/venue/update/${id}`, formData, getAuthHeaders());
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
      const res = await axios.post(`/api/admin/venue`, formData, getAuthHeaders());
    
 
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
         const res = await axios.delete(`/api/admin/venue/${id}`, getAuthHeaders()); 

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

export const deleteVenues = createAsyncThunk(  
  "venues/deleteMultipleVenues",  
  async (ids: number[], thunkAPI) => {
    try {
      const res = await axios.delete(`/api/admin/venue/bulk-destroy`, {
        ...getAuthHeaders("application/json"),
        data: { ids }, 

      });
      console.log(res);

      if (res.status === 200) {
        return { data: res.data, ids };
      }
    } catch (error: any) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const importFile = createAsyncThunk(
  "importAndExport/ImportFile",
  async ({ data, url }: { data: FormData; url: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("The file has been imported successfully");
        return res.data.data;
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        // Show the actual error message from the server
        toast.error(error.response.data.message || "Failed to import file");
        return rejectWithValue(error.response.data.message || error.message);
      }
      toast.error(error.message || "Failed to import file");
      return rejectWithValue(error.message);
    }
  }
);



export const exportFile = createAsyncThunk(
  "importAndExport/exportFile", 
  async (
    { 
      url,
      selected_ids, 
      from, 
      to,
      fileName,
      format
    }: { 
      url: string, 
      selected_ids?: number[], 
      from?: number, 
      to?: number,
      fileName: string,
      format: 'xlsx' | 'csv' | 'pdf' | 'docx'
    }, 
    thunkAPI
  ) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const validFormats = ['xlsx', 'csv', 'pdf', 'docx'];
      if (!validFormats.includes(format)) {
        throw new Error(`Invalid format. Allowed types: ${validFormats.join(', ')}`);
      }

      const payload: Record<string, any> = {
        fileName,
        format
      };

      if (selected_ids && selected_ids.length > 0) {
        payload.selected_ids = selected_ids;
      } else {
        if (from !== undefined && to !== undefined && from > to) {
          throw new Error("'from' value must be less than or equal to 'to'");
        }
        if (from !== undefined) payload.from = from;
        if (to !== undefined) payload.to = to;
      }

      const res = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        responseType: 'blob'
      });

      if (res.status === 200) {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}.${format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('File exported successfully');
        return res.data;
      }
    } catch (error: any) {
      console.error("Export Error:", error);
      toast.error(error.response?.data?.message || "Failed to export file");
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
   
      builder.addCase(deleteVenues.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteVenues.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.venues = state.venues.filter(
            (venu) => venu.id !== action.payload.id
         );
         state.status = true;
      });
      builder.addCase(deleteVenues.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });


   

   },
});

export const { completedVenueOperation } = venues.actions;

export default venues.reducer;
