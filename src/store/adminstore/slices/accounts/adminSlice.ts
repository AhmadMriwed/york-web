import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import Cookie from "universal-cookie";

const cookie = new Cookie();

interface ProfileState {
  isLoading: boolean;
  error: string | null;
  profileData: any; // Replace 'any' with your specific profile data type
}

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/admin/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("admin_token")}`,
            "Content-Type": "multipart/form-data",
            "Accept-Language": "en",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data && response.data.message === "Updated successfully") {
        toast.success(response.data.message);
        return response.data.data;
      }

      throw new Error(response.data?.message || "Failed to update profile");
    } catch (error: any) {
      console.error("API Error Details:", error);
      
      let errorMessage = "An unexpected error occurred";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 
                     error.response?.data?.error || 
                     error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: ProfileState = {
  isLoading: false,
  error: null,
  profileData: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;