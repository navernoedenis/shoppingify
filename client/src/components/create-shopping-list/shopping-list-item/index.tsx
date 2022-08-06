import { FC, useState, useEffect, useCallback, ChangeEvent, memo } from "react";

import { useStyles } from "./styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/AddRounded";
import RemoveIcon from "@mui/icons-material/RemoveRounded";
import TrashIcon from "@mui/icons-material/DeleteOutlineRounded";

interface ShoppingListItemProps {
  isShoppingListCreated: boolean;
  item: ShoppingListItem;
  onAddShoppingItemRemoveId: (id: number) => void;
  onAddToShoppingList: (product: Product) => void;
  onRemoveFromShoppingList: (product: Product, isTotalRemove?: boolean) => void;
}

const ShoppingListItem: FC<ShoppingListItemProps> = ({
  isShoppingListCreated,
  item,
  onAddShoppingItemRemoveId,
  onAddToShoppingList,
  onRemoveFromShoppingList
}) => {
  const [isRemoveFromShoppingList, setRemoveFromShoppingList] = useState(false);
  const [isManageable, setManageable] = useState(false);
  const classes = useStyles({ isManageable });

  useEffect(() => {
    if (isShoppingListCreated) {
      setManageable(false);
    }
  }, [isShoppingListCreated]);

  const handleToggleManageable = useCallback(() => {
    setManageable((prev) => !prev);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (item.id) onAddShoppingItemRemoveId(item.id);
      setRemoveFromShoppingList(event.target.checked);
    },
    [onAddShoppingItemRemoveId, item.id]
  );

  return (
    <Box className={classes.container}>
      {isShoppingListCreated && (
        <Checkbox
          checked={isRemoveFromShoppingList}
          className={classes.checkbox}
          onChange={handleChange}
        />
      )}
      <Typography
        className={classes.title}
        variant="subtitle2"
        style={{
          textDecoration: isRemoveFromShoppingList ? "line-through" : "none"
        }}
      >
        {item.product.name}
      </Typography>

      <Box className={classes.manage}>
        <Box
          className={classes.manageTrash}
          onClick={() => onRemoveFromShoppingList(item.product, true)}
          component="button"
        >
          <TrashIcon className={classes.manageTrashIcon} />
        </Box>

        <RemoveIcon
          className={classes.manageIcon}
          onClick={() => onRemoveFromShoppingList(item.product)}
        />

        <Button
          className={classes.manageButton}
          onClick={handleToggleManageable}
          disabled={isShoppingListCreated}
        >
          <Typography className={classes.manageButtonQuantity} variant="body2">
            {item.quantity}
            pcs
          </Typography>
        </Button>

        <AddIcon
          className={classes.manageIcon}
          onClick={() => onAddToShoppingList(item.product)}
        />
      </Box>
    </Box>
  );
};

ShoppingListItem.displayName = "ShoppingListItem";

export default memo(ShoppingListItem);
