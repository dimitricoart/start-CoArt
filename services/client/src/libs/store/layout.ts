import { createSlice } from "@reduxjs/toolkit";

const initialState = { drawerOpen: false };

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setDrawerOpen: (state, action: { payload: boolean }) => {
      state.drawerOpen = action.payload;
    },
  },
});

export const layoutReducer = layoutSlice.reducer;
