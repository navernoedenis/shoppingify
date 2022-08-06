import { FC, useLayoutEffect } from "react";
import { useStyles } from "./styles";

import MonthHistory from "components/month-history";
import NoDataHint from "components/no-data-hint";
import ScreenLoader from "components/screen-loader";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "redux/store";
import { getShoppingListsHistory } from "redux/shopping-list/slice";
import { selectShoppingListHistoryMap } from "redux/shopping-list/selectors";

const HistoriesPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading: isShoppingListLoading } = useAppSelector(
    (state) => state.shoppingListState
  );
  const shoppingListHistoryMap = useAppSelector(selectShoppingListHistoryMap);

  useLayoutEffect(() => {
    dispatch(getShoppingListsHistory());
  }, [dispatch]);

  if (isShoppingListLoading) {
    return <ScreenLoader />;
  }

  return shoppingListHistoryMap ? (
    <Box>
      <Typography className={classes.title} variant="h1">
        Shopping history
      </Typography>

      <Stack spacing="54px">
        {Object.entries(shoppingListHistoryMap).map(
          ([dateTitle, shoppingLists]) => (
            <MonthHistory
              key={dateTitle}
              dateTitle={dateTitle}
              shoppingLists={shoppingLists}
            />
          )
        )}
      </Stack>
    </Box>
  ) : (
    <NoDataHint className={classes.hint} message="You have no history yet 😔" />
  );
};

HistoriesPage.displayName = "HistoriesPage";

export default HistoriesPage;
