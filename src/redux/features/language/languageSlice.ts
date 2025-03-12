import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  language: string; // Language state (e.g., 'en', 'ar', 'es')
};

const initialState: InitialState = {
  language: 'en', // Default language is English
};

export const languageSlice = createSlice({
  name: 'language', // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to change the language
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload; // Update the language value
    },
    // Optional: Reset language to default
    resetLanguage: (state) => {
      state.language = 'en'; // Reset to English
    },
  },
});

// Export the actions
export const { changeLanguage, resetLanguage } = languageSlice.actions;

// Export the reducer
export default languageSlice.reducer;