import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

import CreatedDate from "components/created-date";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import ArrowIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface HistoryBarProps {
  shoppingList: ShoppingList;
}

const HistoryBar: FC<HistoryBarProps> = ({ shoppingList }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleGoToHistory = useCallback(() => {
    navigate(`/history/${shoppingList.id}`, { state: shoppingList });
  }, [navigate, shoppingList]);

  return (
    <Card className={classes.container}>
      <Typography className={classes.title} component="h3" variant="subtitle2">
        {shoppingList.title}
      </Typography>
      <Box className={classes.details}>
        <CreatedDate date={shoppingList.createdAt} />
        <Typography
          className={`${classes.status} ${shoppingList.status}`}
          variant="body2"
        >
          {shoppingList.status}
        </Typography>
        <ArrowIcon className={classes.arrow} onClick={handleGoToHistory} />
      </Box>
    </Card>
  );
};

HistoryBar.displayName = "HistoryBar";

export default HistoryBar;
