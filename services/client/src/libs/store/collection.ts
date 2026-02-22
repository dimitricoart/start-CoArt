import { createSlice } from "@reduxjs/toolkit";

const initialState = { selectedIds: [] as string[] };

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedIds: (state, action: { payload: string[] }) => {
      state.selectedIds = action.payload;
    },
  },
});

export const collectionReducer = collectionSlice.reducer;
