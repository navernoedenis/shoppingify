import { FC, memo } from "react";
import { useStyles } from "./styles";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PencilIcon from "@mui/icons-material/Create";
import ShoppingListItem from "../shopping-list-item";

interface ShoppingListProps {
  isShoppingListCreated: boolean;
  onAddShoppingItemRemoveId: (id: number) => void;
  onAddToShoppingList: (product: Product) => void;
  onRemoveFromShoppingList: (product: Product, isTotalRemove?: boolean) => void;
  shoppingListMap: ShoppingListMap | null;
}

const ShoppingList: FC<ShoppingListProps> = ({
  isShoppingListCreated,
  onAddShoppingItemRemoveId,
  onAddToShoppingList,
  onRemoveFromShoppingList,
  shoppingListMap
}) => {
  const classes = useStyles();

  return shoppingListMap ? (
    <Box>
      <Box className={classes.header} component="header">
        <Typography className={classes.headerTitle} variant="h2">
          Shopping list
        </Typography>
        <PencilIcon className={classes.headerIcon} />
      </Box>

      <Stack className={classes.categories} spacing="45px">
        {Object.entries(shoppingListMap).map(([category, items]) => (
          <Box className={classes.category} key={category}>
            <Typography className={classes.categoryTitle} variant="body1">
              {category}
            </Typography>

            <Stack spacing="12px">
              {items.map((item) => (
                <ShoppingListItem
                  isShoppingListCreated={isShoppingListCreated}
                  item={item}
                  key={item.product.id}
                  onAddShoppingItemRemoveId={onAddShoppingItemRemoveId}
                  onAddToShoppingList={onAddToShoppingList}
                  onRemoveFromShoppingList={onRemoveFromShoppingList}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  ) : null;
};

ShoppingList.displayName = "ShoppingList";

export default memo(ShoppingList);
