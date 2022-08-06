import { FC } from "react";
import { useStyles } from "./styles";

import HistoryBar from "./history-bar";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { getDayMonthAndYear, getMonthName } from "helpers/date";

interface MonthHistoryProps {
  dateTitle: string;
  shoppingLists: ShoppingList[];
}

const MonthHistory: FC<MonthHistoryProps> = ({ dateTitle, shoppingLists }) => {
  const classes = useStyles();
  const date = new Date(dateTitle);
  const { year } = getDayMonthAndYear(date);

  return (
    <Box>
      <Typography className={classes.title} component="h4" variant="body2">
        {getMonthName(date)} {year}
      </Typography>

      <Stack spacing="28px">
        {shoppingLists.map((shoppingList) => (
          <HistoryBar key={shoppingList.id} shoppingList={shoppingList} />
        ))}
      </Stack>
    </Box>
  );
};

MonthHistory.displayName = "MonthHistory";

export default MonthHistory;
