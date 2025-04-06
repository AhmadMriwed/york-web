import {
   CategoriesState,
   EnumType1,
} from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { getAuthHeaders } from "./authHeaders";


export const getCategories = createAsyncThunk(
   "categories/getCategories",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.get(
            `/api/category?page=${activePage}&term=${term}`,getAuthHeaders()
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

export const getCategoriesAsMenue = createAsyncThunk(
   "categories/getCategoriesAsMenue",
   async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {


              const res = await axios.get("/api/admin/category", getAuthHeaders());
         console.log("res category", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);


export const createCategory = createAsyncThunk(
   "categories/createCategory",
   async (formData: FormData, thunkAPI) => {
     try {
       const res = await axios.post(`/api/admin/category`, formData,getAuthHeaders());
       
       console.log("hello",res)
 
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



export const updateCategory = createAsyncThunk(
   "categories/updateCategory",
   async ({ id, formData }: { id: number; formData: FormData }, thunkAPI) => {
     try {
       const res = await axios.post(`/api/admin/category/${id}`, formData, getAuthHeaders());
 
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

export const deleteCategory = createAsyncThunk(
   "categories/deleteCategory",

   async (id: number, thunkAPI) => {
      const dispatch: any = useDispatch();

      const { rejectWithValue } = thunkAPI;
      try {
         const res = await axios.delete(`/api/admin/category/${id}`,getAuthHeaders());

         if (res.status === 200) {
            dispatch(getCategories({ activePage: 1, term: "" }));
            return { data: res.data, id };
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.message);
      }
   }
);


export const deleteCategories = createAsyncThunk(  
   "categories/deleteMultipleVenues",  
   async (ids: number[], thunkAPI) => {
     try {
       const res = await axios.delete(`/api/admin/category/bulk-destroy`, {
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




const categories = createSlice({
   name: "categories",
   initialState: {
      isLoading: false,
      operationLoading: false,
      error: null,
      status: false,
      perPage: 10,
      total: 1,
      categories: [],
      categoriesAsMenue: [],
   } as CategoriesState,

   reducers: {
      completedCategoriesOperation: (state) => {
         state.status = false;
      },
   },
   extraReducers: (builder) => {
      // get all request types
      builder.addCase(getCategories.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getCategories.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         state.categories = action.payload.data;
         state.perPage = action.payload.perPage;
         state.total = action.payload.total;
      });
      builder.addCase(getCategories.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // get all request types as menue
      builder.addCase(getCategoriesAsMenue.pending, (state) => {
         state.error = null;
         state.isLoading = true;
      });
      builder.addCase(getCategoriesAsMenue.fulfilled, (state, action: any) => {
         state.error = null;
         state.isLoading = false;
         const types: EnumType1[] = action.payload;
         state.categoriesAsMenue = types.map((type) => {
            return { label: type.title, value: type.id };
         });
      });
      builder.addCase(getCategoriesAsMenue.rejected, (state, action: any) => {
         state.isLoading = false;
         state.error = action.payload;
      });

      // create a new category
      builder.addCase(createCategory.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(createCategory.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(createCategory.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });
      // update a new category
      builder.addCase(updateCategory.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(updateCategory.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         // state.categories.unshift(action.payload);
         state.status = true;
      });
      builder.addCase(updateCategory.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete category
      builder.addCase(deleteCategory.pending, (state) => {
         state.error = null;
         state.operationLoading = true;
      });
      builder.addCase(deleteCategory.fulfilled, (state, action: any) => {
         state.error = null;
         state.operationLoading = false;
         state.categories = state.categories.filter(
            (category) => category.id !== action.payload.enumId
         );
         state.status = true;
      });
      builder.addCase(deleteCategory.rejected, (state, action: any) => {
         state.operationLoading = false;
         state.error = action.payload;
         state.status = true;
      });

      // delete categories :
         builder.addCase(deleteCategories.pending, (state) => {
               state.error = null;
               state.operationLoading = true;
            });
            builder.addCase(deleteCategories.fulfilled, (state, action: any) => {
               state.error = null;
               state.operationLoading = false;
               state.categories = state.categories.filter(
                  (category) => category.id !== action.payload.id
               );
               state.status = true;
            });
            builder.addCase(deleteCategories.rejected, (state, action: any) => {
               state.operationLoading = false;
               state.error = action.payload;
               state.status = true;
            });

   },
});

export const { completedCategoriesOperation } = categories.actions;

export default categories.reducer;
