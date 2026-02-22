import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import { EnabledLanguages } from "@framework/constants";

import { localizationReducer } from "./localization";
import { layoutReducer } from "./layout";
import { collectionReducer } from "./collection";

export const store = configureStore({
  reducer: {
    localization: localizationReducer,
    layout: layoutReducer,
    collection: collectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { setLanguage } from "./localization";
