import { FC, useReducer, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { useStyles } from "./styles";

import Aside from "components/aside";
import CreateProduct from "components/create-product";
import CreateShoppingList from "components/create-shopping-list";
import ProductPreview from "components/product-preview";

import Box from "@mui/material/Box";

import { selectProductsCategories } from "redux/products/selectors";
import { useAppDispatch, useAppSelector } from "redux/store";

import {
  createProduct,
  deleteProduct,
  setProductPreview
} from "redux/products/slice";

import {
  selectShoppingListCount,
  selectShoppingListMap
} from "redux/shopping-list/selectors";

import {
  addShoppingItemRemoveId,
  addToShoppingList,
  closeShoppingList,
  createShoppingList,
  getShoppingListsHistory,
  getShoppingListStatistic,
  removeFromShoppingList
} from "redux/shopping-list/slice";

const RootPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const [showShoppingList, toggleShoppingList] = useReducer(
    (prev) => !prev,
    true
  );

  const productsCategories = useAppSelector(selectProductsCategories);
  const shoppingListCount = useAppSelector(selectShoppingListCount);
  const shoppingListMap = useAppSelector(selectShoppingListMap);

  const productPreview = useAppSelector((state) => state.productsState.preview);

  const {
    hasUpdate,
    isCreated: isShoppingListCreated,
    removeItemIds,
    shoppingList
  } = useAppSelector((state) => state.shoppingListState);

  const handleAddShoppingItemRemoveId = useCallback(
    (id: number) => {
      dispatch(addShoppingItemRemoveId(id));
    },
    [dispatch]
  );

  const handleAddToShoppingList = useCallback(
    (product: Product) => {
      dispatch(addToShoppingList({ product }));
    },
    [dispatch]
  );

  const handleCloseShoppingList = useCallback(
    (status: ShoppingListStatus) => {
      dispatch(closeShoppingList({ status, removeItemIds }));
    },
    [dispatch, removeItemIds]
  );

  const handleCreateProduct = useCallback(
    (product: Omit<Product, "id">) => {
      dispatch(createProduct(product));
    },
    [dispatch]
  );

  const handleGoBack = useCallback(() => {
    dispatch(setProductPreview({ product: null }));
  }, [dispatch]);

  const handleSaveShoppingList = useCallback(
    (data: { title: string }) => {
      dispatch(createShoppingList({ title: data.title, shoppingList }));
    },
    [dispatch, shoppingList]
  );

  const handleRemoveFromShoppingList = useCallback(
    (product: Product, isTotalRemove?: boolean) => {
      dispatch(removeFromShoppingList({ product, isTotalRemove }));
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    (product: Product) => {
      dispatch(deleteProduct(product));
    },
    [dispatch]
  );

  const handleUpdateShoppingListsHistory = useCallback(() => {
    dispatch(getShoppingListsHistory());
  }, [dispatch]);

  const handleUpdateShoppingListsStatistic = useCallback(() => {
    dispatch(getShoppingListStatistic());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Box className={classes.asidePanel}>
        <Aside shoppingListCount={shoppingListCount} />
      </Box>

      <Box className={classes.main} component="main">
        <Outlet />
      </Box>

      <Box className={classes.cardContainer}>
        {productPreview ? (
          <ProductPreview
            isAddingToShoppingListDisabled={isShoppingListCreated}
            onAddToShoppingList={handleAddToShoppingList}
            onDeleteProduct={handleDeleteProduct}
            onGoBack={handleGoBack}
            product={productPreview}
          />
        ) : showShoppingList ? (
          <CreateShoppingList
            hasShoppingListItems={Boolean(shoppingList.length)}
            hasUpdate={hasUpdate}
            isShoppingListCreated={isShoppingListCreated}
            onAddItem={toggleShoppingList}
            onAddShoppingItemRemoveId={handleAddShoppingItemRemoveId}
            onAddToShoppingList={handleAddToShoppingList}
            onCloseShoppingList={handleCloseShoppingList}
            onRemoveFromShoppingList={handleRemoveFromShoppingList}
            onSaveShoppingList={handleSaveShoppingList}
            onUpdateShoppingListsHistory={handleUpdateShoppingListsHistory}
            onUpdateShoppingListsStatistic={handleUpdateShoppingListsStatistic}
            shoppingListMap={shoppingListMap}
          />
        ) : (
          <CreateProduct
            categories={productsCategories}
            onCancelCreate={toggleShoppingList}
            onCreateProduct={handleCreateProduct}
          />
        )}
      </Box>
    </Box>
  );
};

RootPage.displayName = "RootPage";

export default RootPage;
