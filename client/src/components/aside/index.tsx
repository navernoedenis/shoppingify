import { FC, memo } from "react";
import { useStyles } from "./styles";

import AsideLinks from "./aside-links";
import AsideCart from "./aside-cart";

import Box from "@mui/material/Box";
import { ReactComponent as LogoIcon } from "assets/icons/logo.svg";

interface AsideProps {
  shoppingListCount: number;
}

const Aside: FC<AsideProps> = ({ shoppingListCount }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container} component="aside">
      <LogoIcon className={classes.logo} />
      <Box className={classes.asideContainer}>
        <AsideLinks />
      </Box>
      <AsideCart shoppingListCount={shoppingListCount} />
    </Box>
  );
};

Aside.displayName = "Aside";

export default memo(Aside);
