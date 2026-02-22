import { createSlice } from "@reduxjs/toolkit";
import { EnabledLanguages } from "@framework/constants";

const initialState = { language: EnabledLanguages.EN };

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLanguage: (state, action: { payload: EnabledLanguages }) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = localizationSlice.actions;
export const localizationReducer = localizationSlice.reducer;
export const languageSelector = (state: { localization: { language: EnabledLanguages } }) =>
  state.localization.language;
