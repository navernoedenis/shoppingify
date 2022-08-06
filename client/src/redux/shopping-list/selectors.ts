import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

import {
  createShoppingListMap,
  createShoppingListHistoryMap,
  createShoppingListMonthlySummaryMap
} from "helpers/create-map";

const selectShoppingListState = (state: RootState) => state.shoppingListState;

const selectShoppingList = createSelector(
  [selectShoppingListState],
  (state) => state.shoppingList
);

const selectShoppingListsHistory = createSelector(
  [selectShoppingListState],
  (state) => state.history
);

export const selectShoppingListCount = createSelector(
  [selectShoppingList],
  (shoppingList) => shoppingList.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectShoppingListMap = createSelector(
  [selectShoppingList],
  createShoppingListMap
);

export const selectHasShoppingListMapItems = createSelector(
  [selectShoppingListMap],
  (shoppingListMap) => {
    if (!shoppingListMap) return false;

    return Object.values(shoppingListMap).some((items) => items.length);
  }
);

export const selectShoppingListHistoryMap = createSelector(
  [selectShoppingListsHistory],
  createShoppingListHistoryMap
);

export const selectShoppingListMonthlySummaryMap = createSelector(
  [selectShoppingListsHistory],
  createShoppingListMonthlySummaryMap
);
