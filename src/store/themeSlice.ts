import { ThemeState } from "@/types/storeTypes";
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
   name: "theme",
   initialState: { theme: "light" } as ThemeState,
   reducers: {
      toggleTheme: (state: ThemeState): any =>
         state.theme === "dark" ? "light" : "dark",
   },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
