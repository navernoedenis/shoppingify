import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ProductsState } from "./types";

import { setShoppingListHasUpdate } from "redux/shopping-list/slice";

import {
  httpCreateProduct,
  httpDeleteProduct,
  httpGetProducts
} from "services/products";

const initialState: ProductsState = {
  error: null,
  isLoading: false,
  preview: null,
  products: []
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProductFromState: (
      state,
      { payload }: PayloadAction<{ product: Product }>
    ) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === payload.product.id
      );

      if (productIndex === -1) return;
      state.products.splice(productIndex, 1);
    },
    setProduct: (state, { payload }: PayloadAction<{ product: Product }>) => {
      state.products?.push(payload.product);
    },
    setProductPreview: (
      state,
      action: PayloadAction<{ product: Product | null }>
    ) => {
      state.preview = action.payload.product;
    },
    setProducts: (state, action: PayloadAction<{ products: Product[] }>) => {
      state.products = action.payload.products;
    },
    setProductsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  deleteProductFromState,
  setProduct,
  setProductPreview,
  setProducts,
  setProductsError,
  setProductsLoading
} = productsSlice.actions;

export const getProducts = () => async (dispatch: Dispatch) => {
  dispatch(setProductsLoading(true));

  try {
    const { data } = await httpGetProducts();
    dispatch(setProducts({ products: data.products }));
  } catch (error) {
    if (error instanceof AxiosError) {
      if (!error.response) return;

      dispatch(setProductsError(error.response.data.error));
    }
  } finally {
    dispatch(setProductsLoading(false));
  }
};

export const createProduct =
  (data: Omit<Product, "id">) => async (dispatch: Dispatch) => {
    dispatch(setProductsError(null));

    try {
      const {
        data: { product }
      } = await httpCreateProduct(data);

      dispatch(setProduct({ product }));
      dispatch(setProductPreview({ product }));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) return;

        dispatch(setProductsError(error.response.data.error));
      }
    }
  };

export const deleteProduct =
  (product: Product) => async (dispatch: Dispatch) => {
    dispatch(setProductsError(null));
    dispatch(setProductsLoading(true));

    try {
      await httpDeleteProduct(product.id);
      dispatch(deleteProductFromState({ product }));
      dispatch(setProductPreview({ product: null }));
      dispatch(setShoppingListHasUpdate(true));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (!error.response) return;

        dispatch(setProductsError(error.response.data.error));
      }
    } finally {
      dispatch(setProductsLoading(false));
    }
  };

export default productsSlice.reducer;
