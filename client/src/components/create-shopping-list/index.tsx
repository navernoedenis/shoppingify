import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "./styles";

import AddItemCard from "components/add-item-card";
import CompleteButtons from "./complete-buttons";
import SaveShoppingList from "./save-shopping-list";
import ShoppingList from "./shopping-list";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ReactComponent as ShoppingCartIcon } from "assets/icons/shopping-cart.svg";

export interface CreateShoppingListProps {
  hasShoppingListItems: boolean;
  hasUpdate: boolean;
  isShoppingListCreated: boolean;
  onAddItem: () => void;
  onAddShoppingItemRemoveId: (id: number) => void;
  onAddToShoppingList: (product: Product) => void;
  onCloseShoppingList: (status: ShoppingListStatus) => void;
  onRemoveFromShoppingList: (product: Product, isTotalRemove?: boolean) => void;
  onSaveShoppingList: (data: { title: string }) => void;
  onUpdateShoppingListsHistory: () => void;
  onUpdateShoppingListsStatistic: () => void;
  shoppingListMap: ShoppingListMap | null;
}

const CreateShoppingList: FC<CreateShoppingListProps> = ({
  hasShoppingListItems,
  hasUpdate,
  isShoppingListCreated,
  onAddItem,
  onAddShoppingItemRemoveId,
  onAddToShoppingList,
  onCloseShoppingList,
  onRemoveFromShoppingList,
  onSaveShoppingList,
  onUpdateShoppingListsHistory,
  onUpdateShoppingListsStatistic,
  shoppingListMap
}) => {
  const classes = useStyles();
  const location = useLocation();
  const pathname = location.pathname.substring(1);

  useEffect(() => {
    if (pathname === "history" && hasUpdate) {
      onUpdateShoppingListsHistory();
    }

    if (pathname === "statistics" && hasUpdate) {
      onUpdateShoppingListsStatistic();
    }
  }, [
    pathname,
    hasUpdate,
    onUpdateShoppingListsHistory,
    onUpdateShoppingListsStatistic
  ]);

  return (
    <Box>
      <Box className={classes.main}>
        <Box className={classes.addItemWrapper}>
          <AddItemCard onAddItem={onAddItem} />
        </Box>
        {hasShoppingListItems ? (
          <ShoppingList
            isShoppingListCreated={isShoppingListCreated}
            onAddShoppingItemRemoveId={onAddShoppingItemRemoveId}
            onAddToShoppingList={onAddToShoppingList}
            onRemoveFromShoppingList={onRemoveFromShoppingList}
            shoppingListMap={shoppingListMap}
          />
        ) : (
          <Typography className={classes.hintText} variant="subtitle1">
            No items
          </Typography>
        )}
      </Box>

      <Box className={classes.footer}>
        {!hasShoppingListItems && (
          <ShoppingCartIcon className={classes.footerImage} />
        )}

        {isShoppingListCreated ? (
          <CompleteButtons onCloseShoppingList={onCloseShoppingList} />
        ) : (
          <SaveShoppingList
            isDisabled={!hasShoppingListItems}
            onSaveShoppingList={onSaveShoppingList}
          />
        )}
      </Box>
    </Box>
  );
};

CreateShoppingList.displayName = "CreateShoppingList";

export default CreateShoppingList;
