import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import productsReducer from "./products/slice";
import shoppingListReducer from "./shopping-list/slice";
import userReducer from "./user/slice";

export const store = configureStore({
  reducer: {
    productsState: productsReducer,
    shoppingListState: shoppingListReducer,
    userState: userReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
