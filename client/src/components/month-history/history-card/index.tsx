import { FC } from "react";
import { useStyles } from "./styles";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface HistoryCardProps {
  title: string;
  quantity: number;
}

const HistoryCard: FC<HistoryCardProps> = ({ title, quantity }) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Typography className={classes.title} variant="subtitle2">
        {title}
      </Typography>
      <Typography className={classes.quantity} variant="body2">
        {quantity} pcs
      </Typography>
    </Card>
  );
};

HistoryCard.displayName = "HistoryCard";

export default HistoryCard;
