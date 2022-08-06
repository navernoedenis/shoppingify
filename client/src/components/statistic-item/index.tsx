import { FC } from "react";
import { useStyles } from "./styles";
import { COLORS } from "app/styles";

import Box from "@mui/material/Box";
import ProgressBar from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

interface StatisticItemProps {
  item: ShoppingListStatisticPercentage;
  color?: string;
}

const StatisticItem: FC<StatisticItemProps> = ({ item, color }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.title} variant="body1" component="h4">
          {item.name}
        </Typography>
        <Typography className={classes.percentages} variant="subtitle1">
          {item.percentage}%
        </Typography>
      </Box>
      <ProgressBar
        className={classes.progressBar}
        variant="determinate"
        value={item.percentage}
        sx={{
          ".MuiLinearProgress-bar": {
            backgroundColor: color ?? COLORS.ORANGE_PEEL
          }
        }}
      />
    </Box>
  );
};

StatisticItem.displayName = "StatisticItem";

export default StatisticItem;
