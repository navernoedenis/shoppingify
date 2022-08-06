import { FC } from "react";
import { useStyles } from "./styles";

import HistoryCard from "../history-card";
import CardGridLayout from "layouts/card-grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface HistoryCategoryProps {
  category: string;
  shoppingListItems: ShoppingListItem[];
}

const HistoryCategory: FC<HistoryCategoryProps> = ({
  category,
  shoppingListItems
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography className={classes.title} variant="subtitle1">
        {category}
      </Typography>
      <CardGridLayout className={classes.cards}>
        {shoppingListItems.map((shoppingListItem) => (
          <HistoryCard
            key={shoppingListItem.id}
            quantity={shoppingListItem.quantity}
            title={shoppingListItem.product.name}
          />
        ))}
      </CardGridLayout>
    </Box>
  );
};

HistoryCategory.displayName = "HistoryCategory";

export default HistoryCategory;
