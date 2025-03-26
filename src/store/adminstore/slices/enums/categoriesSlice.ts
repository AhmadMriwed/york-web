import {
   CategoriesState,
   EnumType1,
} from "@/types/adminTypes/enums/enumsTypes";
import { Axios } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
   "categories/getCategories",
   async (
      { activePage, term }: { activePage: number; term: string },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.get(
            `/category?page=${activePage}&term=${term}`
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
         const res = await Axios.get("admin/category");

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
   async (data: any, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.post(`admin/category`, data);

         console.log("res categ created", res);
         if (res.status === 201) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const updateCategory = createAsyncThunk(
   "categories/updateCategory",
   async (
      { formData, enumId }: { formData: any; enumId: number },
      thunkAPI
   ) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.put(`admin/category/${enumId}`, formData);

         console.log("res categ updated", res);
         if (res.status === 200) {
            return res.data.data;
         }
      } catch (error: any) {
         console.error("Error:", error);
         return rejectWithValue(error.response.data.message || "network error");
      }
   }
);

export const deleteCategory = createAsyncThunk(
   "categories/deleteCategory",
   async (enumId: number, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
         const res = await Axios.delete(`admin/category/${enumId}`);

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
   },
});

export const { completedCategoriesOperation } = categories.actions;

export default categories.reducer;
