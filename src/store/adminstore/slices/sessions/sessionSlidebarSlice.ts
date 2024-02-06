import { createSlice } from "@reduxjs/toolkit";

export interface sessionSlidebarState {
  sessionSlidebarIsVisible: boolean;
}

const sessionSlidebarSlice = createSlice({
  name: "sessionSlidebar",
  initialState: { sessionSlidebarIsVisible: false } as sessionSlidebarState,
  reducers: {
    toggleSlidebar: (state: sessionSlidebarState): sessionSlidebarState => {
      return {
        ...state,
        sessionSlidebarIsVisible: !state.sessionSlidebarIsVisible,
      };
    },
  },
});

export const { toggleSlidebar } = sessionSlidebarSlice.actions;

export default sessionSlidebarSlice.reducer;
