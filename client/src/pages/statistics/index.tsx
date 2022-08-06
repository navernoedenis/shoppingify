import { FC, useLayoutEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { useStyles } from "./styles";
import { COLORS } from "app/styles";

import NoDataHint from "components/no-data-hint";
import ScreenLoader from "components/screen-loader";
import StatisticItem from "components/statistic-item";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "redux/store";
import {
  getShoppingListsHistory,
  getShoppingListStatistic
} from "redux/shopping-list/slice";

import { selectShoppingListMonthlySummaryMap } from "redux/shopping-list/selectors";

const StatisticsPage: FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const { isLoading, statistic } = useAppSelector(
    (state) => state.shoppingListState
  );

  const monthlySummary = useAppSelector(selectShoppingListMonthlySummaryMap);

  useLayoutEffect(() => {
    dispatch(getShoppingListsHistory());
    dispatch(getShoppingListStatistic());
  }, [dispatch]);

  console.log("monthlySummary: ", monthlySummary);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!statistic || !monthlySummary) {
    return (
      <NoDataHint
        className={classes.hint}
        message="You have no statistic yet"
        icon="✨"
        iconRepeat={2}
      />
    );
  }

  return (
    <Box className={classes.container}>
      <Stack className={classes.columns} direction="row" spacing="65px">
        <Box className={classes.column}>
          <Typography className={classes.columnTitle} variant="h2">
            Top items
          </Typography>

          <Stack className={classes.columnList} spacing="24px">
            {statistic.items.slice(0, 3).map((item) => (
              <StatisticItem key={item.id} item={item} />
            ))}
          </Stack>
        </Box>

        <Box className={classes.column}>
          <Typography className={classes.columnTitle} variant="h2">
            Top Categories
          </Typography>

          <Stack className={classes.columnList} spacing="24px">
            {statistic.categories.slice(0, 3).map((item) => (
              <StatisticItem
                key={item.id}
                color={COLORS.MAYA_BLUE}
                item={item}
              />
            ))}
          </Stack>
        </Box>
      </Stack>

      <Box className={classes.graph}>
        <Typography className={classes.graphTitle} variant="h2">
          Monthly Summary
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart className={classes.graphChart} data={monthlySummary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearAndMonthTitle" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke={COLORS.ORANGE_PEEL}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

StatisticsPage.displayName = "StatisticsPage";

export default StatisticsPage;
