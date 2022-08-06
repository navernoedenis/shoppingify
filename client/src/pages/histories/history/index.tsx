import { FC } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useStyles } from "./styles";

import BackButton from "components/back-button";
import CreatedDate from "components/created-date";
import HistoryCategory from "components/month-history/history-category";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { createShoppingListMap } from "helpers/create-map";

type ShoppingListState = ShoppingList | null;

const HistoryPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const shoppingList = location.state as ShoppingListState;
  if (!shoppingList) {
    return <Navigate to="/history" />;
  }

  const shoppingListMap = createShoppingListMap(shoppingList.shoppingItems);

  return (
    <Box>
      <Box className={classes.header} component="header">
        <Box className={classes.headerButtons}>
          <BackButton onClick={() => navigate(-1)} />
        </Box>
        <Typography className={classes.headerTitle} variant="h1">
          {shoppingList.title}
        </Typography>
        <CreatedDate date={shoppingList.createdAt} />
      </Box>

      {shoppingListMap ? (
        <Stack spacing="64px">
          {Object.entries(shoppingListMap).map(
            ([category, shoppingListItems]) => (
              <HistoryCategory
                key={category}
                category={category}
                shoppingListItems={shoppingListItems}
              />
            )
          )}
        </Stack>
      ) : (
        <Typography variant="h2">
          All products that were in this order have been removed 😞
        </Typography>
      )}
    </Box>
  );
};

HistoryPage.displayName = "HistoryPage";

export default HistoryPage;
