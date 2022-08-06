import { FC, useLayoutEffect, useCallback, ChangeEvent } from "react";
import { COLORS } from "app/styles";
import { useStyles } from "./styles";

import NoDataHint from "components/no-data-hint";
import ProductCards from "components/product-cards";
import ScreenLoader from "components/screen-loader";
import SearchPanel from "components/search-panel";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { addToShoppingList, getShoppingList } from "redux/shopping-list/slice";
import { getProducts, setProductPreview } from "redux/products/slice";
import { selectProductsMap } from "redux/products/selectors";
import { useAppDispatch, useAppSelector } from "redux/store";

const ItemsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading: isProductsLoading } = useAppSelector(
    (state) => state.productsState
  );
  const { isCreated: isShoppingListCreated } = useAppSelector(
    (state) => state.shoppingListState
  );

  const productsMap = useAppSelector(selectProductsMap);

  const handleAddToShoppingList = (product: Product) => {
    dispatch(addToShoppingList({ product }));
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("handleSearch: ", event.target.value);
  };

  const handleSetPreviewProduct = useCallback(
    (product: Product | null) => {
      dispatch(setProductPreview({ product }));
    },
    [dispatch]
  );

  useLayoutEffect(() => {
    dispatch(getProducts());
    dispatch(getShoppingList());
  }, [dispatch]);

  if (isProductsLoading) {
    return <ScreenLoader />;
  }

  return productsMap ? (
    <Box>
      <Stack
        className={classes.header}
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        component="header"
      >
        <Typography className={classes.headerTitle} variant="h1">
          <Typography
            component="span"
            variant="h1"
            style={{ color: COLORS.ORANGE_PEEL }}
          >
            Shoppingify{" "}
          </Typography>
          allows you take your shopping list wherever you go
        </Typography>
        <Box className={classes.headerSearch}>
          <SearchPanel onSearch={handleSearch} placeholder="search items" />
        </Box>
      </Stack>

      <Stack direction="column" spacing="50px">
        {Object.entries(productsMap).map(([title, products]) => (
          <ProductCards
            key={title}
            isAddingToShoppingListDisabled={isShoppingListCreated}
            onAddToShoppingList={handleAddToShoppingList}
            onSetPreviewProduct={handleSetPreviewProduct}
            products={products}
            title={title}
          />
        ))}
      </Stack>
    </Box>
  ) : (
    <NoDataHint
      className={classes.hint}
      message="No items yet. Create new ones! 🙂"
    />
  );
};

ItemsPage.displayName = "ItemsPage";

export default ItemsPage;
