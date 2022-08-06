import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ShoppingListClose, ShoppingListState } from "./types";

import {
  httpCloseShoppingList,
  httpCreateShoppingList,
  httpGetShoppingList,
  httpGetShoppingListsHistory,
  httpGetShoppingListStatistic,
  httpRemoveShoppingListItems
} from "services/shopping-list";

import { getCategoriesAndItemsStatistic } from "helpers/statistic";

const initialState: ShoppingListState = {
  error: null,
  hasUpdate: false,
  history: [],
  id: null,
  isCreated: false,
  isLoading: false,
  removeItemIds: [],
  shoppingList: [],
  statistic: null
};

const shoppingListSlice = createSlice({
  name: "shopping-list",
  initialState,
  reducers: {
    addShoppingItemRemoveId: (state, action: PayloadAction<number>) => {
      const removeIdIndex = state.removeItemIds.findIndex(
        (removeItemId) => removeItemId === action.payload
      );

      if (removeIdIndex === -1) {
        state.removeItemIds.push(action.payload);
      } else {
        state.removeItemIds.splice(removeIdIndex, 1);
      }
    },
    addToShoppingList: (
      state,
      { payload }: PayloadAction<{ product: Product }>
    ) => {
      const productIndex = state.shoppingList.findIndex(
        (item) => item.product.id === payload.product.id
      );

      if (productIndex === -1) {
        state.shoppingList.push({
          id: null,
          quantity: 1,
          product: payload.product
        });
      } else {
        state.shoppingList[productIndex].quantity += 1;
      }
    },
    removeFromShoppingList: (
      state,
      { payload }: PayloadAction<{ product: Product; isTotalRemove?: boolean }>
    ) => {
      const productIndex = state.shoppingList.findIndex(
        (item) => item.product.id === payload.product.id
      );
      const productQuantity = state.shoppingList[productIndex].quantity;

      if (payload.isTotalRemove || productQuantity === 1) {
        state.shoppingList.splice(productIndex, 1);
      } else {
        state.shoppingList[productIndex].quantity -= 1;
      }
    },
    resetShoppingList: (state) => {
      state.id = null;
      state.isCreated = false;
      state.shoppingList = [];
    },
    setShoppingList: (state, { payload }: PayloadAction<ShoppingList>) => {
      state.id = payload.id;
      state.isCreated = true;
      state.shoppingList = payload.shoppingItems;
    },
    setShoppingListError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setShoppingListHasUpdate: (state, action: PayloadAction<boolean>) => {
      state.hasUpdate = action.payload;
    },
    setShoppingListsHistory: (
      state,
      action: PayloadAction<{ shoppingLists: ShoppingList[] }>
    ) => {
      state.history = action.payload.shoppingLists;
    },
    setShoppingListStatistic: (
      state,
      action: PayloadAction<{
        items: ShoppingListStatisticPercentage[];
        categories: ShoppingListStatisticPercentage[];
      }>
    ) => {
      const { items, categories } = action.payload;
      state.statistic = { items, categories };
    },
    setShoppingLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  addShoppingItemRemoveId,
  addToShoppingList,
  removeFromShoppingList,
  resetShoppingList,
  setShoppingList,
  setShoppingListError,
  setShoppingListHasUpdate,
  setShoppingListsHistory,
  setShoppingListStatistic,
  setShoppingLoading
} = shoppingListSlice.actions;

export const createShoppingList =
  (data: ShoppingListCreate) => async (dispatch: Dispatch) => {
    dispatch(setShoppingListError(null));
    dispatch(setShoppingLoading(true));

    const { title, shoppingList } = data;

    try {
      const { data } = await httpCreateShoppingList({ title, shoppingList });
      dispatch(setShoppingList(data.shoppingList));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) return;

        dispatch(setShoppingListError(error.response.data.error));
      }
    } finally {
      dispatch(setShoppingLoading(false));
    }
  };

export const closeShoppingList =
  (data: ShoppingListClose) => async (dispatch: Dispatch) => {
    dispatch(setShoppingListError(null));
    dispatch(setShoppingLoading(true));

    const { status, removeItemIds } = data;

    try {
      if (removeItemIds.length) {
        await httpRemoveShoppingListItems(removeItemIds);
      }
      await httpCloseShoppingList(status);

      dispatch(resetShoppingList());
      dispatch(setShoppingListHasUpdate(true));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) return;

        dispatch(setShoppingListError(error.response.data.error));
      }
    } finally {
      dispatch(setShoppingLoading(false));
    }
  };

export const getShoppingList = () => async (dispatch: Dispatch) => {
  dispatch(setShoppingLoading(true));

  try {
    const { data } = await httpGetShoppingList();
    if (data.shoppingList) {
      dispatch(setShoppingList(data.shoppingList));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) return;
      console.error(error.response.data.error);
    }
  } finally {
    dispatch(setShoppingLoading(false));
  }
};

export const getShoppingListsHistory = () => async (dispatch: Dispatch) => {
  dispatch(setShoppingLoading(true));
  dispatch(setShoppingListHasUpdate(false));

  try {
    const { data } = await httpGetShoppingListsHistory();

    dispatch(setShoppingListsHistory({ shoppingLists: data.shoppingLists }));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) return;
      console.error(error.response.data.error);
    }
  } finally {
    dispatch(setShoppingLoading(false));
  }
};

export const getShoppingListStatistic = () => async (dispatch: Dispatch) => {
  dispatch(setShoppingLoading(true));
  dispatch(setShoppingListHasUpdate(false));

  try {
    const { data } = await httpGetShoppingListStatistic();
    if (!data.statistic) return;

    const statistic = getCategoriesAndItemsStatistic(data.statistic);
    dispatch(setShoppingListStatistic(statistic));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) return;
      console.error(error.response.data.error);
    }
  } finally {
    dispatch(setShoppingLoading(false));
  }
};

export default shoppingListSlice.reducer;
