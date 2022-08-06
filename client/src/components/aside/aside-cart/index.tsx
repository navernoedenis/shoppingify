import { FC, memo } from "react";
import { useStyles } from "./styles";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

import CartIcon from "@mui/icons-material/ShoppingCartOutlined";

interface AsideCartProps {
  shoppingListCount: number;
}

const AsideCart: FC<AsideCartProps> = ({ shoppingListCount }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Badge
        classes={{ badge: classes.badge }}
        badgeContent={shoppingListCount}
      >
        <CartIcon className={classes.cartIcon} />
      </Badge>
    </Box>
  );
};

AsideCart.displayName = "AsideCart";

export default memo(AsideCart);
