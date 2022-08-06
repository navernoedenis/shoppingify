import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { createProductsMap } from "helpers/create-map";

const selectProductsState = (state: RootState) => state.productsState;

export const selectProducts = createSelector(
  [selectProductsState],
  (state) => state.products
);

export const selectProductsMap = createSelector(
  [selectProducts],
  createProductsMap
);

export const selectProductsCategories = createSelector(
  [selectProducts],
  (products) => {
    if (!products.length) return [];

    const categories = products.map((product) => product.category);
    return Array.from(new Set(categories));
  }
);
